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

// Force page refresh on back button
window.addEventListener('popstate', function() {
    window.location.reload();
});

// Also handle pageshow for browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
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