/* =============================================
   I18N — Sistema de tradução PT / EN
   Detecção automática por navigator.language
   Cobre: nav, hero, marquee, story, steps, cases
   ============================================= */

const TRANSLATIONS = {
  pt: {
    /* Nav */
    nav_features: 'FUNCIONALIDADES',
    nav_how:      'COMO FUNCIONA',
    nav_cases:    'CASES',
    nav_pricing:  'PLANOS',
    nav_faq:      'F.A.Q',
    nav_login:    'LOGIN',
    nav_cta:      'CRIAR MEU APP',

    /* Hero */
    hero_eyebrow:     'Shopify · Nuvemshop · Sites Próprios',
    hero_headline_1:  'O canal que transforma',
    hero_headline_2:  'tráfego em',
    hero_accent:      ' Recorrência.',
    hero_sub:         'Sua loja no celular do cliente, com notificações, campanhas, analytics e publicação nas lojas de aplicativo em até 14 dias.',
    hero_stat1_label: 'Faturamento gerado aos clientes',
    hero_stat2_label: 'Apps lançados em 2026',
    hero_stat3_num:   '7 a 14 dias',
    hero_stat3_label: 'Para publicar nas stores',
    hero_cta1:        'Crie seu app',
    hero_cta2:        'Fale conosco',

    /* Marquee */
    marquee_items: [
      'Shopify', 'Nuvemshop', 'Notificações Ilimitadas', 'Analytics', 'iOS', 'Android',
      'Publicação em 14 dias', 'Campanhas de Venda', 'Personalização do App', 'Sincronização Instantânea'
    ],

    /* Story / Pain */
    story_label:       'POR QUE VOCÊ PRECISA DE UM APP',
    story_headline:    'O dinheiro que você já tem,\nmas ainda não recupera.',
    story_card1_num:   '01',
    story_card1_title: 'Você depende de tráfego pago para vender',
    story_card1_text:  'Cada venda custa caro. Sem canal próprio, você financia o crescimento do Google e do Meta, não o seu.',
    story_card2_num:   '02',
    story_card2_title: 'Seu cliente comprou uma vez e sumiu',
    story_card2_text:  'Email tem 18% de abertura. Notificação tem 90%. Quem não tem app não tem como reconquistar o cliente sem pagar de novo por ele.',
    story_card3_num:   '03',
    story_card3_title: 'Mobile representa mais de 70% das suas visitas',
    story_card3_text:  'Um app com sincronização automática e instantânea com fluidez tão boa quanto o site na internet ganha o coração do seu cliente.',
    story_pivot:       'O app não é tecnologia.\nÉ o canal que faltava.',

    /* Como Funciona — Steps */
    steps_label:  'PROCESSO SIMPLES',
    steps_headline: 'Três passos para\nseu app no ar',
    steps_num1:   '01',
    steps_title1: 'Responda o quiz ou fale com um especialista',
    steps_text1:  'Em menos de 3 minutos você descobre qual plano faz sentido para o seu negócio. Prefere conversar? Nosso time está no WhatsApp.',
    steps_num2:   '02',
    steps_title2: 'Seu app é produzido',
    steps_text2:  'Após o alinhamento do projeto e contrato assinado, nossa equipe configura e personaliza o app com a identidade da sua marca. Sem código, sem complicação.',
    steps_num3:   '03',
    steps_title3: 'Publicação e acompanhamento',
    steps_text3:  'Seu app vai para a App Store e Google Play em 7 a 14 dias. No primeiro mês, nossa equipe acompanha de perto os resultados e ajuda a explorar cada funcionalidade.',
    steps_cta1:   'Responder o quiz',
    steps_cta2:   'Falar com especialista',

    /* Cases */
    cases_label:    'CASES REAIS',
    cases_headline: 'Quem já usa\na Korza',
  },

  en: {
    /* Nav */
    nav_features: 'FEATURES',
    nav_how:      'HOW IT WORKS',
    nav_cases:    'CASES',
    nav_pricing:  'PRICING',
    nav_faq:      'F.A.Q',
    nav_login:    'LOGIN',
    nav_cta:      'CREATE MY APP',

    /* Hero */
    hero_eyebrow:     'Shopify · Nuvemshop · Own Sites',
    hero_headline_1:  'The channel that turns',
    hero_headline_2:  'traffic into',
    hero_accent:      ' recurring revenue.',
    hero_sub:         'Your store on your customer\'s phone, with push notifications, campaigns, analytics and app store publishing in up to 14 days.',
    hero_stat1_label: 'Revenue generated for clients',
    hero_stat2_label: 'Apps launched in 2026',
    hero_stat3_num:   '7–14 days',
    hero_stat3_label: 'To publish on the stores',
    hero_cta1:        'Create my app',
    hero_cta2:        'Talk to us',

    /* Marquee */
    marquee_items: [
      'Shopify', 'Nuvemshop', 'Unlimited Push Notifications', 'Analytics', 'iOS', 'Android',
      'Published in 14 days', 'Sales Campaigns', 'App Customization', 'Instant Sync'
    ],

    /* Story / Pain */
    story_label:       'WHY YOU NEED AN APP',
    story_headline:    'The money you already have,\nbut haven\'t recovered yet.',
    story_card1_num:   '01',
    story_card1_title: 'You depend on paid traffic to sell',
    story_card1_text:  'Every sale is costly. Without your own channel, you\'re funding Google and Meta\'s growth, not yours.',
    story_card2_num:   '02',
    story_card2_title: 'Your customer bought once and disappeared',
    story_card2_text:  'Email has 18% open rates. Push notifications have 90%. Without an app you can\'t win back customers without paying for them again.',
    story_card3_num:   '03',
    story_card3_title: 'Mobile accounts for over 70% of your visits',
    story_card3_text:  'An app with automatic, instant sync as smooth as your website wins your customer\'s heart.',
    story_pivot:       'The app isn\'t technology.\nIt\'s the missing channel.',

    /* Como Funciona — Steps */
    steps_label:  'SIMPLE PROCESS',
    steps_headline: 'Three steps to\nlaunch your app',
    steps_num1:   '01',
    steps_title1: 'Take the quiz or talk to a specialist',
    steps_text1:  'In less than 3 minutes you\'ll find out which plan makes sense for your business. Prefer to chat? Our team is on WhatsApp.',
    steps_num2:   '02',
    steps_title2: 'Your app is built',
    steps_text2:  'After project alignment and contract signing, our team configures and customizes the app with your brand identity. No code, no hassle.',
    steps_num3:   '03',
    steps_title3: 'Publishing and onboarding',
    steps_text3:  'Your app goes live on the App Store and Google Play in 7 to 14 days. In the first month, our team closely monitors results and helps you explore every feature.',
    steps_cta1:   'Take the quiz',
    steps_cta2:   'Talk to a specialist',

    /* Cases */
    cases_label:    'REAL CASES',
    cases_headline: 'Who already uses\nKorza',
  }
};

