'use strict';

(async () => {
  let data = await (await fetch('./data.json')).json();
  let max = data.reduce((acc, item) => item.amount > acc.amount ? acc = item: acc)
  let days = document.querySelector('.days')
  data.forEach(item => {
    let day = document.createElement('div');
    day.classList.add(`${item.day}`);
    document.querySelector('.days').append(day);
    let build = document.createElement('div');
    if(max == item) {
      build.classList.add('build', 'max');
    } else {
      build.classList.add('build');
    }
    day.append(build);
    let p = document.createElement('p');
    p.textContent = item.day;
    day.append(p);
    build.style.height = item.amount / max.amount * (days.clientHeight - parseInt(getComputedStyle(days).paddingTop) * 2 - p.clientHeight)  + 'px';
    let info = document.createElement('p');
    info.classList.add('info');
    info.textContent = `$${item.amount}`;
    build.append(info);
  })
})();

document.querySelector('.days').addEventListener('mouseover', event => {
  if(event.target.classList.contains('build')) {
    event.target.querySelector(`.info`).style.visibility = 'visible';
    event.target.addEventListener('mouseout', function mouseOver(event) {
      event.currentTarget.querySelector(`.info`).style.visibility = 'hidden';
      event.currentTarget.removeEventListener('mouseout', mouseOver);
    })
  }
});












