'use strict'



document.querySelector('.number-unread').textContent = document.querySelectorAll('.unread').length;

document.querySelector('.notification button').addEventListener('click', event => {
  for(let item of document.querySelectorAll('.unread')) {
    item.classList.remove('unread');
  }
});

document.querySelector('.container').addEventListener('click', event => {
  if(event.target.closest('.message')) {
    event.target.closest('.message').classList.toggle('unread');
  }
})

let observer = new MutationObserver(() => {
  document.querySelector('.number-unread').textContent = document.querySelectorAll('.unread').length;
});

observer.observe(document.querySelector('.container'), {
  subtree: true, 
  attributeFilter: ['class'],
});

