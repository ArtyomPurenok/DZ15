

   onmessage = function(workerBtn) {
     let sendingArrWorkerBtn = [];

       //console.log('пришли данные workerBtn в воркев');

         fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${workerBtn.data[0][0].curID}?startDate=${workerBtn.data[0][1].time}&endDate=${workerBtn.data[0][2].today}`)
         .then((response) => response.json())
         .then((data) => {
           sendingArrWorkerBtn = data.reverse();
           return sendingArrWorkerBtn
          })
          .then(postMessage)

   }