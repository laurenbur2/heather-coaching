/**
 * Site chrome — injects shared nav and footer into every page.
 * Include on each page: <script src="/shared/site-chrome.js" defer></script>
 * Place: <div data-site-nav></div>  and  <div data-site-footer></div>
 */

(function () {
  const year = new Date().getFullYear();

  const navHTML = `
    <nav class="site-nav" id="siteNav">
      <div class="nav-inner">
        <a href="/" class="brand">Heather</a>
        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/about/">About</a>
          <a href="/services/">Services</a>
          <a href="/blog/">Blog</a>
          <a href="/contact/" class="nav-cta">Begin</a>
        </div>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <p class="footer-brand">Heather</p>
        <p class="footer-meta">Integration &amp; Trauma-Informed Coaching</p>
        <p class="footer-links">
          <a href="/">Home</a> ·
          <a href="/about/">About</a> ·
          <a href="/services/">Services</a> ·
          <a href="/blog/">Blog</a> ·
          <a href="/contact/">Contact</a>
        </p>
        <p class="footer-fine">© ${year} Heather Coaching. All rights reserved.</p>
      </div>
    </footer>
  `;

  const navSlot = document.querySelector('[data-site-nav]');
  const footerSlot = document.querySelector('[data-site-footer]');
  if (navSlot) navSlot.outerHTML = navHTML;
  if (footerSlot) footerSlot.outerHTML = footerHTML;

  // Highlight current page
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) a.classList.add('nav-link-active');
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
