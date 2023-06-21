'use strict'

let scoreArr = document.querySelectorAll('.container .score > button');
let submit = document.querySelector('.container > button');

scoreArr.forEach(score => {
  score.addEventListener('click', function () {
    let uncheck = Array.from(scoreArr).find(elem => elem.style.backgroundColor == 'rgb(251, 116, 19)');
    if(uncheck) {
      uncheck.style.backgroundColor = 'hsl(216, 12%, 28%)';
      uncheck.style.borderColor = 'hsl(216, 12%, 28%)';
      uncheck.style.color = 'hsl(216, 12%, 58%)';
    }
    this.style.backgroundColor = 'hsl(25, 97%, 53%)';
    this.style.borderColor = 'hsl(25, 97%, 53%)';
    this.style.color = 'white';
  });
})

submit.addEventListener('click', function() {
  let uncheck = Array.from(scoreArr).find(elem => elem.style.backgroundColor == 'rgb(251, 116, 19)')
  if(uncheck){
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.result').style.display = 'flex';
    document.querySelector('.result .result-score span').innerHTML = uncheck.innerHTML;
  }
})

