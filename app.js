/* Modified 2026-10-07. Distributed under the repository's GPL-3.0 license. */
(function () {
  'use strict';
  function normalizePhone(value) {
    const input = value.trim();
    if (!/^\+?[\d\s().-]+$/.test(input)) return null;
    let digits = input.replace(/\D/g, '');
    if (digits.startsWith('00')) digits = digits.slice(2);
    // Syntax check only: this does not validate country codes or account existence.
    return /^[1-9]\d{6,14}$/.test(digits) ? digits : null;
  }
  if (typeof module !== 'undefined') module.exports = { normalizePhone };
  if (typeof document === 'undefined') return;
  const form = document.getElementById('link-form');
  const phone = document.getElementById('phone');
  const error = document.getElementById('error');
  const result = document.getElementById('result');
  const link = document.getElementById('chat-link');
  function clearResult() {
    result.hidden = true;
    link.removeAttribute('href');
    document.getElementById('link-preview').textContent = '';
    error.textContent = '';
    phone.removeAttribute('aria-invalid');
  }
  phone.addEventListener('input', clearResult);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearResult();
    const number = normalizePhone(phone.value);
    if (!number) {
      error.textContent = 'Enter 7–15 digits including the country code. Use only numbers, spaces, parentheses, dots, hyphens, and an optional leading + or 00.';
      phone.setAttribute('aria-invalid', 'true');
      phone.focus();
      return;
    }
    const url = 'https://wa.me/' + number;
    link.href = url;
    document.getElementById('link-preview').textContent = url;
    result.hidden = false;
    link.focus();
  });
}());
