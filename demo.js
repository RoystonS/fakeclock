var lolex = require('lolex');

/* Set up a clock that shows the current time for 15 seconds */
function showTime() {
  console.log("Time is:", new Date().toISOString(), "(UTC)");
}
setInterval(showTime, 1000);
setTimeout(function() {
  process.exit(0);
}, 15000);


// Let the clock run normally for a few seconds, but
// then intercept it.
console.log("Normal timer running...");

setTimeout(function() {
  console.log("Intercepting timer functions");

  var newStartTime = new Date(1994, 3, 12, 15, 32, 12);

  // Intercept the JS timer system
  var fakeClock = lolex.install({
    // What the new 'now' should be
    now: newStartTime,
    // We want lolex to automatically tick forwards roughly
    // at real time.  Without this, we'd have to manually
    // tick the clock (which is great for unit tests!)
    shouldAdvanceTime: true
  });

  setTimeout(function() {
    console.log("Changing time");

    // Use the intercepted clock to change the current time
    fakeClock.setSystemTime(new Date(2000, 0, 1, 0, 0, 0));
  }, 5000);

}, 5000);

