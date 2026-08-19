// WageTally Website — Main Script
// Minimal vanilla JS for mobile menu and accessibility

// The Ireland beta form's endpoint, and the only line to change to switch the
// form on. Create a form at formspree.io (or any service that accepts a POST of
// FormData and answers JSON), then paste its endpoint here, e.g.
//   var BETA_FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
//
// While it is empty the form does not pretend to work: it never posts anywhere,
// and submitting shows the applicant the TestFlight link and a pre-filled email
// instead. Do not put a placeholder id here — the previous one posted people to
// a third-party 404.
var BETA_FORM_ENDPOINT = '';

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    if (!navLinks.id) {
      navLinks.id = 'main-navigation';
    }

    mobileMenuBtn.setAttribute('aria-controls', navLinks.id);
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

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
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question) {
      if (answer && !answer.id) {
        answer.id = `faq-answer-${index + 1}`;
      }

      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      if (answer) {
        question.setAttribute('aria-controls', answer.id);
      }

      const updateFaqState = function(faqItem) {
        const faqQuestion = faqItem.querySelector('.faq-question');
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const isOpen = faqItem.classList.contains('open');

        if (faqQuestion) {
          faqQuestion.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        if (faqAnswer) {
          faqAnswer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        }
      };

      updateFaqState(item);

      question.addEventListener('click', function() {
        // Close other open items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            updateFaqState(other);
          }
        });
        // Toggle this item
        item.classList.toggle('open');
        updateFaqState(item);
      });

      // Keyboard support
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
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
  initBetaForm();
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
  let lastX = -1;
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

    focusNearestSlide();
  }

  /*
   * Whichever slide sits nearest the centre of the visible area wins focus.
   * Same rule in both modes; only the definition of "visible area" differs —
   * the clipping viewport while pinned, the scroller itself while swiping.
   */
  function focusNearestSlide() {
    let centre;
    if (enabled) {
      centre = (viewLeft + viewRight) / 2;
    } else {
      const box = track.getBoundingClientRect();
      centre = (box.left + box.right) / 2;
    }

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
    } else {
      // Carousel mode: the browser owns the scrolling, we only follow it to
      // keep the rail and the focused slide in step with the swipe.
      const x = track.scrollLeft;
      if (x !== lastX) {
        lastX = x;
        focusNearestSlide();
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


// Beta application form (Ireland page).
// Submits through fetch so the applicant never leaves the page. The TestFlight
// link is handed over in the success state rather than offered as a button up
// front: public-link testers join anonymously, so screening and capturing a
// contact first is what makes the beta feedback reachable at all.
// Without JS this stays an ordinary POST and Formspree renders its own page.
function initBetaForm() {
  var form = document.querySelector('.ie-form');
  if (!form || !window.fetch || !window.FormData) return;

  var done = document.getElementById('ie-form-done');
  var error = document.getElementById('ie-form-error');
  var button = form.querySelector('button[type="submit"]');
  if (!done || !error || !button) return;

  var label = button.textContent;
  var endpoint = (typeof BETA_FORM_ENDPOINT === 'string' ? BETA_FORM_ENDPOINT : '').trim();

  // No endpoint means no submission, ever. Setting form.action only when one
  // exists keeps a JS-less browser from posting into the void as well.
  if (endpoint) {
    form.action = endpoint;
  } else {
    // The privacy note describes a Formspree hand-off that is not happening
    // yet. Correct it before anyone types into the form rather than after.
    var privacy = form.querySelector('.ie-form-privacy');
    if (privacy) {
      privacy.textContent = "Heads up: this form isn't connected yet, so pressing Apply won't send anything — it will show you how to reach us instead. You can install the beta on TestFlight now either way.";
    }
  }

  form.addEventListener('submit', function (event) {
    // Let the browser show its own validation UI before we take over.
    if (!form.checkValidity()) return;
    event.preventDefault();

    if (!endpoint) {
      showUnconfigured(form);
      return;
    }

    error.hidden = true;
    button.disabled = true;
    button.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      form.hidden = true;
      done.hidden = false;
      done.setAttribute('tabindex', '-1');
      done.focus();
    }).catch(function () {
      // Never strand an applicant mid-signup — give them a way through.
      error.hidden = false;
      button.disabled = false;
      button.textContent = label;
    });
  });
}

// Swaps the form for a state that says nothing was sent, and hands over the two
// routes that do work: TestFlight, and an email pre-filled with what they typed.
// The mailto is built here rather than in markup so it carries their answers; it
// opens their own mail client and sends nothing on its own.
function showUnconfigured(form) {
  var panel = document.getElementById('ie-form-unconfigured');
  if (!panel) return;

  var link = document.getElementById('ie-form-mailto');
  if (link) {
    var data = new FormData(form);
    var lines = [
      'Name: ' + (data.get('name') || ''),
      'Nurse or midwife: ' + (data.get('role') || ''),
      'Paid under HSE Public Health Service arrangements: ' + (data.get('hse') || ''),
      'Has an iPhone: ' + (data.get('iphone') ? 'Yes' : 'No'),
      '',
      "I'd like to join the WageTally Ireland beta."
    ];
    link.href = link.href.split('?')[0]
      + '?subject=' + encodeURIComponent('WageTally Ireland beta')
      + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  form.hidden = true;
  panel.hidden = false;
  panel.setAttribute('tabindex', '-1');
  panel.focus();
}
