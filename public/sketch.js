let socket = io();
let myColor = 'white';
let myRadius = 20;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("radius", setRadius);


function setColor(assignedColor){

  myColor = assignedColor;

}
function setRadius(assignedRadius){

  myRadius = assignedRadius;

}

function newConnection() {
  console.log("your id:", socket.id);
}


function drawOtherMouse (data){
push();
  stroke(data.color);
  noFill();
  ellipse(data.x, data.y, data.radius, data.radius*2.5);
pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  background('black');

}

function draw() {
  // put drawing code here
  push();
  fill(myColor);
  textFont('Montserrat');
  textAlign('center');
  textSize(15);
  text('Move your mouse to draw, click and move to interrupt the line.', width/2, height/2);
  text('Draw with your friends.', width/2, height/2+50);
  pop();
}

function mouseMoved (){
if (mouseIsPressed==false){
  push();
  stroke(myColor);
  noFill();
  rect(mouseX, mouseY, myRadius, myRadius*2.5);
  pop();
}
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
    radius: myRadius,
  }
  socket.emit("mouse", message);
}
