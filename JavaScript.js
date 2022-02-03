let inpDateStart = document.querySelector('.inp1');
let inpDateEnd = document.querySelector('.inp2');
let divSelect = document.querySelector('.divSelect');
let currencyList = document.querySelector('.currency');
let tabl = document.querySelector('.tabl');
let week = document.querySelector('.week');
let month = document.querySelector('.month');
let year = document.querySelector('.year');


                      //массив с валютами
let currencyArr = [];

                           //поиск действующих валют на период
    fetch('https://www.nbrb.by/api/exrates/currencies')
  .then((response) => response.json())
  .then((data) => data.filter((el) => Number(el.Cur_DateEnd.slice(0,4)) >= 2022))
  .then(function push(data) {
    data.forEach((el) => currencyArr.push(el));
    addCurrency()
  })   

                              //добавление валют в select
function addCurrency() {
  //currencyList.innerHTML = "";
  for (let i = 0; i < currencyArr.length - 1; i++) {
      currencyList.innerHTML += `<option name"${currencyArr[i].Cur_ID}">${currencyArr[i].Cur_Name}</option>`
  }
}


                                                          //нахождение объекта для поиска в общем массиве
let objToSearch;

divSelect.addEventListener('change', function (event) {
    let objCurrency = currencyArr.find(el => el.Cur_Name === event.target.value)
    objToSearch = "";
    objToSearch = objCurrency
    console.log(objToSearch)
    if (inpDateStart.value && inpDateEnd.value) {
      data()
    }
})


                                                 //вывод таблицы валюты 
inpDateStart.addEventListener('change', function() {
  if (inpDateStart.value && inpDateEnd.value) {
    data()
  }
})
inpDateEnd.addEventListener('change', function() {
  if (inpDateStart.value && inpDateEnd.value) {
    data()
  }
})


function data() {
  fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objToSearch.Cur_ID}?startDate=${inpDateStart.value}&endDate=${inpDateEnd.value}`)
   .then((response) => response.json())
      .then(function pushTable(data) {
       tabl.innerHTML = ""
        for (let i = 0; i <= data.length-1; i++) {
          tabl.innerHTML += `<tr> <td>Дата:${data[i].Date.slice(0,10)}</td> <td>Курс:${data[i].Cur_OfficialRate}</td> </tr>`
        }
      })
}


                                               //кнопки отображения (неделя/месяц/год)
let a = dayjs().format('YYYY-MM-DD')
console.log(a)

week.addEventListener('click', function() {
  let weekDj = dayjs().add(-7, 'day').format('YYYY-MM-DD')
  console.log(a)
  console.log(weekDj)
  fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objToSearch.Cur_ID}?startDate=${weekDj}&endDate=${a}`)
   .then((response) => response.json())
   .then(function pushTable(data) {
    tabl.innerHTML = ""
     for (let i = 0; i <= data.length-1; i++) {
       tabl.innerHTML += `<tr> <td>Дата:${data[i].Date.slice(0,10)}</td> <td>Курс:${data[i].Cur_OfficialRate}</td> </tr>`
     }
   })
})

month.addEventListener('click', function() {
  let monthDj = dayjs().add(-1, 'month').format('YYYY-MM-DD')
  console.log(a)
  console.log(monthDj)
  fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objToSearch.Cur_ID}?startDate=${monthDj}&endDate=${a}`)
   .then((response) => response.json())
   .then(function pushTable(data) {
    tabl.innerHTML = ""
     for (let i = 0; i <= data.length-1; i++) {
       tabl.innerHTML += `<tr> <td>Дата:${data[i].Date.slice(0,10)}</td> <td>Курс:${data[i].Cur_OfficialRate}</td> </tr>`
     }
   })
})

year.addEventListener('click', function() {
  let yearDj = dayjs().add(-1, 'year').format('YYYY-MM-DD')
  console.log(objToSearch)
  console.log(yearDj)
  fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objToSearch.Cur_ID}?startDate=${yearDj}&endDate=${a}`)
   .then((response) => response.json())
   .then(function pushTable(data) {
    tabl.innerHTML = ""
     for (let i = 0; i <= data.length-1; i++) {
       tabl.innerHTML += `<tr> <td>Дата:${data[i].Date.slice(0,10)}</td> <td>Курс:${data[i].Cur_OfficialRate}</td> </tr>`
     }
   })
})


