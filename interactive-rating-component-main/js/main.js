'use strict'

let scoreArr = document.querySelectorAll('.container .score > button');
function scoreClick() {
  let uncheck = Array.from(scoreArr).find(elem => elem.style.backgroundColor == 'rgb(251, 116, 19)');
  if(uncheck) {
    uncheck.style.backgroundColor = 'hsl(216, 12%, 28%)';
    uncheck.style.borderColor = 'hsl(216, 12%, 28%)';
    uncheck.style.color = 'hsl(216, 12%, 58%)';
  }
  this.style.backgroundColor = 'hsl(25, 97%, 53%)';
  this.style.borderColor = 'hsl(25, 97%, 53%)';
  this.style.color = 'white';
  
}
scoreArr.forEach(score => {
  score.addEventListener('click', scoreClick);
  // score.addEventListener('touchstart', scoreClick);
})