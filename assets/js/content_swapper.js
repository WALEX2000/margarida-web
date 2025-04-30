if (window.matchMedia('(max-width: 769px)').matches) {
	throw "Can't run Content Swapper on Mobile";
}

const swup = new Swup({
  containers: ['#pop-up'], // the container that swup will manage
  linkSelector: 'a.pop-up-link[href]' // This makes sure that swup ignores everything that is not a pop-up
});

const pop_up_element = document.getElementById('pop-up');
const screen_effect_element = document.getElementById('screen-effect');

document.querySelectorAll('.pop-up-link').forEach(link => {
    link.addEventListener('click', function(e) {
      
      e.preventDefault(); // Stop normal navigation
      e.stopImmediatePropagation();
  
      const url = e.currentTarget.href;
      const section = url.endsWith('/') ? url.split('/').slice(0, -1).pop() : url.split('/').pop();
      
      // Optionally push state to reflect the modal's URL.
      history.pushState({section}, '', `#${section}`);
  
      // Use swup to load the new page
      swup.fetchPage(url).then(({ _, html }) => {
        // After content is loaded, extract modal-specific content
        extractAndShowModal(html);
      });

      return false;
    });
});

function extractAndShowModal(html) {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string into a Document object
    const doc = parser.parseFromString(html, 'text/html');
    // Query the document for the desired element
    const modalPageContent = doc.querySelector('#content_box');

    if (modalPageContent) {
        const modalContainer = document.querySelector('#content_box');
        modalContainer.innerHTML = modalPageContent.innerHTML;
        openModal();
    } else {
        console.error('Modal content not found in the loaded page.');
    }
}

function openModal() {
    pop_up_element.classList.remove('hidden');
    screen_effect_element.classList.remove('hidden');

	// TODO: Remove specific logic for about me
	const aboutMeLink = document.querySelector('a.header-link[href$="#about"]');
	if (window.location.hash === '#about' || link.href.endsWith('/about')) {
		aboutMeLink.classList.add('header-link-current');
	} 
}

function closeModal() {
    screen_effect_element.classList.add('hidden');
    pop_up_element.classList.add('hidden');
    history.replaceState({}, '', window.location.pathname);
    
    // TODO: Remove specific logic for about me
    const aboutMeLink = document.querySelector('a.header-link[href$="#about"]');
    if (aboutMeLink) aboutMeLink.classList.remove('header-link-current');
}  

screen_effect_element.addEventListener('click', function() {
    closeModal();
});

// Load the modal if the user navigates directly to a url with the format #<section>
function loadModalFromHash() {
    const section = window.location.hash.replace('#', '');
    const link = document.querySelector(`a.pop-up-link[href*="${section}"`);
    
    if (link) {
        link.click();
    }
}

function onHashChange() {
    if (window.location.hash) {
      loadModalFromHash();
    } else {
      closeModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
      loadModalFromHash();
    }
  
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', () => {
      if (window.location.hash) loadModalFromHash();
      else closeModal();
    });
});
  