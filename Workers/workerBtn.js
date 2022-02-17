

   onmessage = function(workerBtn) {
     let sendingArrWorkerBtn = ["test"];


       //console.log('пришли данные workerBtn в воркев');
       //fetch week
        fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${workerBtn.data[0][0].curID}?startDate=${workerBtn.data[0][2].week}&endDate=${workerBtn.data[0][1].today}`)
        .then((response) => response.json())
        .then((data) => {
          sendingArrWorkerBtn[0] = data;
          return sendingArrWorkerBtn
         })
      
         //fetch week
        fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${workerBtn.data[0][0].curID}?startDate=${workerBtn.data[0][3].month}&endDate=${workerBtn.data[0][1].today}`)
          .then((response) => response.json())
          .then((data) => {
            sendingArrWorkerBtn[1] = data;
            return sendingArrWorkerBtn
           })

         //fetch year
         fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${workerBtn.data[0][0].curID}?startDate=${workerBtn.data[0][4].year}&endDate=${workerBtn.data[0][1].today}`)
         .then((response) => response.json())
         .then((data) => {
           sendingArrWorkerBtn[2] = data;
           return sendingArrWorkerBtn
          })
          .then(postMessage)

   }