const horizontalScroller = (e) => {
    e.preventDefault();
    let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    document.scrollingElement.scrollLeft += delta;
}

document.getElementById("header").addEventListener('wheel', horizontalScroller, false);

document.getElementById("main").addEventListener('wheel', horizontalScroller, false);