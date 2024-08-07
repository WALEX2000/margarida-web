document.getElementById('content_wrapper').addEventListener('wheel', function(e) {
    let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    this.scrollLeft += delta;
    e.preventDefault();
}, false);