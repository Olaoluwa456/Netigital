document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  const search = document.querySelector('#domain-search');
  const cards = [...document.querySelectorAll('.domain-card')];
  const count = document.querySelector('#domain-count');
  const empty = document.querySelector('#no-domains');
  if (search && cards.length) {
    const filter = () => {
      const term = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const match = !term || card.dataset.search.includes(term);
        card.hidden = !match;
        if (match) visible++;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? 'area' : 'areas'}`;
      if (empty) empty.hidden = visible !== 0;
    };
    search.addEventListener('input', filter);
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = document.querySelector('#form-status');
      const name = document.querySelector('#contact-name');
      const email = document.querySelector('#contact-email');
      const message = document.querySelector('#contact-message');
      if (!name.value.trim() || !email.validity.valid || !message.value.trim()) {
        status.textContent = 'Please provide a name, a valid email address and a message. Nothing has been sent.';
        status.className = 'form-status error';
        (!name.value.trim() ? name : (!email.validity.valid ? email : message)).focus();
        return;
      }
      status.textContent = 'The form has been checked, but this website is a preview and has no message service connected. Nothing has been sent or stored. Please do not enter confidential information.';
      status.className = 'form-status success';
    });
  }
});
