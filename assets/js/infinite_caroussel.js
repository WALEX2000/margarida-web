if (window.matchMedia("(pointer: fine)").matches) throw "Not Mobile";


const container = document.querySelector('.categories-container');
const thumbnails = Array.from(document.querySelectorAll('.category-thumbnail'));

const {scrollWidth} = container;

// Setup page
// Duplicate thumbnails elements
const firstDummy = thumbnails.map(thumbnail => thumbnail.cloneNode(true));
const lastDummy = thumbnails.map(thumbnail => thumbnail.cloneNode(true));
firstDummy.forEach(thumbnail => thumbnail.classList.add('dummy'));
lastDummy.forEach(thumbnail => thumbnail.classList.add('dummy'));
firstDummy.reverse().forEach(thumbnail => container.insertBefore(thumbnail, container.firstChild));
lastDummy.forEach(thumbnail => container.appendChild(thumbnail));
container.append(...lastDummy);

// Set the scroll so that the page starts centered on the first element of the original thumbnails
const firstThumbnailRect = thumbnails[0].getBoundingClientRect();
const viewportWidth = window.innerWidth;
const firstThumbnailCenter = firstThumbnailRect.left + firstThumbnailRect.width / 2;
const viewportCenter = viewportWidth / 2;
container.scrollLeft = firstThumbnailCenter - viewportCenter;

const determineActiveElement = () => {
    return [...thumbnails].reduce((mostVisible, thumbnail) => {
        const thumbnailRect = thumbnail.getBoundingClientRect();
        const mostVisibleRect = mostVisible.getBoundingClientRect();
        const visibleWidth = Math.min(thumbnailRect.right, window.innerWidth) - Math.max(thumbnailRect.left, 0);
        const mostVisibleWidth = Math.min(mostVisibleRect.right, window.innerWidth) - Math.max(mostVisibleRect.left, 0);
        return visibleWidth > mostVisibleWidth ? thumbnail : mostVisible;
    }, thumbnails[0]);
}

document.addEventListener('touchend', () => {
    const {scrollWidth, scrollLeft, clientWidth} = container;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    if (scrollPercentage === 1) {
        container.scrollTo({left: 0, behavior: 'instant'});
    } else if (scrollPercentage === 0) {
        container.scrollTo({left: scrollWidth, behavior: 'instant'});
    }
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeElement = entry.target;
            [...container.children].forEach(thumbnail => thumbnail.classList.remove('active'));
            activeElement.classList.add('active');
        }
    });
}, {root: container, threshold: 1.0});

thumbnails.forEach(thumbnail => observer.observe(thumbnail));
firstDummy.forEach(thumbnail => observer.observe(thumbnail));
lastDummy.forEach(thumbnail => observer.observe(thumbnail));

container.onscrollend = (event) => {
    const thumbnailCount = thumbnails.length;
    const activeElement = [...container.children].find(child => child.classList.contains('active'));
    const activeIndex = [...container.children].indexOf(activeElement);
    const activeThumbnail = thumbnails[activeIndex % thumbnailCount];
    
    if (activeElement !== activeThumbnail) {
        container.scrollTo({
            left: activeThumbnail.offsetLeft,
            behavior: 'instant'
        });
    }

};

// TODO: Check how to implement this behaviour on iOS