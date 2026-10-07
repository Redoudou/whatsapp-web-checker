const { test } = require('node:test');
const assert = require('node:assert/strict');
const { normalizePhone } = require('../app.js');
test('normalizes supported international formats', () => {
  for (const value of ['12025550123', '+1 (202) 555-0123', '0012025550123', '  +1.202.555.0123  ']) {
    assert.equal(normalizePhone(value), '12025550123');
  }
});
test('rejects unsafe, ambiguous, empty, and out-of-range input', () => {
  for (const value of ['', '   ', '123456', '0123456789', '1234567890123456', '<img src=x onerror=alert(1)>', '12025550123&text=test', '+1+2025550123', '12025550123 ext 4']) {
    assert.equal(normalizePhone(value), null, value);
  }
});
test('accepts syntax boundaries without claiming number validity', () => {
  assert.equal(normalizePhone('1234567'), '1234567');
  assert.equal(normalizePhone('123456789012345'), '123456789012345');
});
