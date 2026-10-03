const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual viewport handler with a burst like a mobile toolbar resize.
const script = fs.readFileSync('script.js', 'utf8');
const start = script.includes('// Resize handling')
  ? script.indexOf('// Resize handling')
  : script.indexOf('//////// page Reload Local Storage');
const handler = script.slice(start, script.indexOf('let mobForCursor'));
const storage = new Map();
const breakpointHandlers = [];
let intervals = 0, reloads = 0;
const window = {
  innerWidth: 390,
  matchMedia: () => ({ addEventListener: (_, callback) => breakpointHandlers.push(callback) }),
};
vm.runInNewContext(handler, {
  window, location: { reload: () => reloads++ },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)) },
  setInterval: () => ++intervals,
});
for (let i = 0; i < 200; i++) window.onresize?.({ timeStamp: i, srcElement: window });
assert.equal(intervals, 0, 'Height-only resizes must not create repeating timers');
assert.equal(reloads, 0, 'Height-only resizes must not reload the page');
assert.equal(breakpointHandlers.length, 2, 'Cursor and animation breakpoints must update the layout');
breakpointHandlers[0]();
assert.equal(reloads, 1, 'A layout breakpoint change must rebuild the animations');
console.log('Resize regression passed: 200 resizes, no timer leak or reload; breakpoint rebuild verified.');