/* ---------- Detecta idioma ---------- */
function detectLang() {
  const saved = localStorage.getItem('korza_lang');
  if (saved === 'pt' || saved === 'en') return saved;
  const browser = (navigator.language || 'pt').toLowerCase();
  return browser.startsWith('en') ? 'en' : 'pt';
}

/* ---------- Aplica traduções ao DOM ---------- */
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  /* Salva preferência */
  localStorage.setItem('korza_lang', lang);

  /* Atualiza atributo lang no html */
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  /* Helper: texto simples via textContent */
  function setText(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  }

  /* Helper: texto com quebras de linha (\n → <br>) via innerHTML */
  function setLines(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = val.replace(/\n/g, '<br />');
  }

  /* ── Nav ── */
  setText('[data-i18n="nav_features"]', t.nav_features);
  setText('[data-i18n="nav_how"]',      t.nav_how);
  setText('[data-i18n="nav_cases"]',    t.nav_cases);
  setText('[data-i18n="nav_pricing"]',  t.nav_pricing);
  setText('[data-i18n="nav_faq"]',      t.nav_faq);
  setText('[data-i18n="nav_login"]',    t.nav_login);
  setText('[data-i18n="nav_cta"]',      t.nav_cta);

  /* ── Hero ── */
  setText('[data-i18n="hero_eyebrow"]',    t.hero_eyebrow);
  setText('[data-i18n="hero_headline_1"]', t.hero_headline_1);
  setText('[data-i18n="hero_headline_2"]', t.hero_headline_2);
  setText('[data-i18n="hero_accent"]',     t.hero_accent);
  setText('[data-i18n="hero_sub"]',        t.hero_sub);
  setText('[data-i18n="hero_stat1_label"]',t.hero_stat1_label);
  setText('[data-i18n="hero_stat2_label"]',t.hero_stat2_label);
  setText('[data-i18n="hero_stat3_num"]',  t.hero_stat3_num);
  setText('[data-i18n="hero_stat3_label"]',t.hero_stat3_label);
  setText('[data-i18n="hero_cta1"]',       t.hero_cta1);
  setText('[data-i18n="hero_cta2"]',       t.hero_cta2);

  /* ── Marquee — reconstrói os itens ── */
  const track = document.querySelector('.marquee__track');
  if (track) {
    const items = [...t.marquee_items, ...t.marquee_items]; /* duplica para loop infinito */
    track.innerHTML = items
      .map(item => `<span class="marquee__item">${item}</span>`)
      .join('');
  }

  /* ── Story / Pain ── */
  setText('[data-i18n="story_label"]',       t.story_label);
  setLines('[data-i18n="story_headline"]',   t.story_headline);
  setText('[data-i18n="story_card1_num"]',   t.story_card1_num);
  setText('[data-i18n="story_card1_title"]', t.story_card1_title);
  setText('[data-i18n="story_card1_text"]',  t.story_card1_text);
  setText('[data-i18n="story_card2_num"]',   t.story_card2_num);
  setText('[data-i18n="story_card2_title"]', t.story_card2_title);
  setText('[data-i18n="story_card2_text"]',  t.story_card2_text);
  setText('[data-i18n="story_card3_num"]',   t.story_card3_num);
  setText('[data-i18n="story_card3_title"]', t.story_card3_title);
  setText('[data-i18n="story_card3_text"]',  t.story_card3_text);

  /* ── Como Funciona — Steps ── */
  setText('[data-i18n="steps_label"]',   t.steps_label);
  setLines('[data-i18n="steps_headline"]', t.steps_headline);
  setText('[data-i18n="steps_num1"]',    t.steps_num1);
  setText('[data-i18n="steps_title1"]',  t.steps_title1);
  setText('[data-i18n="steps_text1"]',   t.steps_text1);
  setText('[data-i18n="steps_num2"]',    t.steps_num2);
  setText('[data-i18n="steps_title2"]',  t.steps_title2);
  setText('[data-i18n="steps_text2"]',   t.steps_text2);
  setText('[data-i18n="steps_num3"]',    t.steps_num3);
  setText('[data-i18n="steps_title3"]',  t.steps_title3);
  setText('[data-i18n="steps_text3"]',   t.steps_text3);
  setText('[data-i18n="steps_cta1"]',    t.steps_cta1);
  setText('[data-i18n="steps_cta2"]',    t.steps_cta2);

  /* ── Cases ── */
  setText('[data-i18n="cases_label"]',      t.cases_label);
  setLines('[data-i18n="cases_headline"]',  t.cases_headline);

  /* ── Botão de idioma: atualiza estado ativo ── */
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('lang-btn--active', btn.dataset.langBtn === lang);
  });
}

/* ---------- Inicializa ---------- */
function initI18n() {
  const lang = detectLang();
  applyTranslations(lang);

  /* Listeners nos botões PT / EN */
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyTranslations(btn.dataset.langBtn));
  });
}

document.addEventListener('DOMContentLoaded', initI18n);
