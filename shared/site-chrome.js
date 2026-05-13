/**
 * Site chrome — injects shared nav and footer into every page.
 * Include on each page: <script src="/shared/site-chrome.js" defer></script>
 * Place: <div data-site-nav></div>  and  <div data-site-footer></div>
 *
 * Body classes set base path:
 *   (none)        → root page (./)
 *   .page-inner   → 1 level deep (../)
 *   .page-deep    → 2 levels deep (../../)
 */

(function () {
  const year = new Date().getFullYear();
  const base = document.body.classList.contains('page-deep') ? '../../'
             : document.body.classList.contains('page-inner') ? '../'
             : './';

  const navHTML = `
    <nav class="site-nav" id="siteNav">
      <div class="nav-inner">
        <a href="${base}" class="brand-mark" aria-label="Illuminated Integration — home">
          <span class="brand-mark-top">Illuminated</span>
          <span class="brand-mark-script">Integration</span>
        </a>
        <div class="nav-links">
          <a href="${base}">Home</a>
          <a href="${base}about/">About</a>
          <div class="nav-dropdown">
            <a href="${base}services/" class="nav-dropdown-trigger" aria-haspopup="true">
              Services
              <svg class="nav-caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M0 0h8L4 5z"/></svg>
            </a>
            <div class="nav-dropdown-menu" role="menu">
              <a href="${base}services/coaching/" role="menuitem">Transformational Coaching</a>
              <a href="${base}services/integration/" role="menuitem">Psychedelic Preparation &amp; Integration</a>
              <a href="${base}services/somatic/" role="menuitem">Somatic Healing &amp; Bodywork</a>
              <a href="${base}services/ceremonial/" role="menuitem">Private Ceremonial Support</a>
              <a href="${base}services/" class="dropdown-all" role="menuitem">All offerings</a>
            </div>
          </div>
          <a href="${base}blog/">Writing</a>
          <a href="${base}contact/" class="nav-cta">Begin</a>
        </div>
        <button
          type="button"
          class="nav-toggle"
          id="navToggle"
          aria-controls="mobileDrawer"
          aria-expanded="false"
          aria-label="Open menu"
        >
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
      </div>
    </nav>
    <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
      <div class="mobile-drawer-backdrop" data-drawer-close></div>
      <div class="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">
        <button type="button" class="mobile-drawer-close" data-drawer-close aria-label="Close menu">&times;</button>
        <nav class="mobile-drawer-links">
          <a href="${base}">Home</a>
          <a href="${base}about/">About</a>
          <details class="mobile-drawer-section">
            <summary>Services</summary>
            <div class="mobile-drawer-sublinks">
              <a href="${base}services/coaching/">Transformational Coaching</a>
              <a href="${base}services/integration/">Psychedelic Preparation &amp; Integration</a>
              <a href="${base}services/somatic/">Somatic Healing &amp; Bodywork</a>
              <a href="${base}services/ceremonial/">Private Ceremonial Support</a>
              <a href="${base}services/" class="mobile-drawer-sublinks-all">All offerings</a>
            </div>
          </details>
          <a href="${base}blog/">Writing</a>
          <a href="${base}contact/" class="mobile-drawer-cta">Begin</a>
        </nav>
        <p class="mobile-drawer-footer">Illuminated<br><span>Integration</span></p>
      </div>
    </div>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <p class="footer-brand">Illuminated</p>
        <span class="footer-brand-script">Integration</span>
        <p class="footer-meta">Heather McCan · Trauma-Informed Coach &amp; Psychedelic Integration</p>
        <p class="footer-links">
          <a href="${base}">Home</a> ·
          <a href="${base}about/">About</a> ·
          <a href="${base}services/">Services</a> ·
          <a href="${base}blog/">Writing</a> ·
          <a href="${base}contact/">Contact</a>
        </p>
        <p class="footer-disclaimer">This work is not a substitute for medical or psychiatric care. If you are in immediate crisis, please contact a licensed provider or call <a href="tel:988">988</a> (Suicide &amp; Crisis Lifeline).</p>
        <p class="footer-fine">© ${year} Illuminated Integration. All rights reserved.</p>
      </div>
    </footer>
  `;

  const navSlot = document.querySelector('[data-site-nav]');
  const footerSlot = document.querySelector('[data-site-footer]');
  if (navSlot) navSlot.outerHTML = navHTML;
  if (footerSlot) footerSlot.outerHTML = footerHTML;

  // Highlight current page — compare resolved URLs so relative paths work
  const current = location.href.replace(/[?#].*$/, '').replace(/\/$/, '');
  document.querySelectorAll('.nav-links a, .nav-dropdown-menu a, .mobile-drawer-links > a, .mobile-drawer-sublinks a').forEach(a => {
    const linkUrl = a.href.replace(/[?#].*$/, '').replace(/\/$/, '');
    if (linkUrl === current) a.classList.add('nav-link-active');
  });

  // If a service detail page is active, also keep the parent Services link visually highlighted
  if (/\/services\/[^/]+\/?$/.test(current)) {
    document.querySelectorAll('.nav-dropdown-trigger').forEach(a => a.classList.add('nav-link-active'));
    document.querySelectorAll('.mobile-drawer-section > summary').forEach(s => s.parentElement.setAttribute('open', ''));
  }

  // Nav fades in on scroll
  const nav = document.getElementById('siteNav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile drawer behavior
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (toggle && drawer) {
    const openDrawer = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('[data-drawer-close]')) closeDrawer();
    });
    drawer.querySelectorAll('.mobile-drawer-links a, .mobile-drawer-sublinks a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
  }
})();
