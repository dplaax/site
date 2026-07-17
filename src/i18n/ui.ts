export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
};

const strings = {
  en: {
    'site.title': 'dPLaaX — proving the line, not the points',
    'site.description':
      'A protocol for continuous, federated data provenance — independently verifiable, boundary by boundary, across organizations.',
    'nav.spec': 'Specification',
    'nav.concept': 'Concept',
    'nav.github': 'GitHub',
    'lang.switchTo': 'Switch language',
    'hero.epigraph':
      'Provenance has long only marked the points regulation demands. But no matter how many points you stack, you never draw the line.',
    'hero.tagline': 'Continuous provenance — proving the line, not the points.',
    'hero.lead':
      'dPLaaX ("data PipeLine as a X") is a protocol for continuous, federated data provenance — independently verifiable, boundary by boundary, across organizations.',
    'cta.spec': 'Read the spec',
    'cta.concept': 'Why dPLaaX',
    'what.heading': 'A protocol of boundary commitments',
    'what.body':
      'Whenever data crosses the boundary of an organization or a system, dPLaaX records — in a tamper-evident form — who received what, what was done to it, and what was passed on, and links each record to the one before it. The result is not a scattered set of audit points but a single line that any third party can verify independently, without a central trust authority.',
    'line.heading': 'Points are cheap. Lines are not.',
    'line.body':
      'A fabricated point — a polished document, an internally consistent figure, a record that looks authentic — is cheap, and generative technology keeps making it cheaper. A fabricated line is not: it would demand the signing keys of every boundary it crossed and consistency with records already held downstream. dPLaaX shifts the weight of trust from "does the artifact look genuine?" to "can the line be verified?"',
    'line.pointsLabel': 'audit points',
    'line.lineLabel': 'a provenance line',
    'promises.heading': 'What it promises — and what it does not',
    'promises.yes1':
      'Authenticity and continuity of the record: each link is signed, and the chain is unbroken and checkable.',
    'promises.no1':
      'Not the truth of the contents. If a source records a wrong value, that value stays wrong even when the line is complete.',
    'promises.no2':
      'Not completeness on its own. The existence of an unrecorded boundary cannot be proven from the records that remain.',
    'promises.complement':
      'dPLaaX complements existing standards — W3C Verifiable Credentials, and efforts such as OASIS DPS and IETF SCITT — by carrying the layer they leave out of scope: continuity from the boundary of reception through to output. Not a competitor.',
    'ecosystem.heading': 'Ecosystem',
    'ecosystem.spec.title': 'Specification',
    'ecosystem.spec.desc':
      'The normative spec — rule catalog, wire schemas, and conformance vectors. Drafted in the open; public review welcome.',
    'ecosystem.provin.title': 'provin',
    'ecosystem.provin.desc':
      'Reference implementation (Go) — a distributed data pipeline engine that proves provenance as data flows.',
    'status.heading': 'Status',
    'status.body':
      'v0.1 (draft). All rules are in draft state and will continue to evolve based on implementation feedback. Public review and contributions are welcome.',
    'status.cta': 'Contribute on GitHub',
    'notFound.title': 'Page not found',
    'notFound.body': 'The page you are looking for does not exist.',
    'notFound.back': 'Back to top',
    'footer.copyright': '© 2026 1o1 Co. Ltd.',
    'footer.tagline': 'proving the line, not the points',
  },
  ja: {
    'site.title': 'dPLaaX — 点ではなく、線を証明する',
    'site.description':
      '組織を越えて、境界ごとに独立に検証できる、連続した来歴のためのプロトコル。',
    'nav.spec': '仕様',
    'nav.concept': 'コンセプト',
    'nav.github': 'GitHub',
    'lang.switchTo': '言語を切り替え',
    'hero.epigraph':
      '来歴はこれまで、規制が求める点にしか刻まれてこなかった。しかし点をいくら積み上げても、線は描けない。',
    'hero.tagline': '連続する来歴 — 点ではなく、線を証明する。',
    'hero.lead':
      'dPLaaX（"data PipeLine as a X"）は、組織を越えて、境界ごとに独立に検証できる、連続した来歴のためのプロトコル。',
    'cta.spec': '仕様を読む',
    'cta.concept': 'なぜ dPLaaX か',
    'what.heading': '境界の約束事のプロトコル',
    'what.body':
      'データが組織やシステムの境界を越えるとき、dPLaaX は「誰が、何を受け取り、何を行い、何を渡したか」を、あとから改ざんすれば検出される形で記録し、各記録を直前の記録へ連結する。生まれるのは散在する監査の点ではなく、中央の信頼機関なしに第三者が独立に検証できる、一本の線である。',
    'line.heading': '点は安い。線は安くない。',
    'line.body':
      '整った書類、辻褄の合う数値、本物らしく見える記録 — 尤もらしい点を捏造することは元来安価であり、生成技術はそのコストをさらに押し下げていく。だが連結された線の捏造は違う。通過した各境界の署名鍵と、下流がすでに受け取った記録との整合が要る。dPLaaX は信頼の重みを「成果物が本物らしく見えるか」から「来歴の線が確かめられるか」へ移す。',
    'line.pointsLabel': '監査の点',
    'line.lineLabel': '来歴の線',
    'promises.heading': '約束すること・しないこと',
    'promises.yes1': '記録の真正性と連続性。各リンクは署名され、連なりは途切れなく検証できる。',
    'promises.no1':
      '内容の真実性は保証しない。発生源が誤った値を記録すれば、線が完全でも値は誤ったままである。',
    'promises.no2':
      '網羅性も単独では保証しない。記録されなかった境界の存在を、残された記録だけから証明することはできない。',
    'promises.complement':
      'dPLaaX は既存標準 — W3C Verifiable Credentials、OASIS DPS や IETF SCITT といった取り組み — を置き換えるものではなく、それらがスコープ外とする層、すなわち受領境界から出力までの連続性を担って補完する。',
    'ecosystem.heading': 'エコシステム',
    'ecosystem.spec.title': '仕様',
    'ecosystem.spec.desc':
      '規範仕様 — ルールカタログ、ワイヤスキーマ、適合性ベクトル。策定はオープンに進行中。パブリックレビュー歓迎。',
    'ecosystem.provin.title': 'provin',
    'ecosystem.provin.desc':
      'リファレンス実装 (Go) — データを運びながら来歴を証明する、分散型データパイプラインエンジン。',
    'status.heading': 'ステータス',
    'status.body':
      'v0.1（draft）。すべてのルールは draft であり、実装からのフィードバックに基づいて進化を続ける。パブリックレビューとコントリビューションを歓迎。',
    'status.cta': 'GitHub でコントリビュート',
    'notFound.title': 'ページが見つかりません',
    'notFound.body': 'お探しのページは存在しません。',
    'notFound.back': 'トップへ戻る',
    'footer.copyright': '© 2026 1o1 Co. Ltd.',
    'footer.tagline': '点ではなく、線を証明する',
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
} as const;

export function conceptLink(locale: Locale): string {
  return locale === 'ja' ? links.conceptJa : links.concept;
}
