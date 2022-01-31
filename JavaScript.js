let inpDateStart = document.querySelector('.inp1');
let inpDateEnd = document.querySelector('.inp2');
let divInput = document.querySelector('.divInput');
let divSelect = document.querySelector('.divSelect');
let currencyList = document.querySelector('.currency');
let week = document.querySelector('.week');
let month = document.querySelector('.month');
let year = document.querySelector('.year');
let tabl = document.querySelector('.tabl');

divInput.addEventListener('keyup', search);

                      //массив с валютами
let currencyArr = [];

                           //поиск действующих валют на период
function search() {
    fetch('https://www.nbrb.by/api/exrates/currencies')
  .then((response) => response.json())
  .then((data) => data.filter((el) => Number(el.Cur_DateStart.slice(0,4)) <= `${inpDateStart.value}`))
  .then((data) => data.filter((el) => Number(el.Cur_DateEnd.slice(0,4)) >= `${inpDateStart.value}`))
  .then(function push(data) {
    currencyArr = [];
    data.forEach((el) => currencyArr.push(el));
    addCurrency()
  })   
}

                                                          //нахождение объекта для поиска в общем массиве
divSelect.addEventListener('click', function (event) {
    let objCurrency = currencyArr.find(el => el.Cur_Name === event.target.value)
    objToSearch = "";
    objToSearch = objCurrency
    data()
    btn()
})

                 //запрашшиваемый объект
let objToSearch;


                                                 //нахождение даты для первоначального отображения (на первый месяц года)
function data() {
  //console.log(objToSearch.Cur_ID)
  fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objToSearch.Cur_ID}?startDate=${inpDateStart.value}-1-1&endDate=${inpDateStart.value}-1-30`)
   .then((response) => response.json())
     .then(function pushTable(data) {
      tabl.innerHTML = ""
       for (let i = 0; i <= data.length-1; i++) {
         tabl.innerHTML += `<tr> <td>Дата:${data[i].Date.slice(0,10)}</td> <td>Курс:${data[i].Cur_OfficialRate}</td> </tr>`
       }
     })
}

 
 week.addEventListener('click', weekBtn);
 month.addEventListener('click', monthBtn);
 year.addEventListener('click', yearBtn) 

 let yearPeriod = [];  

function btn() {
  fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objToSearch.Cur_ID}?startDate=${inpDateStart.value}-1-1&endDate=${inpDateStart.value}-12-31`)
    .then((response) => response.json())
    .then(function(data) {
       yearPeriod = [];
       data.forEach((el) => yearPeriod.push(el));
    })
}

                      //week
function weekBtn() {
  tabl.innerHTML = "";
  for (let i = 0; i <= 6; i++) {
    tabl.innerHTML += `<tr> <td>Дата:${yearPeriod[i].Date.slice(0,10)}</td> <td>Курс:${yearPeriod[i].Cur_OfficialRate}</td> </tr>`
  }
}

                      //month
function monthBtn() {
  tabl.innerHTML = "";
  for (let i = 0; i <= 30; i++) {
    tabl.innerHTML += `<tr> <td>Дата:${yearPeriod[i].Date.slice(0,10)}</td> <td>Курс:${yearPeriod[i].Cur_OfficialRate}</td> </tr>`
  }
}

                     //year
function yearBtn() {
  tabl.innerHTML = "";
  for (let i = 0; i <= yearPeriod.length - 1; i++) {
    tabl.innerHTML += `<tr> <td>Дата:${yearPeriod[i].Date.slice(0,10)}</td> <td>Курс:${yearPeriod[i].Cur_OfficialRate}</td> </tr>`
  }
}


                            //добавление валют с select
function addCurrency() {
    currencyList.innerHTML = "";
    for (let i = 0; i < currencyArr.length - 1; i++) {
        currencyList.innerHTML += `<option name"${currencyArr[i].Cur_ID}">${currencyArr[i].Cur_Name}</option>`
    }
}
