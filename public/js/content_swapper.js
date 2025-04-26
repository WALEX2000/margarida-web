// import Swup from "swup";

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
}

  
screen_effect_element.addEventListener('click', function() {
    screen_effect_element.classList.add('hidden');
    pop_up_element.classList.add('hidden');
    
    const currentURL = window.location.href;
    const newURL = currentURL.split('#')[0];
    window.history.replaceState({}, '', newURL);
});