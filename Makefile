# Deploy www.dplaax.dev to S3 (+ optional CloudFront invalidation).
#
# Setup (once): cp local.mk.example local.mk and fill in AWS_PROFILE /
# CLOUDFRONT_DISTRIBUTION_ID. local.mk is gitignored — machine-local config.
#
# Usage:
#   make deploy                # build + sync + invalidate (config from local.mk)
#   make deploy DRY=1          # show what would sync, change nothing
#   AWS_PROFILE=<p> make deploy CLOUDFRONT_DISTRIBUTION_ID=E123ABC   # without local.mk
#
# AWS_PROFILE is required on purpose — refusing to fall back to the default
# profile keeps a stray `make deploy` from touching the wrong account.
# Precedence: make CLI args > local.mk > shell environment — a profile
# exported by your shell never silently wins over the repo-local config.
# Topology and one-time setup: infra/deploy.md.

-include local.mk

S3_BUCKET ?= www.dplaax.dev
CLOUDFRONT_DISTRIBUTION_ID ?=
DRY ?=

# Recipes (aws CLI) read AWS_PROFILE from the environment.
export AWS_PROFILE

SYNC_FLAGS := $(if $(DRY),--dryrun,)

.PHONY: help build deploy preflight

help:
	@echo "Targets:"
	@echo "  make build    — astro check + astro build (outputs ./dist)"
	@echo "  make deploy   — build, sync ./dist to s3://$(S3_BUCKET), invalidate CloudFront"
	@echo ""
	@echo "Variables: S3_BUCKET, CLOUDFRONT_DISTRIBUTION_ID, DRY=1 (dry-run)"
	@echo "Usage:     AWS_PROFILE=<profile> make deploy"

build:
	npm run build

preflight:
	@test -n "$$AWS_PROFILE" || { echo "ERROR: AWS_PROFILE is not set (usage: AWS_PROFILE=<profile> make deploy)"; exit 1; }
	@command -v aws >/dev/null || { echo "ERROR: aws CLI not found"; exit 1; }
	@aws sts get-caller-identity --query Account --output text >/dev/null || { echo "ERROR: credentials for AWS_PROFILE=$$AWS_PROFILE not usable"; exit 1; }

deploy: preflight build
	# Non-hashed files (HTML, favicon, robots.txt, sitemap): short cache so
	# updates propagate; --exclude keeps the second sync's prefix untouched.
	aws s3 sync ./dist s3://$(S3_BUCKET) --delete $(SYNC_FLAGS) \
		--exclude "_astro/*" \
		--cache-control "public, max-age=300, must-revalidate"
	# Content-hashed build assets: safe to cache forever.
	aws s3 sync ./dist/_astro s3://$(S3_BUCKET)/_astro --delete $(SYNC_FLAGS) \
		--cache-control "public, max-age=31536000, immutable"
ifeq ($(DRY),)
ifneq ($(CLOUDFRONT_DISTRIBUTION_ID),)
	aws cloudfront create-invalidation \
		--distribution-id $(CLOUDFRONT_DISTRIBUTION_ID) --paths "/*"
else
	@echo "NOTE: CLOUDFRONT_DISTRIBUTION_ID not set — invalidation skipped."
endif
else
	@echo "DRY run — no invalidation."
endif
