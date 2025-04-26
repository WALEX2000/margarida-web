if (window.matchMedia("(max-width: 769px)").matches) throw "Can't run Horizontal Scroll on Mobile";


scrolling_content = document.getElementById("pop-up");

const horizontalScroller = (e) => {
    e.preventDefault();
    let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    scrolling_content.scrollLeft += delta;
}

document.getElementById("header").addEventListener('wheel', horizontalScroller, false);

document.getElementById("main").addEventListener('wheel', horizontalScroller, false);