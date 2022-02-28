
fetch('https://www.nbrb.by/api/exrates/currencies')
.then((response) => response.json())
  .then(postMessage)



   onmessage = function(workerBtn) {

  let sendingArrWorkerBtn = [];

  console.log('пришли данные workerBtn в воркев2');
console.log(workerBtn.data[0]);
    fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${workerBtn.data[0].curID}?startDate=${workerBtn.data[0].dataStart}&endDate=${workerBtn.data[0].dataEnd}`)
    .then((response) => response.json())
    .then((data) => {
      sendingArrWorkerBtn = {
        msg: 'request',
        data: data.reverse()};
      return sendingArrWorkerBtn
     })
     .then(postMessage)



} 