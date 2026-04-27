/* =============================================
   I18N — Sistema de tradução PT / EN
   Detecção automática por navigator.language
   ============================================= */

const TRANSLATIONS = {
  pt: {
    /* Nav */
    nav_features:    'FUNCIONALIDADES',
    nav_how:         'COMO FUNCIONA',
    nav_cases:       'CASES',
    nav_pricing:     'PLANOS',
    nav_faq:         'F.A.Q',
    nav_login:       'LOGIN',
    nav_cta:         'CRIAR MEU APP',

    /* Hero */
    hero_eyebrow:    'Shopify · Nuvemshop · Sites Próprios',
    hero_headline_1: 'O canal que transforma',
    hero_headline_2: 'tráfego em',
    hero_accent:     'recorrência.',
    hero_sub:        'Sua loja no celular do cliente, com notificações, campanhas, analytics e publicação nas lojas de aplicativo em até 14 dias.',
    hero_stat1_label:'Faturamento gerado aos clientes',
    hero_stat2_label:'Apps lançados em 2026',
    hero_stat3_num:  '7 a 14 dias',
    hero_stat3_label:'Para publicar nas stores',
    hero_cta1:       'Crie seu app',
    hero_cta2:       'Fale conosco',

    /* Marquee */
    marquee_items: [
      'Shopify', 'Nuvemshop', 'Sites Próprios',
      'Push Notifications', 'Analytics', 'iOS', 'Android',
      'Firebase', 'Supabase', 'Publicação em 14 dias'
    ],
  },

  en: {
    /* Nav */
    nav_features:    'FEATURES',
    nav_how:         'HOW IT WORKS',
    nav_cases:       'CASES',
    nav_pricing:     'PRICING',
    nav_faq:         'F.A.Q',
    nav_login:       'LOGIN',
    nav_cta:         'CREATE MY APP',

    /* Hero */
    hero_eyebrow:    'Shopify · Nuvemshop · Own Sites',
    hero_headline_1: 'The channel that turns',
    hero_headline_2: 'traffic into',
    hero_accent:     'recurring revenue.',
    hero_sub:        'Your store on your customer\'s phone, with notifications, campaigns, analytics and app store publishing in up to 14 days.',
    hero_stat1_label:'Revenue generated for clients',
    hero_stat2_label:'Apps launched in 2026',
    hero_stat3_num:  '7–14 days',
    hero_stat3_label:'To publish on the stores',
    hero_cta1:       'Create my app',
    hero_cta2:       'Talk to us',

    /* Marquee */
    marquee_items: [
      'Shopify', 'Nuvemshop', 'Own Sites',
      'Push Notifications', 'Analytics', 'iOS', 'Android',
      'Firebase', 'Supabase', 'Published in 14 days'
    ],
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

  /* Helper: texto simples */
  function setText(sel, val) {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  }

  /* Nav links */
  setText('[data-i18n="nav_features"]', t.nav_features);
  setText('[data-i18n="nav_how"]',      t.nav_how);
  setText('[data-i18n="nav_cases"]',    t.nav_cases);
  setText('[data-i18n="nav_pricing"]',  t.nav_pricing);
  setText('[data-i18n="nav_faq"]',      t.nav_faq);
  setText('[data-i18n="nav_login"]',    t.nav_login);
  setText('[data-i18n="nav_cta"]',      t.nav_cta);

  /* Hero */
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

  /* Marquee — reconstrói os itens */
  const track = document.querySelector('.marquee__track');
  if (track) {
    const items = [...t.marquee_items, ...t.marquee_items]; /* duplica para loop infinito */
    track.innerHTML = items
      .map(item => `<span class="marquee__item">${item}</span>`)
      .join('');
  }

  /* Botão de idioma: atualiza estado ativo */
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
