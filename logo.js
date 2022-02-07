let logo = document.getElementById("logo");
let ctx = logo.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = "rgb(112, 112, 112)";
    ctx.arc(75,75,50,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "gold";
    ctx.moveTo(45,45);
    ctx.lineTo(85,45);
    ctx.lineTo(45,85);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(105,105);
    ctx.lineTo(105,65);
    ctx.lineTo(65,105);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.translate(200, 80);
  ctx.rotate((Math.PI / -350) * 90);
  ctx.translate(-157, -167);
    ctx.font = "23px sans-serif";
    ctx.fillText("PA", 60, 80);
    
    
    