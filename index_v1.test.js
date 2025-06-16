const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('mobile menu toggles hidden class', () => {
  // Load HTML and remove external script tags that would try to load resources
  let html = fs.readFileSync(path.join(__dirname, 'index_v1.html'), 'utf8');
  html = html.replace(/<script src="https:\/\/[^>]*><\/script>/g, '');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const { document } = dom.window;

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  expect(mobileMenu.classList.contains('hidden')).toBe(true);
  mobileMenuButton.dispatchEvent(new dom.window.Event('click'));
  expect(mobileMenu.classList.contains('hidden')).toBe(false);
  mobileMenuButton.dispatchEvent(new dom.window.Event('click'));
  expect(mobileMenu.classList.contains('hidden')).toBe(true);
});
