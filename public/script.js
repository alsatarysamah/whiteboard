"use strict";
let canvas = document.getElementById("canvas");
// let 
var io = io.connect("http://localhost:3020")
canvas.width =.98* window.innerWidth;
canvas.hight = window.innerHeight;

let ctx = canvas.getContext("2d");
let x;
let y;
let mouseDown = false;

io.on("onDraw",(data)=>{
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
})
io.on("ondown",(data)=>{
    ctx.moveTo(data.x,data.y);
})
window.onmousedown = (e) => {
    ctx.moveTo(x,y)
    io.emit("down",{x,y})
  mouseDown = true;
};
window.onmouseup = (e) => {
  mouseDown = false;
};
window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;
  //   console.log(x, y);
  if (mouseDown) {
    io.emit('draw',{ x , y });
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  
};
