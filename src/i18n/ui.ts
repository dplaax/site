export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
};

const strings = {
  en: {
    'site.title': 'dPLaaX — verifiable provenance across boundaries',
    'site.description':
      'An open protocol linking signed boundary records so recipients can verify provenance before use, investigate incidents, and reuse provenance evidence across audits.',
    'nav.spec': 'Specification',
    'nav.concept': 'Design rationale',
    'nav.github': 'GitHub',
    'lang.switchTo': 'Switch language',
    'hero.epigraph': 'Continuous, verifiable data provenance',
    'hero.tagline': 'Verify how data was handled before acting on it.',
    'hero.lead':
      'dPLaaX ("data PipeLine as a X") is a protocol for data provenance via the data pipeline: it keeps a tamper-evident record connected as data moves across systems and organizations. A recipient can evaluate the handling path at the moment of use; when something goes wrong, the same record shows where to investigate and which organization signed the record for each step.',
    'cta.spec': 'Read the spec',
    'cta.concept': 'Why continuous provenance',
    'outcome.heading': 'What continuous provenance makes possible',
    'outcome.lead':
      'A connected record is more than evidence kept for a future audit. It becomes an input to decisions made while data is still moving.',
    'outcome.gate.title': 'Decide before data is used',
    'outcome.gate.body':
      'Apply policy to verified evidence at receipt: accept, quarantine, or deny before data reaches a warehouse, training corpus, or other external system.',
    'outcome.investigate.title': 'Locate failures and identify each signer',
    'outcome.investigate.body':
      'Trace an output back through its declared sources and processing steps, find where continuity failed, and identify the organization that signed each segment.',
    'outcome.audit.title': 'Reuse provenance evidence across audits',
    'outcome.audit.body':
      'For questions about origin, handling, and who signed each segment, use the same retained chain instead of collecting a new set of screenshots and logs for every audit.',
    'outcome.federation.title': 'Verify beyond one organization',
    'outcome.federation.body':
      'Partners, auditors, downstream services, and AI agents can evaluate the same portable records under their own trust policies without sharing one audit database.',
    'what.heading': 'Create evidence while data is moving',
    'what.body':
      'dPLaaX does not wait for an audit to reconstruct provenance. When data crosses a process boundary, it issues a signed credential recording who received what, what action was performed, and what was passed on. Where downstream systems retain the records they receive, the evidence does not depend on the issuer’s database remaining unchanged.',
    'value.heading': 'How dPLaaX makes the chain verifiable',
    'value.signature.title': 'Detect record tampering',
    'value.signature.body':
      'Each boundary record is cryptographically signed. A verifier can confirm the issuer and detect changes to the signed data.',
    'value.continuity.title': 'Verify data-flow continuity',
    'value.continuity.body':
      'Each record identifies its predecessor, while input and output digests bind adjacent steps. A verifier can check whether the declared flow remains connected.',
    'value.federation.title': 'Verify across organizations',
    'value.federation.body':
      'Shared wire schemas and verification rules let each organization run its own system while third parties evaluate the same evidence.',
    'line.heading': 'Why the record has to be continuous',
    'line.body':
      'One signed record can show only what one party attested at one boundary. It cannot show how the final data relates to its source or what happened between organizations. Linking the records turns separate claims into a path a system can follow — for a decision before use, an investigation after an incident, or evidence during an audit.',
    'line.diagramLabel': 'How signed boundary records form a verifiable provenance chain',
    'line.orgA': 'Organization A',
    'line.orgB': 'Organization B',
    'line.recipient': 'Recipient',
    'line.record1': 'Signed record 01',
    'line.record2': 'Signed record 02',
    'line.outputDigest': 'outputHash: H1',
    'line.linkedDigest': 'inputHash: H1 · outputHash: H2',
    'line.link': 'previousCredential + digest equality',
    'line.retained': 'Retains received record',
    'line.verify': 'Verify signatures and continuity',
    'line.policy': 'Policy decision',
    'line.result': 'ACCEPT · QUARANTINE · DENY',
    'line.asymmetry.heading': 'Forgery-cost asymmetry',
    'line.asymmetry.body':
      'AI keeps lowering the cost of producing a plausible standalone record. Retrospectively rewriting an already distributed provenance chain without detection requires compromising or colluding with the relevant signers and reconciling the rewrite with copies held downstream. dPLaaX moves trust decisions from “does this look genuine?” to “who signed the path, and does it verify end to end?”',
    'promises.heading': 'How to read the verification result',
    'promises.yes1':
      'It checks the signed record: issuer, integrity, predecessor link, and declared input/output continuity.',
    'promises.no1':
      'It does not prove that a value is true or that a transformation was semantically correct. A valid signature can still cover incorrect data.',
    'promises.no2':
      'It does not reveal a boundary that produced no record. Completeness requires operational controls in addition to the protocol.',
    'promises.trust':
      'The verifier still decides which identities and authorities to trust. dPLaaX supplies portable, checkable evidence for that decision; it does not make the trust decision on the verifier’s behalf.',
    'promises.complement':
      'dPLaaX does not replace domain-specific standards. It adds a common protocol for keeping provenance connected across process boundaries.',
    'ecosystem.heading': 'Ecosystem',
    'ecosystem.spec.title': 'Specification',
    'ecosystem.spec.desc':
      'Behavioral rules, JSON Schemas, and conformance vectors that let independent implementations produce and verify the same wire records.',
    'ecosystem.provin.title': 'provin',
    'ecosystem.provin.desc':
      'Go reference implementation for issuing, carrying, and verifying dPLaaX records in a distributed data pipeline.',
    'research.heading': 'Research behind the design',
    'research.lead':
      'The design builds on established provenance research: connected provenance supports trust decisions, error investigation, responsibility tracing, audit, and reproducibility.',
    'research.proof.title': 'Provenance-Based Data Acceptance in Cross-Organizational Pipelines',
    'research.proof.desc':
      'The dPLaaX systems paper: design, implementation, and evaluation of the protocol and the provin reference runtime — attributable, fail-closed acceptance at the point of delivery. Preprint.',
    'research.dplaax.title': 'Cryptographic Provenance Attestation in Data Pipelines',
    'research.dplaax.desc':
      'The dPLaaX foundation: signed process-boundary records for independently verifiable, cross-organizational data provenance.',
    'research.prov.title': 'W3C PROV Model Primer',
    'research.prov.desc':
      'A standard foundation for using provenance to assess trust, verify processes, reproduce results, inspect errors, and identify responsible parties.',
    'research.decision.title': 'Decision Provenance',
    'research.decision.desc':
      'Research on exposing cross-system data flows to support oversight, audit, compliance, risk mitigation, and accountability.',
    'status.heading': 'Status',
    'status.body':
      'v0.1 is a draft. Wire rules and schemas may change as feedback from the reference implementation is incorporated. Development is public, and review and contributions are welcome.',
    'status.cta': 'Contribute on GitHub',
    'notFound.title': 'Page not found',
    'notFound.body': 'The page you are looking for does not exist.',
    'notFound.back': 'Back to top',
    'footer.copyright': '© 2026 The dPLaaX Authors',
    'footer.tagline': 'verifiable provenance across boundaries',
    'footer.privacy': 'Privacy',
    'consent.message':
      'We use Google Analytics, through Google Tag Manager, to understand site usage. Allow analytics cookies?',
    'consent.details': 'Learn more',
    'consent.accept': 'Accept',
    'consent.decline': 'Continue without cookies',
    'privacy.title': 'Privacy',
    'privacy.description': 'How the dPLaaX website uses analytics and handles related data.',
    'privacy.lead': 'How this website, www.dplaax.dev, uses analytics and handles related data.',
    'privacy.updated': 'Last updated: November 11, 2026',
    'privacy.analytics.heading': 'Google Tag Manager and Google Analytics',
    'privacy.analytics.body':
      'This website loads Google Tag Manager (container GTM-K4X7SH7C), which runs Google Analytics 4 (measurement ID G-034LKCPDW9) to understand how the site is used and to improve its content. Analytics cookies are not stored until you select “Accept” in the notice at the bottom of the page. The website never grants consent for advertising storage, ad user data, or ad personalization.',
    'privacy.data.heading': 'Information sent',
    'privacy.data.body':
      'Before consent, or after you choose to continue without cookies, Google may receive cookieless measurement signals containing the pages you view, the referring page, and browser or device information. After consent, a client ID stored in a cookie is also used for measurement. Besides page views, the container measures scrolling, clicks on links to other sites, file downloads, site searches, and video and form interactions. This website has no forms and does not send names, email addresses, or other directly identifying information to Google Analytics.',
    'privacy.google.heading': 'How Google handles data',
    'privacy.google.body':
      'Google processes the information under its terms and privacy policy. For details, see “How Google uses information from sites or apps that use our services.”',
    'privacy.google.link': 'How Google uses information',
    'privacy.choice.heading': 'Changing your choice or opting out',
    'privacy.choice.body':
      'If you choose “Continue without cookies,” Analytics cookies are not used. Reset your choice below to decide again. The Google Analytics Opt-out Browser Add-on stops measurement, including cookieless signals.',
    'privacy.choice.reset': 'Reset analytics choice',
    'privacy.choice.resetDone': 'Your choice has been reset. The page will now reload.',
    'privacy.choice.optOut': 'Google Analytics Opt-out Browser Add-on',
    'privacy.operator.heading': 'Operator and contact',
    'privacy.operator.body':
      'This website is operated by 1o1 Co. Ltd., the maintainer of the dPLaaX specification. For website inquiries, please use the dplaax organization on GitHub.',
    'privacy.operator.contact': 'dplaax on GitHub',
  },
  ja: {
    'site.title': 'dPLaaX — 組織をまたぐデータ来歴を検証可能に',
    'site.description':
      '署名された境界記録を連結し、利用前の来歴検証、問題発生時の調査、来歴に関する監査証跡の再利用を可能にするオープンプロトコル。',
    'nav.spec': '仕様',
    'nav.concept': '設計思想',
    'nav.github': 'GitHub',
    'lang.switchTo': '言語を切り替え',
    'hero.epigraph': '連続した、検証可能なデータ来歴',
    'hero.tagline': 'データを使う前に、誰がどう扱ったかを検証する。',
    'hero.lead':
      'dPLaaX（"data PipeLine as a X"）は、データパイプラインを通じて来歴を証明するプロトコル。データが組織やシステムを移動しても、改ざん検出可能な取り扱い記録を切れ目なくつなぐ。受け手は利用時点でその経路を評価でき、問題が起きたときは同じ記録から調査すべき箇所と各段階の記録に署名した組織をたどれる。',
    'cta.spec': '仕様を読む',
    'cta.concept': 'なぜ連続した来歴が必要か',
    'outcome.heading': '連続した来歴によって、できるようになること',
    'outcome.lead':
      'つながった記録は、将来の監査のために保管するだけの証跡ではない。データが流れている最中の判断に使える。',
    'outcome.gate.title': '利用前に受け入れ可否を判定する',
    'outcome.gate.body':
      '受信時に検証結果をポリシーへ入力し、データがデータウェアハウスや学習コーパスなどへ入る前に、受け入れ・保留・拒否を分けられる。',
    'outcome.investigate.title': '問題箇所と区間ごとの署名主体を特定する',
    'outcome.investigate.body':
      '出力から申告された発生源と処理をさかのぼり、どこで連続性が崩れたか、各区間をどの組織が署名したかを確認できる。',
    'outcome.audit.title': '来歴に関する監査証跡を再利用する',
    'outcome.audit.body':
      '発生源・取り扱い・区間ごとの署名主体など、来歴に関する確認には、監査ごとにスクリーンショットやログを集め直さず、保持された同じ記録を使える。',
    'outcome.federation.title': '一つの組織を越えて検証する',
    'outcome.federation.body':
      '取引先、監査人、下流サービス、AI エージェントが、一つの監査データベースを共有せず、それぞれの信頼ポリシーで同じ記録を評価できる。',
    'what.heading': 'データが流れている時点で、証跡を作る',
    'what.body':
      'dPLaaX は、監査時に来歴を後から復元しない。データがプロセス境界を越える時点で、「誰が、何を受け取り、何を行い、何を渡したか」を署名付きクレデンシャルとして発行する。下流が受領記録を保持する構成では、証跡は発行者側のデータベースが変わらないことに依存しない。',
    'value.heading': '連続した記録を検証可能にする仕組み',
    'value.signature.title': '記録の改ざんを検出する',
    'value.signature.body':
      '境界ごとの記録に暗号署名を付ける。検証者は、誰が発行した記録かを確認し、署名後の変更を検出できる。',
    'value.continuity.title': 'データフローの連続性を検証する',
    'value.continuity.body':
      '各記録が直前の記録を指定し、隣接する処理の入出力ハッシュを結び付ける。申告されたデータの流れがつながっているかを検証できる。',
    'value.federation.title': '組織をまたいで検証する',
    'value.federation.body':
      '共通のワイヤスキーマと検証ルールを使うため、各組織が別々のシステムを運用していても、第三者は同じ証跡を評価できる。',
    'line.heading': 'なぜ、記録は連続していなければならないのか',
    'line.body':
      '一つの署名記録から分かるのは、一つの境界で一つの当事者が証明した内容までである。最終データが発生源とどうつながり、組織の間で何が起きたかは分からない。前後の記録を連結することで、個別の申告はシステムがたどれる経路になる。その同じ経路を、利用前の判定、問題発生後の調査、監査時の証跡に使える。',
    'line.diagramLabel': '署名された境界記録が検証可能な来歴を形成する仕組み',
    'line.orgA': '組織 A',
    'line.orgB': '組織 B',
    'line.recipient': '受け手',
    'line.record1': '署名記録 01',
    'line.record2': '署名記録 02',
    'line.outputDigest': 'outputHash: H1',
    'line.linkedDigest': 'inputHash: H1 · outputHash: H2',
    'line.link': 'previousCredential + ハッシュ一致',
    'line.retained': '受領記録を保持',
    'line.verify': '署名と連続性を検証',
    'line.policy': 'ポリシー判定',
    'line.result': 'ACCEPT · QUARANTINE · DENY',
    'line.asymmetry.heading': '偽造コストの非対称性',
    'line.asymmetry.body':
      'それらしい記録を単体で作るコストは、AI によって下がり続けている。一方、すでに複数の組織へ渡った来歴全体を、後から検出されずに書き換えるには、関係する署名鍵の侵害や署名者の共謀に加え、下流が保持する記録との整合が必要になる。dPLaaX は信頼判断を「内容が本物らしく見えるか」から「誰がその経路に署名し、連続性を検証できるか」へ移す。',
    'promises.heading': '検証結果の読み方',
    'promises.yes1':
      '発行者、記録の完全性、直前の記録との連結、申告された入出力の連続性を検証する。',
    'promises.no1':
      '値が事実か、処理内容が意味的に正しいかは証明しない。正しく署名された記録にも、誤ったデータは含まれうる。',
    'promises.no2':
      '記録を発行しなかった境界の存在は検出できない。網羅性を確保するには、プロトコルに加えて運用上の統制が必要になる。',
    'promises.trust':
      'どの身元と権限を信頼するかは、検証者が判断する。dPLaaX はその判断に使える持ち運び可能な証跡を提供するが、判断そのものを代行しない。',
    'promises.complement':
      'dPLaaX は分野ごとの既存標準を置き換えない。プロセス境界をまたいで来歴をつなぐための、共通プロトコルを追加する。',
    'ecosystem.heading': 'エコシステム',
    'ecosystem.spec.title': '仕様',
    'ecosystem.spec.desc':
      '別々の実装が同じワイヤ記録を生成・検証するための、動作ルール、JSON Schema、適合性ベクトル。',
    'ecosystem.provin.title': 'provin',
    'ecosystem.provin.desc':
      '分散データパイプラインで dPLaaX の記録を発行・伝達・検証する、Go 製のリファレンス実装。',
    'research.heading': '設計の根拠となる研究',
    'research.lead':
      '来歴研究では、つながった来歴が信頼判断、エラー調査、責任主体の追跡、監査、再現性に役立つことが示されている。dPLaaX はこれを組織間のデータフローで暗号的に検証できる形にする。',
    'research.proof.title': 'Provenance-Based Data Acceptance in Cross-Organizational Pipelines',
    'research.proof.desc':
      'dPLaaX の実証論文。プロトコルと参照実装 provin の設計・実装・評価により、配送時点での帰属可能なフェイルクローズド受理を三組織構成で検証する（プレプリント）。',
    'research.dplaax.title': 'Cryptographic Provenance Attestation in Data Pipelines',
    'research.dplaax.desc':
      'dPLaaX の基礎論文。組織をまたぐデータ来歴を第三者が検証するための、プロセス境界単位の署名記録を提案する。',
    'research.prov.title': 'W3C PROV Model Primer',
    'research.prov.desc':
      '来歴を、信頼判断、プロセス検証、結果の再現、エラー調査、責任主体の特定に使うための標準的な基礎。',
    'research.decision.title': 'Decision Provenance',
    'research.decision.desc':
      'システムや組織をまたぐデータフローの可視化が、監督、監査、コンプライアンス、リスク低減、説明責任にどう役立つかを論じる研究。',
    'status.heading': 'ステータス',
    'status.body':
      'v0.1 は draft。リファレンス実装からのフィードバックを反映する過程で、ワイヤルールやスキーマは変更される可能性がある。開発は公開で進めており、レビューとコントリビューションを歓迎する。',
    'status.cta': 'GitHub でコントリビュート',
    'notFound.title': 'ページが見つかりません',
    'notFound.body': 'お探しのページは存在しません。',
    'notFound.back': 'トップへ戻る',
    'footer.copyright': '© 2026 The dPLaaX Authors',
    'footer.tagline': '組織をまたぐデータ来歴を検証可能に',
    'footer.privacy': 'プライバシー',
    'consent.message':
      'アクセス状況の把握に、Google タグマネージャー経由で Google Analytics を使用します。Cookie を使った計測に同意しますか？',
    'consent.details': '詳しく見る',
    'consent.accept': '同意する',
    'consent.decline': 'Cookie なしで続ける',
    'privacy.title': 'プライバシー',
    'privacy.description': 'dPLaaX ウェブサイトにおけるアクセス解析とデータの取り扱いについて。',
    'privacy.lead':
      '当サイト（www.dplaax.dev）における、アクセス解析とデータの取り扱いについて説明します。',
    'privacy.updated': '最終更新：2026年11月11日',
    'privacy.analytics.heading': 'Google タグマネージャーと Google Analytics の利用',
    'privacy.analytics.body':
      '当サイトは、利用状況を把握し、内容を改善するために Google タグマネージャー（コンテナ GTM-K4X7SH7C）を読み込み、そこから Google Analytics 4（測定 ID G-034LKCPDW9）を動かします。画面下部の案内で「同意する」を選ぶまで、Analytics の Cookie は保存されません。広告用のストレージ、広告用のユーザーデータ、広告のパーソナライズへの同意は、当サイトでは常に拒否のままです。',
    'privacy.data.heading': '送信される情報',
    'privacy.data.body':
      '同意前、または「Cookie なしで続ける」を選んだあとも、閲覧したページ、参照元、ブラウザーや端末に関する情報などを含む、Cookie を使わない計測信号が Google に送信される場合があります。同意後は、Cookie に保存されるクライアント ID も計測に使われます。コンテナは、ページの閲覧のほか、スクロール、外部サイトへのリンクのクリック、ファイルのダウンロード、サイト内検索、動画とフォームの操作を計測します。当サイトにはフォームが無く、氏名やメールアドレスなどを Google Analytics に送信することはありません。',
    'privacy.google.heading': 'Google によるデータの取り扱い',
    'privacy.google.body':
      '送信された情報は、Google の利用規約とプライバシーポリシーに基づいて処理されます。詳しくは、Google の「サービスを使用するサイトやアプリから収集した情報の Google による使用」をご確認ください。',
    'privacy.google.link': 'Google による情報の使用について',
    'privacy.choice.heading': '同意の変更・計測の停止',
    'privacy.choice.body':
      '「Cookie なしで続ける」を選ぶと、Analytics の Cookie は使われません。下のボタンで選択をリセットすると、もう一度選び直せます。Google Analytics オプトアウト アドオンを使えば、Cookie を使わない計測を含めて停止できます。',
    'privacy.choice.reset': 'Analytics の選択をリセット',
    'privacy.choice.resetDone': '選択をリセットしました。ページを再読み込みします。',
    'privacy.choice.optOut': 'Google Analytics オプトアウト アドオン',
    'privacy.operator.heading': '運営・お問い合わせ',
    'privacy.operator.body':
      '当サイトは、dPLaaX 仕様の maintainer である株式会社 1o1 が運営しています。サイトに関するお問い合わせは、GitHub の dplaax organization からお願いします。',
    'privacy.operator.contact': 'GitHub の dplaax',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type StringKey = keyof (typeof strings)['en'];

export function t(locale: Locale, key: StringKey): string {
  return strings[locale][key] ?? strings[defaultLocale][key] ?? key;
}

export const links = {
  spec: 'https://github.com/dplaax/spec',
  concept: 'https://github.com/dplaax/spec/blob/main/concept.md',
  conceptJa: 'https://github.com/dplaax/spec/blob/main/concept.ja.md',
  contributing: 'https://github.com/dplaax/spec/blob/main/CONTRIBUTING.md',
  org: 'https://github.com/dplaax',
  provin: 'https://github.com/provin-line',
  paperProof: 'https://doi.org/10.5281/zenodo.21853326',
  paperProvenance: 'https://doi.org/10.5281/zenodo.20042030',
  w3cProv: 'https://www.w3.org/TR/prov-primer/',
  paperDecision: 'https://doi.org/10.1109/ACCESS.2018.2887201',
  googlePartnerSites: 'https://policies.google.com/technologies/partner-sites?hl=en',
  googlePartnerSitesJa: 'https://policies.google.com/technologies/partner-sites?hl=ja',
  gaOptOut: 'https://tools.google.com/dlpage/gaoptout?hl=en',
  gaOptOutJa: 'https://tools.google.com/dlpage/gaoptout?hl=ja',
} as const;

export function conceptLink(locale: Locale): string {
  return locale === 'ja' ? links.conceptJa : links.concept;
}

export function googlePartnerSitesLink(locale: Locale): string {
  return locale === 'ja' ? links.googlePartnerSitesJa : links.googlePartnerSites;
}

export function gaOptOutLink(locale: Locale): string {
  return locale === 'ja' ? links.gaOptOutJa : links.gaOptOut;
}
