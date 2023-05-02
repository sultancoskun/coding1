function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);
  for(let i=50; i <mouseX; i+=50){
    for (let j = 50; j< mouseY; j+=50){
      stroke(255)
      strokeWeight(2)
      circle(i,j,50)
      }
    }
}