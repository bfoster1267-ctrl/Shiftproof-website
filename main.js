// ShiftProof Website — Main Script
// Minimal vanilla JS for mobile menu and accessibility

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded',
        navLinks.classList.contains('active') ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other open items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
          }
        });
        // Toggle this item
        item.classList.toggle('open');
      });

      // Keyboard support
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });

      // Make keyboard accessible
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
    }
  });

  // Smooth scroll for same-page links (already handled by CSS scroll-behavior)
  // This is just a fallback for older browsers
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  initPinnedGallery();
});

/*
 * Pinned horizontal gallery.
 *
 * Vertical scroll walks the slides sideways, and the page only continues once
 * the last one has passed. Driven by native scroll position plus a transform —
 * deliberately NOT by intercepting wheel events, which would break trackpad
 * momentum, keyboard paging, find-in-page and scrollbar dragging.
 *
 * Pure enhancement: without it the markup is already a readable vertical stack.
 */
function initPinnedGallery() {
  const pin = document.querySelector('.pin');
  if (!pin) return;

  const stage = pin.querySelector('.pin-stage');
  const viewport = pin.querySelector('.pin-viewport');
  const track = pin.querySelector('.pin-track');
  const copy = pin.querySelector('.pin-copy');
  const rail = pin.querySelectorAll('.pin-rail li');
  const slides = Array.prototype.slice.call(pin.querySelectorAll('.slide'));
  if (!stage || !viewport || !track || !slides.length) return;

  const wide = window.matchMedia('(min-width: 1024px)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  let maxShift = 0;
  let viewLeft = 0;
  let viewRight = 0;
  let active = -1;
  let lastY = -1;
  let enabled = false;

  // Copy for the left column, read out of each slide's own caption so the two
  // layouts can never drift apart.
  const captions = slides.map(function (slide) {
    const cap = slide.querySelector('figcaption');
    return {
      eyebrow: cap ? cap.querySelector('.eyebrow').textContent : '',
      title: cap ? cap.querySelector('h3').textContent : '',
      body: cap ? cap.querySelector('p:not(.eyebrow)').textContent : ''
    };
  });

  function measure() {
    if (!enabled) {
      pin.style.height = '';
      track.style.transform = '';
      track.style.paddingLeft = '';
      track.style.paddingRight = '';
      return;
    }

    // Measure untransformed, otherwise the track's own offset skews the maths.
    track.style.transform = 'translate3d(0, 0, 0)';
    track.style.paddingLeft = '0px';
    track.style.paddingRight = '0px';

    const viewBox = viewport.getBoundingClientRect();
    viewLeft = viewBox.left;
    viewRight = viewBox.right;
    const visible = viewport.clientWidth;

    // Lead padding centres the first slide at rest.
    const lead = Math.max(0, (visible - slides[0].offsetWidth) / 2);
    track.style.paddingLeft = lead + 'px';
    track.style.paddingRight = lead + 'px';

    // Travel is measured from the last slide's own geometry, not scrollWidth:
    // flex containers drop trailing padding from scrollWidth, which left the
    // run ending short so the final slide never reached centre and never
    // became active.
    const centre = (viewLeft + viewRight) / 2;
    const lastBox = slides[slides.length - 1].getBoundingClientRect();
    maxShift = Math.max(0, lastBox.left + lastBox.width / 2 - centre);

    // Pinned distance equals the travel exactly, so the section releases the
    // moment the final slide lands — no dead scroll at either end.
    pin.style.height = (window.innerHeight + maxShift) + 'px';
    render();
  }

  function setCopy(index) {
    if (index === active || !captions[index]) return;
    active = index;

    rail.forEach(function (bar, i) {
      bar.classList.toggle('is-active', i === index);
    });
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === index);
    });

    if (!copy) return;
    copy.classList.add('is-swapping');
    window.setTimeout(function () {
      copy.querySelector('[data-copy="eyebrow"]').textContent = captions[index].eyebrow;
      copy.querySelector('[data-copy="title"]').textContent = captions[index].title;
      copy.querySelector('[data-copy="body"]').textContent = captions[index].body;
      copy.classList.remove('is-swapping');
    }, 180);
  }

  function render() {
    if (!enabled) return;

    const top = pin.offsetTop;
    const travel = pin.offsetHeight - window.innerHeight;
    const raw = travel > 0 ? (window.scrollY - top) / travel : 0;
    const progress = Math.min(1, Math.max(0, raw));

    track.style.transform = 'translate3d(' + (-progress * maxShift).toFixed(2) + 'px, 0, 0)';

    // Whichever slide is nearest the centre of the visible track wins focus.
    const centre = (viewLeft + viewRight) / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach(function (slide, i) {
      const r = slide.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - centre);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setCopy(best);
  }

  /*
   * A self-perpetuating frame loop rather than a scroll listener guarded by a
   * "pending frame" flag. That flag latches true forever if its rAF callback
   * never runs — which happens whenever the tab is backgrounded mid-scroll —
   * and the gallery then freezes for the rest of the session. Comparing the
   * scroll position once per frame cannot wedge and costs nothing when idle.
   */
  function frame() {
    // Re-check the mode here rather than trusting resize/matchMedia events
    // alone: if either is missed the desktop pin stays applied at phone widths,
    // which hides the per-slide captions and leaves the section unusable.
    if ((wide.matches && !calm.matches) !== enabled) sync();

    if (enabled) {
      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        render();
      }
    }
    window.requestAnimationFrame(frame);
  }

  function sync() {
    const should = wide.matches && !calm.matches;
    if (should === enabled) { measure(); return; }
    enabled = should;
    pin.classList.toggle('is-pinned', enabled);
    if (enabled) {
      track.removeAttribute('tabindex');
    } else {
      track.setAttribute('tabindex', '0');
      slides.forEach(function (s) { s.classList.remove('is-active'); });
      active = -1;
    }
    measure();
  }

  window.addEventListener('resize', sync);
  if (wide.addEventListener) {
    wide.addEventListener('change', sync);
    calm.addEventListener('change', sync);
  }
  // Slide widths depend on decoded images, so re-measure once they land.
  window.addEventListener('load', measure);
  pin.querySelectorAll('img').forEach(function (img) {
    if (!img.complete) img.addEventListener('load', measure, { once: true });
  });

  sync();
  window.requestAnimationFrame(frame);
}
