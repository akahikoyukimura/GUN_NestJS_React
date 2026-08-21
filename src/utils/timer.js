document.addEventListener('DOMContentLoaded', () => {
    // Unix timestamp (in seconds) to count down to
    var toDayFromNow = (new Date(`Dec 31, ${new Date().getFullYear()} 23:59:59`).getTime() / 1000);
    // Set Up FlipDown
    var flipdown = new FlipDown(toDayFromNow)

    // Start The Count Down
    .start()
    // Do Something When The Countdown Ends
    .ifEnded(() => {
        document.querySelector(".flipdown").innerHTML = `<h2>Timer is ended</h2>`;
    });
});