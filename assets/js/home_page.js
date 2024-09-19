// TODO: (I should find a better way to do this
window.addEventListener('load', function() {
    const carousel = FlowbiteInstances.getInstance('Carousel', 'background-slideshow');
    carousel._intervalDuration = 8000
    console.log(carousel)
})