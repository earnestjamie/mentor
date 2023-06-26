'use strict';

let previousQuestion;
document.querySelector('.faq').addEventListener('click', event => {
  if(event.target.className == 'question') {
    if(previousQuestion && previousQuestion == event.target.parentElement) {
      event.target.parentElement.classList.toggle('pane');
      previousQuestion = undefined;
    } else if(previousQuestion && previousQuestion != event.target.parentElement) {
      previousQuestion.classList.toggle('pane');
      event.target.parentElement.classList.toggle('pane');
      previousQuestion = event.target.parentElement;
    } else if(previousQuestion == undefined) {
      event.target.parentElement.classList.toggle('pane')
      previousQuestion = event.target.parentElement;
    }
  } 
})