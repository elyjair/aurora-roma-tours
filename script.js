// ===== Reveal on scroll =====
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));
})();

// ===== Language switcher (IT default, EN optional) =====
(function () {
  const EN = {
    'meta.title': 'Aurora Roma Tours — Tours, experiences and itineraries in Rome',
    'meta.description': 'Guided tours, experiences and the Aurora Roma Self self-guided tour: discover Rome with Aurora Roma Tours, assisted by our virtual agent.',
    'nav.tour': 'Tours',
    'nav.monuments': 'Monuments',
    'nav.support': 'Support',
    'nav.cta': 'Contact us',
    'hero.eyebrow': 'Rome, your way',
    'hero.title': 'Every stone<br>has a <em>story</em><br>to tell you',
    'hero.lede': "Skip-the-line guided tours, tailor-made experiences and our self-guided itinerary Aurora Roma Self: snap a photo of a monument and we'll tell you its story, in real time, wherever you are in the city.",
    'hero.cta1': 'Discover the tours',
    'hero.cta2': 'How Aurora Self works',
    'hero.imgAlt': 'Illustration of the Colosseum',
    'hero.badge': '📍 More than 50 places and monuments told in real time',
    'value.1.text': 'Priority access to the most popular sites, no queuing in the sun.',
    'value.2.title': 'WhatsApp support',
    'value.2.text': 'Vouchers, payments, meeting point: we reply right away, even while you travel.',
    'value.3.title': 'Expert guides',
    'value.3.text': 'Carefully crafted stories, never recited: real history, real anecdotes.',
    'value.4.title': 'Free to explore',
    'value.4.text': 'With Aurora Self, you set the pace of the tour, monument after monument.',
    'tours.eyebrow': 'Catalogue',
    'tours.title': 'Our tours',
    'tours.lede': 'From the great classics to evening experiences, every itinerary is led by people who live Rome every day.',
    'tours.more': 'See all tours and experiences',
    'meta.3h': '3 hours',
    'meta.2h': '2 hours',
    'meta.walking': 'Walking',
    'meta.evening': 'Evening',
    'tour.from': 'From',
    'tour.info': 'Request info →',
    'tour.1.title': 'Colosseum, Roman Forum and Palatine Hill',
    'tour.1.text': "The gladiators' arena, the political heart of ancient Rome and the imperial residences, all in one queue-free tour.",
    'tour.2.title': "Vatican Museums and St. Peter's Basilica",
    'tour.2.text': 'The Sistine Chapel, timeless masterpieces and the majesty of the largest Christian church in the world.',
    'tour.3.title': 'Baroque Rome on Foot',
    'tour.3.text': 'The Pantheon, Piazza Navona and the Trevi Fountain: the Rome of monumental fountains, full of anecdotes and legends.',
    'tour.4.text': "Four stops among historic trattorias and local shops, in Rome's most authentic neighbourhood.",
    'self.badge': 'Tech preview',
    'self.eyebrow': 'The tour that adapts to you',
    'self.lede': 'No groups, no fixed schedules. Walk around Rome at your own pace: in front of every monument, take a photo and instantly receive its story, straight to WhatsApp.',
    'self.duration': 'Duration',
    'self.durationVal': 'Flexible',
    'self.price': 'Price',
    'self.priceVal': '€ 15 per person',
    'self.meeting': 'Meeting point',
    'self.meetingVal': 'None',
    'self.cta': 'Try Aurora Self',
    'step.1.title': 'Get your itinerary',
    'step.1.text': "After purchase, you'll receive a digital voucher on WhatsApp with a suggested route: follow it or explore your own way.",
    'step.2.title': 'Take a photo',
    'step.2.text': 'In front of a monument, a fountain or a square, snap a photo and send it in the chat to Aurora, our virtual assistant.',
    'step.3.title': 'Get the story',
    'step.3.text': "Within seconds you'll receive the history, fun facts and historical period of the place, plus a suggestion for your next stop.",
    'monu.eyebrow': "Aurora's archive",
    'monu.title': 'Over 50 places, told',
    'monu.text': "From the Colosseum to the alleys of Trastevere, all the way to the Appian Way: the archive that powers Aurora Self's photo recognition.",
    'monu.colosseum': 'Colosseum',
    'monu.trevi': 'Trevi Fountain',
    'monu.stpeter': "St. Peter's Basilica",
    'monu.cestius': 'Pyramid of Cestius',
    'monu.appia': 'Appian Way',
    'assist.title': 'Have a question about an order?',
    'assist.text': "Vouchers, payments, date changes: message us in the chat or on WhatsApp, we'll reply right away.",
    'assist.1': 'Voucher not received<small>Checked and resent within 24h</small>',
    'assist.2': 'Payment issues<small>Checked and refunded within 10 days</small>',
    'assist.3': 'Date change<small>Free up to 48h before</small>',
    'footer.tagline': 'Tours, experiences and itineraries in Rome, told by people who live the city every day.',
    'footer.explore': 'Explore',
    'footer.tours': 'Guided tours',
    'footer.archive': 'Monument archive',
    'footer.chat': 'Chat with us',
    'footer.terms': 'Terms of sale',
    'footer.demo': 'Aurora Roma Tours is a fictional brand created for demo purposes for the Algho Customer Experience package (Vection Technologies). It does not represent a real business.',
  };

  const STORAGE_KEY = 'aurora-lang';
  const textEls = document.querySelectorAll('[data-i18n]');
  const altEls = document.querySelectorAll('[data-i18n-alt]');
  const metaDesc = document.querySelector('meta[name="description"]');
  const buttons = document.querySelectorAll('.lang-btn');

  // Italian is authored in the HTML; capture it so we can switch back.
  const IT = { 'meta.title': document.title, 'meta.description': metaDesc ? metaDesc.content : '' };
  textEls.forEach((el) => { IT[el.dataset.i18n] = el.innerHTML; });
  altEls.forEach((el) => { IT[el.dataset.i18nAlt] = el.alt; });
  const dict = { it: IT, en: EN };

  function apply(lang) {
    const d = dict[lang];
    textEls.forEach((el) => { if (d[el.dataset.i18n] != null) el.innerHTML = d[el.dataset.i18n]; });
    altEls.forEach((el) => { if (d[el.dataset.i18nAlt] != null) el.alt = d[el.dataset.i18nAlt]; });
    document.title = d['meta.title'];
    if (metaDesc) metaDesc.content = d['meta.description'];
    document.documentElement.lang = lang;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  function setLang(lang) {
    if (!dict[lang]) lang = 'it';
    apply(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    const url = new URL(window.location.href);
    if (lang === 'it') url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  }

  buttons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  let initial = new URLSearchParams(window.location.search).get('lang');
  if (!initial) {
    try { initial = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  }
  if (initial && initial !== 'it') setLang(initial);
})();

// ===== Chat widget =====
// The Algho widget (<algho-viewer floating="true">) mounts itself on
// <body> and is handled by the inline script in index.html, so no extra
// logic is needed here.

// ===== Mobile nav burger (simple toggle) =====
(function () {
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '100%';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(28,34,46,0.97)';
    links.style.padding = '1.2rem 2rem';
    links.style.gap = '1.1rem';
  });
})();
