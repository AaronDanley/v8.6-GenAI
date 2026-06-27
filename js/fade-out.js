/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

/*! Fades out the whole page when clicking links */

function replayLogoAnimation() {
    var logoContainer = document.getElementById('logo-container');

    if (!logoContainer || !logoContainer.parentNode) {
        return;
    }

    var replayedLogo = logoContainer.cloneNode(true);
    logoContainer.parentNode.replaceChild(replayedLogo, logoContainer);
}

window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        setTimeout(replayLogoAnimation, 0);
    }
});

$('.fade-out').click(function(e) {
e.preventDefault();
newLocation = this.href;
$('body').fadeOut('slow', newpage);
});
function newpage() {
window.location = newLocation;
}