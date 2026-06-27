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

    parentNode.replaceChild(replayedLogo, logoContainer);

    window.requestAnimationFrame(function () {
        var animatedElements = replayedLogo.querySelectorAll('.logo-one, .logo-two, .logo-three, .logo-fade-out, .large-logo');

        Array.prototype.forEach.call(animatedElements, function (element) {
            element.style.animation = 'none';
            element.style.webkitAnimation = 'none';
            element.offsetHeight;
            element.style.animation = '';
            element.style.webkitAnimation = '';
        });
    });
}

function isHistoryNavigationEvent(event) {
    if (event && event.persisted) {
        return true;
    }

    if (window.performance && window.performance.navigation) {
        if (window.performance.navigation.type === 2) {
            return true;
        }
    }

    if (window.performance && window.performance.getEntriesByType) {
        var navigationEntries = window.performance.getEntriesByType('navigation');

        if (navigationEntries && navigationEntries.length) {
            return navigationEntries[0].type === 'back_forward';
        }
    }

    return false;
}

function handleLogoRestore(event) {
    if (isHistoryNavigationEvent(event)) {
        window.setTimeout(replayLogoAnimation, 50);
    }
}

window.addEventListener('pageshow', handleLogoRestore);
window.addEventListener('popstate', handleLogoRestore);

document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        handleLogoRestore();
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