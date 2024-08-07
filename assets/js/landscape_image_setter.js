document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onload = function() {
            if (img.naturalWidth > img.naturalHeight) {
                img.classList.add('landscape');
            }
        };
        // For cached images that are already loaded
        if (img.complete) {
            img.onload();
        }
    });
});