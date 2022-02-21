const inpDateStart = document.querySelector('.inp1');
const inpDateEnd = document.querySelector('.inp2');
const divSelect = document.querySelector('.divSelect');
const currencyList = document.querySelector('.currency');
const tabl = document.querySelector('.tabl');
const week = document.querySelector('.week');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const currencyNameInTabl = document.querySelector('.currencyNameInTabl');


                      //массив с валютами
let currencyArr = [];

                           //поиск действующих валют на период
const myWorker = new Worker('Workers/workerCurrencies.js');
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
    if (inpDateStart.value && inpDateEnd.value) {
      data2()
      dataBtn();
    }
    if (tabl.innerHTML == "") {
      receivingData([0, 0]);
      currencyNameInTabl.innerHTML = objToSearch.Cur_Name;
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

const workerCalendars = new Worker('Workers/workerCalendars.js');

function data2() {
  workerCalendars.postMessage([objToSearch.Cur_ID, inpDateStart.value, inpDateEnd.value]);
  console.log('sending to work');
  calendarDisplay()
}

function calendarDisplay() {
  workerCalendars.onmessage = function({data}) {
    receivingData(data);
    tabl.innerHTML = "";
         for (let i = 0; i <= data.length-1; i++) {
           tabl.innerHTML += `<tr> <td>Дата: ${data[i].Date.slice(0,10)}</td> <td>Курс: ${data[i].Cur_OfficialRate}</td> </tr>`
         }
  }
}



                                               //кнопки отображения (неделя/месяц/год)
let workerBtn = new Worker('Workers/workerBtn.js');

function dataBtn(time) {
  if (objToSearch) {
    let arrWorkerBtn = [{curID: objToSearch.Cur_ID}, time, {today: dayjs().format('YYYY-MM-DD')}];
    workerBtn.postMessage([arrWorkerBtn]);
    //console.log('данные за бтн');
   };
};

week.addEventListener('click', function() {
  dataBtn({time: dayjs().add(-6, 'day').format('YYYY-MM-DD')});
  dataWithBtn();
})

month.addEventListener('click', function() {
  dataBtn({time: dayjs().add(-1, 'month').format('YYYY-MM-DD')});
  dataWithBtn();
})

year.addEventListener('click', function() {
  dataBtn({time: dayjs().add(-1, 'year').format('YYYY-MM-DD')});
  dataWithBtn();
})


function dataWithBtn() {
  workerBtn.onmessage = function({data}) {
    receivingData(data)
    console.log(data);
    tabl.innerHTML = "";
    currencyNameInTabl.innerHTML = objToSearch.Cur_Name;
       for (let i = 0; i <= data.length-1; i++) {
         tabl.innerHTML += `<tr> <td>Дата: ${data[i].Date.slice(0,10)}</td> <td>Курс: ${data[i].Cur_OfficialRate}</td> </tr>`
       }
  };
}