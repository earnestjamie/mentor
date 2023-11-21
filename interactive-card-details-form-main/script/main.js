'use strict';

document.querySelector('form').addEventListener('input', event => {
  if(event.target.dataset.input == 'card-cvv') {
    event.target.value = event.target.value.slice(0, 3);
    document.querySelector(`.${event.target.dataset.input}`).firstChild.textContent = event.target.value;
  } else if(event.target.dataset.input == 'card-mm') {
    event.target.value = event.target.value.slice(0, 2);
    document.querySelector(`.${event.target.dataset.input}`).firstChild.textContent = event.target.value;
  } else if(event.target.dataset.input == 'card-yy') {
    event.target.value = event.target.value.slice(0, 2);
    document.querySelector(`.${event.target.dataset.input}`).firstChild.textContent = event.target.value;
  } else if(event.target.dataset.input.includes('card-number-part')) {
    event.target.value = event.target.value.slice(0, 4);
    document.querySelector(`.${event.target.dataset.input}`).firstChild.textContent = event.target.value;
    if(event.target.value.length == 4) {
      event.target.nextElementSibling?.focus();
    }
  } else if(event.target.dataset.input == 'card-name') {
    document.querySelector(`.${event.target.dataset.input}`).firstChild.textContent = event.target.value;
  }
})

document.querySelector('form').addEventListener('focusin', function test(event) {
  if(event.target.closest('.card-number')) {
    document.querySelector('input[data-input="card-number-part-1"]').focus();
  }
  document.querySelector('form').removeEventListener('focusin', test);
})

document.querySelector('form').addEventListener('focusout', event => {
  if(event.target.dataset.input == 'card-cvv') {
    if(/^[0-9]{3}$/.test(event.target.value)) {
      event.target.classList.remove('error');
      document.querySelector(`label:has(input[data-input="card-cvv"]) .error-message`).style.visibility = 'hidden';
    } else {
      event.target.classList.add('error');
      document.querySelector(`label:has(input[data-input="card-cvv"]) .error-message`).style.visibility = 'visible';
    }
  } else if(event.target.dataset.input == 'card-mm') {
    if(/^(0[1-9]|1[0-2])$/.test(event.target.value)) { 
      event.target.classList.remove('error');
      document.querySelector(`label:has(input[data-input="card-mm"]) .error-message`).style.visibility = 'hidden';
    } else {
      event.target.classList.add('error');
      document.querySelector(`label:has(input[data-input="card-mm"]) .error-message`).style.visibility = 'visible';
    }
  } else if(event.target.dataset.input == 'card-yy') {
    if(/^[0-9]{2}$/.test(event.target.value)) { 
      event.target.classList.remove('error');
      document.querySelector(`label:has(input[data-input="card-yy"]) .error-message`).style.visibility = 'hidden';
    } else {
      event.target.classList.add('error');
      document.querySelector(`label:has(input[data-input="card-yy"]) .error-message`).style.visibility = 'visible';
    }
  } else if(event.target.dataset.input?.includes('card-number-part')) {
    if(/^[0-9]{4}$/.test(event.target.value)) { 
      event.target.classList.remove('error');
      document.querySelector(`label:has(input[data-input^="card-number-part"]) .error-message`).style.visibility = 'hidden';
    } else {
      event.target.classList.add('error');
      document.querySelector(`label:has(input[data-input^="card-number-part"]) .error-message`).style.visibility = 'visible';
    }
  } else if(event.target.dataset.input == 'card-name') {
    if(/^[a-z ,.'-]+$/i.test(event.target.value)) { 
      event.target.classList.remove('error');
      document.querySelector(`label:has(input[data-input="card-name"]) .error-message`).style.visibility = 'hidden';
    } else {
      event.target.classList.add('error');
      document.querySelector(`label:has(input[data-input="card-name"]) .error-message`).style.visibility = 'visible';
    }
  }
})

document.querySelector('form input[type="button"]').addEventListener('click', event => {
  if(!document.querySelector('.error') && !Array.from(document.querySelectorAll('input[data-input]')).find(item => item.value.length == 0)) {
    document.querySelector('form').style.display = 'none';
    document.querySelector('.complete').style.display = 'flex';
  }
})

document.querySelector('.complete input[type="button"]').addEventListener('click', event => {
  location.reload()
})