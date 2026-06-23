(function () {
  var pages = ['home', 'about', 'services', 'skills', 'projects', 'writing', 'experience', 'contact'];
  var titles = {
    home: 'Ankit Vaghani — Senior Python & Backend Engineer',
    about: 'About — Ankit Vaghani',
    services: 'Services — Ankit Vaghani',
    skills: 'Skills — Ankit Vaghani',
    projects: 'Projects — Ankit Vaghani',
    writing: 'Writing — Ankit Vaghani',
    experience: 'Experience — Ankit Vaghani',
    contact: 'Contact — Ankit Vaghani'
  };
  var current = 'home';

  function setStatus(el, type, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.add('is-visible');
    el.classList.toggle('is-error', type === 'error');
    el.classList.toggle('is-success', type === 'success');
  }

  function clearStatus(el) {
    if (!el) return;
    el.classList.remove('is-visible', 'is-error', 'is-success');
    el.textContent = '';
  }

  function go(id, options) {
    options = options || {};
    if (pages.indexOf(id) === -1 || !document.getElementById('pg-' + id)) return;

    var old = document.getElementById('pg-' + current);
    if (old) old.classList.remove('show');

    var next = document.getElementById('pg-' + id);
    next.classList.add('show');
    current = id;

    document.title = titles[id] || titles.home;

    if (!options.skipHash) {
      var nextHash = id === 'home' ? '' : '#' + id;
      if (location.hash !== nextHash) {
        history.replaceState(null, '', nextHash || location.pathname);
      }
    }

    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-page') === id;
      btn.classList.toggle('active', active);
      if (active) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });

    document.querySelectorAll('.mob-link').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-page') === id);
    });

    var mobMenu = document.getElementById('mob-menu');
    var hbg = document.getElementById('hbg');
    mobMenu.classList.remove('open');
    mobMenu.setAttribute('aria-hidden', 'true');
    hbg.setAttribute('aria-expanded', 'false');
    hbg.setAttribute('aria-label', 'Open menu');

    window.scrollTo(0, 0);

    if (!options.silent) {
      var heading = next.querySelector('h1');
      if (heading) heading.setAttribute('tabindex', '-1');
      if (heading) heading.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll('[data-page]').forEach(function (el) {
    el.addEventListener('click', function () {
      go(el.getAttribute('data-page'));
    });
  });

  var hbg = document.getElementById('hbg');
  var mobMenu = document.getElementById('mob-menu');
  hbg.addEventListener('click', function () {
    var open = mobMenu.classList.toggle('open');
    hbg.setAttribute('aria-expanded', open ? 'true' : 'false');
    hbg.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
  });

  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('sub-btn');
    var status = document.getElementById('form-status');
    var n = document.getElementById('cf-n').value.trim();
    var em = document.getElementById('cf-e').value.trim();
    var msg = document.getElementById('cf-m').value.trim();

    if (!n || !em || !msg) {
      setStatus(status, 'error', 'Please fill all fields.');
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending...';
    clearStatus(status);

    fetch('https://formspree.io/f/xreolgel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: n, email: em, message: msg })
    })
    .then(function (res) {
      if (res.ok) {
        setStatus(status, 'success', 'Sent. I\'ll reply within 4 hours.');
        document.getElementById('cf-n').value = '';
        document.getElementById('cf-e').value = '';
        document.getElementById('cf-m').value = '';
        btn.textContent = 'Sent';
      } else {
        throw new Error('fail');
      }
    })
    .catch(function () {
      setStatus(status, 'error', 'Failed. Email me directly at ankitv.vaghani@gmail.com');
      btn.disabled = false;
      btn.textContent = 'Send Message →';
    });
  });

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer && !prefersReducedMotion) {
    document.body.classList.add('has-custom-cursor');
    var dot = document.getElementById('cur-dot');
    var ring = document.getElementById('cur-ring');
    var mx = -100;
    var my = -100;
    var rx = -100;
    var ry = -100;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.setProperty('--cur-x', mx + 'px');
      dot.style.setProperty('--cur-y', my + 'px');
    });

    function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.setProperty('--cur-ring-x', rx + 'px');
      ring.style.setProperty('--cur-ring-y', ry + 'px');
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .proj-item:not(.proj-item--static), .mob-link, .tag, .btn-book, [data-open-quote]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.classList.add('is-hover');
        ring.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', function () {
        dot.classList.remove('is-hover');
        ring.classList.remove('is-hover');
      });
    });
  } else {
    document.getElementById('cur-dot').classList.add('is-hidden');
    document.getElementById('cur-ring').classList.add('is-hidden');
  }

  function routeFromHash() {
    var id = (location.hash || '').replace(/^#/, '') || 'home';
    if (pages.indexOf(id) === -1) id = 'home';
    go(id, { skipHash: true, silent: id === current });
  }

  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();

  /* Quote modal */
  var quoteModal = document.getElementById('quote-modal');
  var quoteClose = document.getElementById('quote-modal-close');
  var quoteForm = document.getElementById('quote-form');
  var quoteStatus = document.getElementById('quote-status');
  var quoteSubmit = document.getElementById('quote-submit');
  var modalStorageKey = 'av_quote_modal_seen';

  function openQuoteModal() {
    quoteModal.classList.add('open');
    quoteModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    try { sessionStorage.setItem(modalStorageKey, '1'); } catch (err) {}
    var first = document.getElementById('qf-n');
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  function closeQuoteModal() {
    quoteModal.classList.remove('open');
    quoteModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-open-quote]').forEach(function (el) {
    el.addEventListener('click', openQuoteModal);
  });
  if (quoteClose) quoteClose.addEventListener('click', closeQuoteModal);
  quoteModal.addEventListener('click', function (e) {
    if (e.target === quoteModal) closeQuoteModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && quoteModal.classList.contains('open')) closeQuoteModal();
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('qf-n').value.trim();
      var em = document.getElementById('qf-e').value.trim();
      var msg = document.getElementById('qf-m').value.trim();
      if (!n || !em || !msg) {
        setStatus(quoteStatus, 'error', 'Please fill in all fields.');
        return;
      }
      quoteSubmit.disabled = true;
      quoteSubmit.textContent = 'Sending…';
      clearStatus(quoteStatus);
      fetch('https://formspree.io/f/xreolgel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: n, email: em, message: '[Quote modal] ' + msg, _subject: 'Portfolio quote request — ' + n })
      })
      .then(function (res) {
        if (res.ok) {
          setStatus(quoteStatus, 'success', 'Sent — I\'ll reply within a business day.');
          quoteForm.reset();
          quoteSubmit.textContent = 'Sent';
          setTimeout(closeQuoteModal, 1800);
        } else {
          throw new Error('fail');
        }
      })
      .catch(function () {
        setStatus(quoteStatus, 'error', 'Could not send. Email ankitv.vaghani@gmail.com directly.');
        quoteSubmit.disabled = false;
        quoteSubmit.textContent = 'Get in touch →';
      });
    });
  }

  var seenModal = false;
  try { seenModal = sessionStorage.getItem(modalStorageKey) === '1'; } catch (err) {}
  if (!seenModal && !prefersReducedMotion) {
    setTimeout(function () {
      if (!quoteModal.classList.contains('open')) openQuoteModal();
    }, 42000);
  }
})();
