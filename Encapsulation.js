
class threeCurrencies extends HTMLElement {
  constructor () {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    let divgeneral  = document.createElement('div');  //divgeneral 
    divgeneral.setAttribute('class', 'divgeneral');

    let imgUSA = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRIpv-4XV9t6haVm7b0HA2y3EgRqVJkgWIQ&usqp=CAU';
    let imgEURO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauAYVa3Wd52s6cIhwY0F1ToH8DUid_mM-Ag&usqp=CAU';
    let imgRUS = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRGqs5Wyur496ZU2A5pZQu3qPe1E9rY5cfA&usqp=CAU';
    let imgFlagUSA = document.createElement('img');
    let imgFlagEURO = document.createElement('img');
    let imgFlagRUS = document.createElement('img');
    imgFlagUSA.src = imgUSA;
    imgFlagEURO.src = imgEURO;
    imgFlagRUS.src = imgRUS;

    
    let divFlag  = document.createElement('div');  //divFlag
    divFlag.setAttribute('class', 'Flags');
    let flagOne = document.createElement('div')
    flagOne.setAttribute('class', 'flagOne');
    let flagTwo = document.createElement('div')
    flagTwo.setAttribute('class', 'flagTwo');
    let flagThree = document.createElement('div')
    flagThree.setAttribute('class', 'flagThree');
    divFlag.appendChild(flagOne);
    flagOne.appendChild(imgFlagUSA);
    divFlag.appendChild(flagTwo);
    flagTwo.appendChild(imgFlagEURO);
    divFlag.appendChild(flagThree);
    flagThree.appendChild(imgFlagRUS);

    let CurName  = document.createElement('div');  //CurName
    CurName.setAttribute('class', 'CurName');
    let CurNameOne = document.createElement('div')
    CurNameOne.setAttribute('class', 'CurNameOne');
    let CurNameTwo = document.createElement('div')
    CurNameTwo.setAttribute('class', 'CurNameTwo');
    let CurNameThree = document.createElement('div')
    CurNameThree.setAttribute('class', 'CurNameThree');
    CurNameOne.innerHTML = 'USD';
    CurNameTwo.innerHTML = 'EURO';
    CurNameThree.innerHTML = 'RUS';
    CurName.appendChild(CurNameOne);
    CurName.appendChild(CurNameTwo);
    CurName.appendChild(CurNameThree);

    let currencyDiv  = document.createElement('div');  //currencyDiv
    currencyDiv.setAttribute('class', 'currencyDiv');
    let currencyDivOne = document.createElement('div')
    currencyDivOne.setAttribute('class', 'currencyDivOne');
    let currencyDivTwo = document.createElement('div')
    currencyDivTwo.setAttribute('class', 'currencyDivTwo');
    let currencyDivThree = document.createElement('div')
    currencyDivThree.setAttribute('class', 'currencyDivThree');
    currencyDiv.appendChild(currencyDivOne);
    currencyDiv.appendChild(currencyDivTwo);
    currencyDiv.appendChild(currencyDivThree);

    


    divgeneral.appendChild(divFlag);
    divgeneral.appendChild(CurName);
    divgeneral.appendChild(currencyDiv);
    
    // currency USD
  fetch('https://www.nbrb.by/api/exrates/rates/431')
   .then((response) => response.json())
   .then((data) => currencyDivOne.innerHTML = data.Cur_OfficialRate)
   // currency EURO
  fetch('https://www.nbrb.by/api/exrates/rates/451')
  .then((response) => response.json())
  .then((data) => currencyDivTwo.innerHTML = data.Cur_OfficialRate)
  // currency RUS
  fetch('https://www.nbrb.by/api/exrates/rates/456')
   .then((response) => response.json())
   .then((data) => currencyDivThree.innerHTML = data.Cur_OfficialRate)


    const style = document.createElement('style');

    style.textContent = `
    .divgeneral {
      background: linear-gradient(to bottom right, #ffff00 0%, #ff9900 100%);
        width: 300px;
        height: 160px;
        display: flex;
        justify-content: space-evenly;
        border-radius: 7px;
      } 
    img {
        border-radius: 7px;
        width: 80%;
        height: 80%;
        margin: 5px;
        box-shadow: 0 0 10px black;
    }
      
    .Flags {
        width: 75px;
        height: 160px;
        display: flex;
        flex-direction: column;
      }
      .flagOne, .flagTwo, .flagThree {
        width: 70px;
        height: 53px;
      }

      .CurName {
        width: 90px;
        height: 160px;
        display: flex;
        flex-direction: column;
      }
      .CurNameOne, .CurNameTwo, .CurNameThree {
        width: 50px;
        height: 53px;
        font-size: 20px;
        text-align: center;
        padding: 14px 0 0 0;
        
      }
      
     
      .currencyDiv {
        width: 90px;
        height: 160px;
        display: flex;
        flex-direction: column;
      }
      .currencyDivOne, .currencyDivTwo, .currencyDivThree {
        font-weight: 900;
        font-size: 21px;
        text-align: center;
        padding: 14px 0 0 0;
        width: 85px;
        height: 53px;
      }

      `;
      shadow.appendChild(style);
      shadow.appendChild(divgeneral);
  }
}

customElements.define('three-currencies', threeCurrencies);