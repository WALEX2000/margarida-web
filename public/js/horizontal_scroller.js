document.getElementById('content_wrapper').addEventListener('wheel', function(e) {
    this.scrollLeft += e.deltaY;
    e.preventDefault();
}, false);