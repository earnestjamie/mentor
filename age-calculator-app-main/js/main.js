'use strict';


document.querySelector('.age .line button').addEventListener('click', event => {
  let date = new Date(document.querySelector('.year').value 
    + '-' + document.querySelector('.month').value
    + '-' + document.querySelector('.date').value);
  let dateCurrent = new Date(`${new Date().getFullYear()}-${(new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}-${new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()}`);
  if(date instanceof Date && !isNaN(date) && document.querySelector('.year').value.length == 4) {
    if(document.querySelector('.data label').classList.contains('invalid')) {
      Array.from(document.querySelectorAll('.data label')).forEach(item => item.classList.remove('invalid'));
      Array.from(document.querySelectorAll('.data label input')).forEach(item => item.classList.remove('invalid'));
      Array.from(document.querySelectorAll('.data label p')).forEach(item => item.style.visibility = 'hidden');
    }
    let dateArr = dateDiff(date, dateCurrent);
    document.querySelector('.age').classList.add('calc');
    Array.from(document.querySelectorAll('.age > p')).forEach((item, index) => {
      item.setAttribute('data-before', `${dateArr[index]} `);
    })  

  } else {
    Array.from(document.querySelectorAll('.data label')).forEach(item => item.classList.add('invalid'));
    Array.from(document.querySelectorAll('.data label input')).forEach(item => item.classList.add('invalid'));
    Array.from(document.querySelectorAll('.data label p')).forEach(item => item.style.visibility = 'visible');
  }
  
})

function dateDiff(startingDate, endingDate) {
  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
  if (!endingDate) {
    endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate);
  if (startDate > endDate) {
    const swap = startDate;
    startDate = endDate;
    endDate = swap;
  }
  const startYear = startDate.getFullYear();
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  return [yearDiff, monthDiff, dayDiff];
}