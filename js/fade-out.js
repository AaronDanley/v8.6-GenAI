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

    var parentNode = logoContainer.parentNode;
    var replayedLogo = logoContainer.cloneNode(true);

    parentNode.removeChild(logoContainer);

    window.requestAnimationFrame(function () {
        parentNode.appendChild(replayedLogo);
    });
}

function isHistoryNavigationEvent(event) {
    if (event && event.persisted) {
        return true;
    }

    if (window.performance && window.performance.getEntriesByType) {
        var navigationEntries = window.performance.getEntriesByType('navigation');

        if (navigationEntries && navigationEntries.length) {
            return navigationEntries[0].type === 'back_forward';
        }
    }

    return false;
}

window.addEventListener('pageshow', function (e) {
    if (isHistoryNavigationEvent(e)) {
        setTimeout(replayLogoAnimation, 0);
    }
});

$('.fade-out').click(function (e) {
    e.preventDefault();
    newLocation = this.href;
    $('body').fadeOut('slow', newpage);
});

function newpage() {
    window.location = newLocation;
}