function getCurrentSize(element) {
    return parseFloat(window.getComputedStyle(element, null).getPropertyValue('font-size'));
}

function increaseSizeElements() {
    var elementsToResize = document.querySelectorAll('.clickable');
    elementsToResize.forEach(function(element) {
        var currentSize = getCurrentSize(element);
        var newSize = currentSize * 1.3; 
        element.style.fontSize = newSize + 'px';
        localStorage.setItem('appliedFontSize', newSize.toString());
    });
}

function applyStoredFontSize() {
    var storedSize = localStorage.getItem('appliedFontSize');
    if (storedSize) {
        var elementsToResize = document.querySelectorAll('.clickable');
        elementsToResize.forEach(function(element) {
            element.style.fontSize = parseFloat(storedSize) + 'px';
        });
    }
}

function checkAndIncreaseSize() {
    var increaseData = localStorage.getItem('increaseData');
    var currentIncreaseSize = 0;

    if (increaseData) {
        var parsedData = JSON.parse(increaseData);
        if (parsedData && parsedData.increaseSize) {
            currentIncreaseSize = parseFloat(parsedData.increaseSize);
        }
    }

    var previousIncreaseSizeString = localStorage.getItem('previousIncreaseSize');
    var previousIncreaseSize = previousIncreaseSizeString ? parseFloat(previousIncreaseSizeString) : null;

    if (previousIncreaseSize !== null && currentIncreaseSize > previousIncreaseSize) {
        increaseSizeElements();
    } else {
        applyStoredFontSize(); 
    }

    localStorage.setItem('previousIncreaseSize', currentIncreaseSize.toString());
}

document.addEventListener('DOMContentLoaded', function() {
    applyStoredFontSize();
    checkAndIncreaseSize();

    var closeButton = document.getElementById('closeButton');
    if (closeButton) {
        closeButton.addEventListener('click', checkAndIncreaseSize);
    }
});
