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
  let myWorker = new Worker('Workers/workerCurrencies.js');
  myWorker.addEventListener('message', function({data}) {
    let workerData = data.filter((el) => Number(el.Cur_DateEnd.slice(0,4)) >= 2022);
    workerData.forEach((el) => currencyArr.push(el));
    addCurrency()
  });


                              //добавление валют в select
function addCurrency() {
  for (let i = 0; i < currencyArr.length - 1; i++) {
      currencyList.innerHTML += `<option name"${currencyArr[i].Cur_ID}">${currencyArr[i].Cur_Name}</option>`
  }
}


                                                          //нахождение объекта для поиска в общем массиве
let objToSearch;

divSelect.addEventListener('change', function (event) {
    tabl.innerHTML = ""
    let objCurrency = currencyArr.find(el => el.Cur_Name === event.target.value)
    objToSearch = "";
    objToSearch = objCurrency
    //console.log(currencyArr)
    if (inpDateStart.value && inpDateEnd.value) {
      data2()
      dataBtn();
    }
})


                                                 //вывод таблицы валюты 
inpDateStart.addEventListener('change', function() {
  if (inpDateStart.value && inpDateEnd.value) {
    data2()
  }
})
inpDateEnd.addEventListener('change', function() {
  if (inpDateStart.value && inpDateEnd.value) {
    data2()
  }
})

let workerCalendars = new Worker('Workers/workerCalendars.js');

function data2() {
  workerCalendars.postMessage([objToSearch.Cur_ID, inpDateStart.value, inpDateEnd.value]);
  console.log('sending to work');
  test()
}

function test() {
  workerCalendars.onmessage = function({data}) {
    tabl.innerHTML = ""
         for (let i = 0; i <= data.length-1; i++) {
           tabl.innerHTML += `<tr> <td>Дата: ${data[i].Date.slice(0,10)}</td> <td>Курс: ${data[i].Cur_OfficialRate}</td> </tr>`
         }
  }
}



                                               //кнопки отображения (неделя/месяц/год)
let a = dayjs().format('YYYY-MM-DD');
let weekDj = dayjs().add(-6, 'day').format('YYYY-MM-DD');
let monthDj = dayjs().add(-1, 'month').format('YYYY-MM-DD');
let yearDj = dayjs().add(-1, 'year').format('YYYY-MM-DD');

let workerBtn = new Worker('Workers/workerBtn.js');

function dataBtn() {
  if (objToSearch) {
    let arrWorkerBtn = [{curID: objToSearch.Cur_ID}, {today: a}, {week: weekDj}, {month: monthDj}, {year: yearDj}];
    workerBtn.postMessage([arrWorkerBtn]);
    console.log('данные за бтн');
   };
};

week.addEventListener('click', function() {
  dataBtn();
  workerBtn.onmessage = function({data}) {
    tabl.innerHTML = ""
       for (let i = 0; i <= data[0].length-1; i++) {
         tabl.innerHTML += `<tr> <td>Дата: ${data[0][i].Date.slice(0,10)}</td> <td>Курс: ${data[0][i].Cur_OfficialRate}</td> </tr>`
       }
  };
})

month.addEventListener('click', function() {
  dataBtn();
  workerBtn.onmessage = function({data}) {
    console.log(data)
    tabl.innerHTML = ""
       for (let i = 0; i <= data[1].length-1; i++) {
         tabl.innerHTML += `<tr> <td>Дата: ${data[1][i].Date.slice(0,10)}</td> <td>Курс: ${data[1][i].Cur_OfficialRate}</td> </tr>`
       }
  };
})




year.addEventListener('click', function() {
  dataBtn();
  workerBtn.onmessage = function({data}) {
    tabl.innerHTML = ""
       for (let i = 0; i <= data[2].length-1; i++) {
         tabl.innerHTML += `<tr> <td>Дата: ${data[2][i].Date.slice(0,10)}</td> <td>Курс: ${data[2][i].Cur_OfficialRate}</td> </tr>`
       }
  };

})


