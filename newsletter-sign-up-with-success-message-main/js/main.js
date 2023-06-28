'use strict';

function submitEmail(event) {
  if(event.target.className == 'submit' 
    && (event.__proto__ === PointerEvent.prototype || event.key === 'Enter')) {
    if(document.querySelector('.confirmation').style.display == '') {
      let emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
      let isValidEmail = emailRegex.test(document.querySelector('.e-mail').value);
      if(isValidEmail) {
        document.querySelector('.info').style.display = 'none';
        document.querySelector('.img').style.display = 'none';
        document.querySelector('.confirmation').style.display = 'flex';
        document.querySelector('.confirmation p span').innerHTML = document.querySelector('.e-mail').value;
      } else {
        document.querySelector('.info form label span').innerHTML = 'Valid email required';
      }
    } else {
      document.querySelector('.info').style.display = 'flex';
      document.querySelector('.img').style.display = 'flex';
      document.querySelector('.confirmation').style.display = '';
      document.querySelector('.e-mail').value = '';
      document.querySelector('.info form label span').innerHTML = '';
    }
  }
}

document.querySelector('.container').addEventListener('click', submitEmail);
document.querySelector('.container').addEventListener('keyup', submitEmail);