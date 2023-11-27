'use strict'

let test;
let previousWidth;
function expand(event) {
  if(Array.from(document.querySelectorAll('[data-div]')).map(item => item.dataset.div)
    .includes(event.target.closest('a')?.textContent)) {
      document.querySelector(`[data-div='${event.target.closest('a')?.textContent}']`).style.visibility = 'visible';
      
      event.target.closest('li').addEventListener('mouseleave', function listLeave(event) {
        if(event.currentTarget != document.querySelector('ul') || !event.currentTarget.closest('div[data-div]')) {
          event.target.closest('li').querySelector(`div`).style.visibility = 'hidden';
          event.target.closest('li').removeEventListener('mouseleave', listLeave);
        }
      })
  }
}

function expandDown(event) {
  if(event.target.closest('li')?.querySelector('[data-div]') && event.target.closest('li').querySelector('[data-div]').style.display != 'flex') {
    event.target.closest('li').querySelector('[data-div]').style.display = 'flex';
    event.target.closest('li').classList.add('open');
    event.target.closest('li').classList.remove('close');
  } else if(event.target.closest('li')?.querySelector('[data-div]') && event.target.closest('li').querySelector('[data-div]').style.display == 'flex') {
    event.target.closest('li').querySelector('[data-div]').style.display = 'none';
    event.target.closest('li').classList.add('close');
    event.target.closest('li').classList.remove('open');
  }
}

function navMobile() {
  document.querySelector('.hero').setAttribute('src', './images/image-hero-mobile.png');
    test = document.querySelector('nav').innerHTML;
    let menu = document.createElement('div');
    let menuButton = document.createElement('button');
    let menuImg = document.createElement('img');
    menu.classList.add('mobile');
    menuButton.append(menuImg);
    menuImg.src = './images/icon-menu.svg';
    document.querySelector('nav').prepend(document.querySelector('.logo span'), menu, menuButton);
    menu.append(document.querySelector('.logo'), document.querySelector('.login'))


    document.querySelector('button img').addEventListener('click', function menuOpen(event) {
      menu.classList.add('open');
      document.querySelector('nav ul').classList.add('open');
      document.querySelector('nav .login ul').classList.add('open');
      document.querySelector('.features').classList.add('open');
      document.querySelector('.company').classList.add('open');
      menuImg.src = './images/icon-close-menu.svg';

      document.querySelector('.logo ul').removeEventListener('mouseover', expand)
      document.querySelector('.logo ul').addEventListener('click', expandDown)
      document.querySelector('button img').addEventListener('click', function menuClose(event) {    
        menu.classList.remove('open');
        document.querySelector('.logo ul').removeEventListener('click', expandDown)
        document.querySelector('button img').removeEventListener('click', menuClose)
        menuImg.src = './images/icon-menu.svg';
        document.querySelector('button img').addEventListener('click', menuOpen)
      })
      document.querySelector('button img').removeEventListener('click', menuOpen)
    }) 
}

document.querySelector('.logo ul').addEventListener('mouseover', expand)

window.addEventListener('resize', event => {
  if(window.innerWidth <= 730 && previousWidth > 730) {
    previousWidth = window.innerWidth;
    navMobile();
  } else if(window.innerWidth > 730 && previousWidth <= 730) {
    previousWidth = window.innerWidth;
    document.querySelector('.hero').setAttribute('src', './images/image-hero-desktop.png');
    for(let item of document.querySelectorAll('.open')) {
      item.classList.remove('open');
    }
    document.querySelector('nav').innerHTML = test;
    document.querySelector('.logo ul').addEventListener('mouseover', expand)

  }
})

document.addEventListener('DOMContentLoaded', event => {
  previousWidth = window.innerWidth;
  if(window.innerWidth <= 730) {
    navMobile();
  }
})





