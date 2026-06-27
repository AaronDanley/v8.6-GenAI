/*!
 * Fades out the whole page when clicking links and replays logo animation on page restore
 */

function replayLogoAnimation() {
    var logoContainer = document.getElementById('logo-container');

    if (!logoContainer) {
        return;
    }

    // Clone and replace the entire logo container to restart all animations from scratch
    var parent = logoContainer.parentNode;
    var clone = logoContainer.cloneNode(true);
    
    // Replace the old container with the clone
    parent.replaceChild(clone, logoContainer);
    
    // Force browser reflow and restart animations
    void clone.offsetHeight;
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
    // Replay animation if this is a history navigation or page visibility change
    if (isHistoryNavigationEvent(event)) {
        // Reload the page to restore all content
        window.location.reload();
    }
}

// Listen for page visibility changes and history events
window.addEventListener('pageshow', handleLogoRestore);
window.addEventListener('popstate', handleLogoRestore);

// Also replay when page becomes visible (catches more cases)
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        window.setTimeout(replayLogoAnimation, 50);
    }
});

// Handle page focus as another trigger
window.addEventListener('focus', function () {
    // Only if enough time has passed (animation should have completed)
    if (document.hidden === false) {
        var logoContainer = document.getElementById('logo-container');
        if (logoContainer) {
            var computedStyle = window.getComputedStyle(logoContainer);
            var opacity = parseFloat(computedStyle.opacity);
            
            // If the logo container is already faded out (opacity is 0 or near 0)
            // it means we need to replay the animation
            if (opacity < 0.1) {
                window.setTimeout(replayLogoAnimation, 50);
            }
        }
    }
});

var newLocation;

function newpage() {
    window.location = newLocation;
}

$('.fade-out').click(function (e) {
    e.preventDefault();
    newLocation = this.href;
    $('body').fadeOut('slow', newpage);
});