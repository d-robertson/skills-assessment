const contacts = document.querySelectorAll('.contact-info');
const overlay = document.getElementById('overlay');
const contactContainer = document.getElementById('phone-contact-container');
const sort = document.getElementById('sort');

overlay.addEventListener('click', e => {
    e.stopPropagation();
    e.target.classList.remove('show');
    contacts.forEach(e => {
        e.parentElement.classList.remove('selected');
        Array.from(e.children).forEach((child, index) => {
            if(index !== 0){
                child.classList.add('hidden');
            }
            if(child.classList.contains('contact-email')){
                const strippedString = child.innerHTML.replace(/(<([^>]+)>)/gi, "");
                child.innerHTML = strippedString;
            }
        });
    });
})

contactContainer.addEventListener('click', e => {
    const contact = e.target.closest('.phone-contact');
    const contactInfo = contact.querySelector('.contact-info');
    overlay.classList.add('show');
    contact.classList.add('selected');
    Array.from(contactInfo.children).forEach(child => {
        child.classList.remove('hidden');
        if(child.classList.contains('contact-email')){
            const innerHtml = child.innerHTML;
            child.innerHTML = `<a href="#">${innerHtml}</a>`;
        }
        
    });
});

sort.addEventListener('change', selectEvent => {
    contacts.forEach(e => {
        if(!e.firstElementChild.classList.contains(`contact-${selectEvent.target.value}`)){
            let target = e.querySelector(`.contact-${selectEvent.target.value}`);
            target.classList.remove('hidden');
            target.remove();
            e.insertAdjacentElement('afterbegin', target);
            e.children[1].classList.add('hidden');
        }
    });
});