/**
 * Site chrome — injects shared nav and footer into every page.
 * Include on each page: <script src="/shared/site-chrome.js" defer></script>
 * Place: <div data-site-nav></div>  and  <div data-site-footer></div>
 */

(function () {
  const year = new Date().getFullYear();
  // Relative base — works at root or inside a project subpath (GitHub Pages).
  const base = document.body.classList.contains('page-inner') ? '../' : './';

  const navHTML = `
    <nav class="site-nav" id="siteNav">
      <div class="nav-inner">
        <a href="${base}" class="brand">Illuminated Integration</a>
        <div class="nav-links">
          <a href="${base}">Home</a>
          <a href="${base}about/">About</a>
          <a href="${base}services/">Services</a>
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
          <a href="${base}services/">Services</a>
          <a href="${base}blog/">Writing</a>
          <a href="${base}contact/" class="mobile-drawer-cta">Begin</a>
        </nav>
        <p class="mobile-drawer-footer">Illuminated Integration<br><span>Heather McCan</span></p>
      </div>
    </div>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <p class="footer-brand">Illuminated Integration</p>
        <p class="footer-meta">Heather McCan · Trauma-Informed Coach &amp; Psychedelic Integration Specialist</p>
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
  document.querySelectorAll('.nav-links a, .mobile-drawer-links a').forEach(a => {
    const linkUrl = a.href.replace(/[?#].*$/, '').replace(/\/$/, '');
    if (linkUrl === current) a.classList.add('nav-link-active');
  });

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
    drawer.querySelectorAll('.mobile-drawer-links a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
  }
})();
