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
      </div>
    </nav>
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
  document.querySelectorAll('.nav-links a').forEach(a => {
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
})();
