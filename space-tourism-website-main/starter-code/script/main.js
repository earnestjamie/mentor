'use strict'


fetch('./data.json')
  .then(res => res.json())
  .then(json => {
    if(window.location.href.endsWith('destination.html')) {
      destination(json, 'Moon')
      let previousPlanet = document.querySelector('.right nav ul li:nth-child(1)');
      document.querySelector('.right nav').addEventListener('click', event => {
        if(event.target.tagName == 'A') {
          event.preventDefault();
          destination(json, event.target.textContent.slice(0, 1) + event.target.textContent.slice(1));
          previousPlanet.style.borderColor = 'transparent';
          previousPlanet = event.target.closest('li');
          event.target.closest('li').style.borderColor = 'white';
        }
      })
    } else if(window.location.href.endsWith('crew.html')) {
      new Splide( '.right' ).mount();
      document.querySelector('.splide__pagination button').focus();
      crew(json, 'Anousheh Ansari')
      document.querySelector('.splide__pagination').addEventListener('click', event => {
        if(event.target.tagName == 'BUTTON') {
          setTimeout(() => {
            let memberCoords = document.querySelector('.right').getBoundingClientRect();
            let member = document.elementFromPoint(memberCoords.left, memberCoords.top).src;
            member = member.match(/(?<=image-)(\w*-\w*)/gm);
            member = member[0].split('-').map(item => item.slice(0, 1).toUpperCase() + item.slice(1)).join(' ');
            crew(json, member);
          }, 500)
        }
      });
      document.addEventListener('keydown', event => {
        if(event.code == 'ArrowRight' || event.code == 'ArrowLeft') {
          setTimeout(() => {
            let memberCoords = document.querySelector('.right').getBoundingClientRect();
            let member = document.elementFromPoint(memberCoords.left, memberCoords.top).src;
            member = member.match(/(?<=image-)(\w*-\w*)/gm);
            member = member[0].split('-').map(item => item.slice(0, 1).toUpperCase() + item.slice(1)).join(' ');
            crew(json, member);
          }, 500)
        }
      }, { capture: true });
    } else if(window.location.href.endsWith('technology.html')) {
      new Splide( '.right' ).mount();
      document.querySelector('.splide__pagination button').focus();
      technology(json, 'Launch vehicle');
      document.querySelector('.splide__pagination').addEventListener('click', event => {
        if(event.target.tagName == 'BUTTON') {
          setTimeout(() => {
            let memberCoords = document.querySelector('.right').getBoundingClientRect();
            let member = document.elementFromPoint(memberCoords.left, memberCoords.top).src;
            member = member.match(/(?<=image-)((?:(?!(-portrait|-landscape)).))*/gm);
            member = member[0].split('-').map((item, index) => index == 0 ? item.slice(0, 1).toUpperCase() + item.slice(1) : item).join(' ');
            technology(json, member);
          }, 500)
        }
      });
      document.addEventListener('keydown', event => {
        if(event.code == 'ArrowRight' || event.code == 'ArrowLeft') {
          setTimeout(() => {
            let memberCoords = document.querySelector('.right').getBoundingClientRect();
            let member = document.elementFromPoint(memberCoords.left, memberCoords.top).src;
            member = member.match(/(?<=image-)((?:(?!(-portrait|-landscape)).))*/gm);
            member = member[0].split('-').map((item, index) => index == 0 ? item.slice(0, 1).toUpperCase() + item.slice(1) : item).join(' ');
            technology(json, member);
          }, 500)
        }
      }, { capture: true });
    };

    if(document.querySelector('.burger')?.style.display == '') {
      let menu = document.querySelector('.burger');
      let ul = document.querySelector('body > nav ul');
      menu.addEventListener('click', event => {
        if(!ul.classList.contains('opened')) {
          ul.classList.add('opened');
          menu.querySelector('img').src = './assets/shared/icon-close.svg';
        } else {
          ul.classList.remove('opened');
          menu.querySelector('img').src = './assets/shared/icon-hamburger.svg';
        }        
      })
    }
  });



function destination(json, planet) {
  let object = json.destinations.find(item => item.name == planet);
  document.querySelector('main .left img').src = object.images.png;
  document.querySelector('main .right > p:first-of-type').textContent = object.name;
  document.querySelector('main .right > p:nth-of-type(2)').textContent = object.description;
  document.querySelector('.distance p:nth-of-type(2)').textContent = object.distance;
  document.querySelector('.time p:nth-of-type(2)').textContent = object.travel;
}

function crew(json, member) {
  let object = json.crew.find(item => item.name == member);
  document.querySelector('main .left .role').textContent = object.role;
  document.querySelector('main .left .name').textContent = object.name;
  document.querySelector('main .left .bio').textContent = object.bio;
}

function technology(json, member) {
  let object = json.technology.find(item => item.name == member);
  document.querySelector('main .left .name').textContent = object.name;
  document.querySelector('main .left .bio').textContent = object.description;
}