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
          <img class="brand-mark-icon" src="${base}assets/branding/logo-mark.png" alt="" aria-hidden="true">
          <span class="brand-mark-text">
            <span class="brand-mark-top">Illuminated</span>
            <span class="brand-mark-script">Integration</span>
          </span>
        </a>
        <div class="nav-links">
          <a href="${base}">Home</a>
          <a href="${base}about/">About Heather</a>
          <a href="${base}philosophy/">Philosophy</a>
          <div class="nav-dropdown">
            <a href="${base}services/" class="nav-dropdown-trigger" aria-haspopup="true">
              Work Together
              <svg class="nav-caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M0 0h8L4 5z"/></svg>
            </a>
            <div class="nav-dropdown-menu" role="menu">
              <a href="${base}services/coaching/" role="menuitem">Transformational Support</a>
              <a href="${base}services/integration/" role="menuitem">Psychedelic Preparation &amp; Integration</a>
              <a href="${base}services/somatic/" role="menuitem">Somatic Healing &amp; Therapeutic Bodywork</a>
              <a href="${base}services/ceremonial/" role="menuitem">Ceremonial &amp; Expanded-State Support</a>
              <a href="${base}services/" class="dropdown-all" role="menuitem">All offerings</a>
            </div>
          </div>
          <a href="${base}blog/">Journal</a>
          <a href="${base}safety/">Safety &amp; Scope</a>
          <a href="${base}contact/" class="nav-cta">Begin Here</a>
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
          <a href="${base}about/">About Heather</a>
          <a href="${base}philosophy/">Philosophy</a>
          <details class="mobile-drawer-section">
            <summary>Work Together</summary>
            <div class="mobile-drawer-sublinks">
              <a href="${base}services/coaching/">Transformational Support</a>
              <a href="${base}services/integration/">Psychedelic Preparation &amp; Integration</a>
              <a href="${base}services/somatic/">Somatic Healing &amp; Therapeutic Bodywork</a>
              <a href="${base}services/ceremonial/">Ceremonial &amp; Expanded-State Support</a>
              <a href="${base}services/" class="mobile-drawer-sublinks-all">All offerings</a>
            </div>
          </details>
          <a href="${base}blog/">Journal</a>
          <a href="${base}safety/">Safety &amp; Scope</a>
          <a href="${base}contact/" class="mobile-drawer-cta">Begin Here</a>
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
        <p class="footer-meta">Heather McCan · Founder, Illuminated Integration · Trauma-Informed Psychedelic Integration Specialist · Ceremonialist · Licensed Massage Therapist · Graduate Student in Psychedelic Therapy</p>
        <p class="footer-links">
          <a href="${base}">Home</a> ·
          <a href="${base}about/">About</a> ·
          <a href="${base}philosophy/">Philosophy</a> ·
          <a href="${base}services/">Work Together</a> ·
          <a href="${base}blog/">Journal</a> ·
          <a href="${base}safety/">Safety &amp; Scope</a> ·
          <a href="${base}contact/">Contact</a>
        </p>
        <p class="footer-social">
          <a href="https://www.instagram.com/illuminated.integration/" target="_blank" rel="noopener" aria-label="Follow Illuminated Integration on Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span>@illuminated.integration</span>
          </a>
        </p>
        <p class="footer-disclaimer">Illuminated Integration is not an emergency, crisis, medical, or psychiatric service. If you are in immediate danger or may harm yourself or someone else, call 911 or go to the nearest emergency department. In the United States, call or text <a href="tel:988">988</a> for the Suicide &amp; Crisis Lifeline. Services offered here are educational, supportive, integrative, somatic, and coaching-based within Heather's current professional scope, and do not replace diagnosis, medical care, psychiatric treatment, psychotherapy, or emergency services. Read more on the <a href="${base}safety/">Safety &amp; Scope</a> page.</p>
        <p class="footer-fine">© ${year} Illuminated Integration. All rights reserved. · <a href="${base}privacy/" style="color:inherit;opacity:0.7;">Privacy Policy</a></p>
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
