/* Subster Paudel — portfolio interactions
   - scroll reveal (IntersectionObserver)
   - active nav highlighting
   - contact form submit (Formspree-compatible) with inline status
*/
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveal ------------------------------------------------------ */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings that enter together
        var delay = Math.min((el.dataset.revealIndex || 0) * 60, 240);
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-visible');
        revealObserver.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    // assign stagger index within each parent list
    var groups = new Map();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var idx = groups.get(parent) || 0;
      el.dataset.revealIndex = idx;
      groups.set(parent, idx + 1);
      revealObserver.observe(el);
    });

    // Anything already in view on load should show immediately
    window.addEventListener('load', function () {
      revealEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
      });
    });
  }

  /* Active nav link ---------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var current = sections[0].id;
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) current = entry.target.id;
      });
      setActive(current);
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
    setActive(current);
  }

  /* Contact form ------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form__status');
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.className = 'form__status is-error';
        status.textContent = 'Please fill in all fields with a valid email.';
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var endpoint = form.getAttribute('action') || '';
      var isConfigured = endpoint && endpoint.indexOf('your-form-id') === -1;

      if (!isConfigured) {
        // No backend configured yet: fall back to the visitor's mail client.
        var data = new FormData(form);
        var subject = encodeURIComponent('Project inquiry from ' + data.get('name'));
        var body = encodeURIComponent(
          'Name: ' + data.get('name') + '\n' +
          'Email: ' + data.get('email') + '\n' +
          'Budget: ' + data.get('budget') + '\n\n' +
          data.get('message')
        );
        window.location.href = 'mailto:hello@substerpaudel.com?subject=' + subject + '&body=' + body;
        status.className = 'form__status is-success';
        status.textContent = 'Opening your email app… (connect a form endpoint in index.html to send directly).';
        return;
      }

      button.disabled = true;
      status.className = 'form__status';
      status.textContent = 'Sending…';

      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        status.className = 'form__status is-success';
        status.textContent = 'Thanks! Your message has been sent — I will get back to you soon.';
      }).catch(function () {
        status.className = 'form__status is-error';
        status.textContent = 'Something went wrong. Please email hello@substerpaudel.com instead.';
      }).finally(function () {
        button.disabled = false;
      });
    });
  }

  /* Footer year -------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
