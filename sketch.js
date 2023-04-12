//dog
let x = 100
let y = 350

//apple
let r = 200
let z = 140
  
function setup() {
  colorMode(HSB)
  createCanvas(400,400);
}

function draw() {
  background(190,204,90);
  
  //leaves
  
  noStroke()
  fill(150,160,40,100)
  triangle(80,200,300,200,190,60)
  
  
      //grass
  
  fill('lightgreen')
 rect(0,250,400,400)
  
      //tree
  
  noStroke()
  fill('brown')
  rect(165,200,50,80)
  
  
  //apples stem
  
  stroke('brown')
  line(250,200,250,170)
  line(190,140,190,110)
  line(130,200,130,170)
  
  
  if (mouseIsPressed){
    r=300
    z=300;
}
  
  //apples
  
  noStroke()
  fill('red')
  circle(250,r,30)
  circle(190,z,30)
  circle(130,r,30)
  

  //dogshead
  
   fill('brown')
  circle(x-47,y-30,40)
  
  //dogears
  
   fill('darkorange')
  circle(x-67,y-45,20)
  circle(x-27,y-45,20)
  
  //dogbody
  
  fill('brown')
  ellipse(x,y,100,50)
  
  //dogtail
  
  noFill()
  stroke('brown')
 arc(x+63,y-30,60,60,0,90)
   noStroke()
  fill('darkorange')
   circle(x+93,y-30,10)
  
  //dogleg
  
  fill('brown')
  ellipse(x+23,y+30,10,20)
  
  ellipse(x-22,y+30,10,20)
  
  ellipse(x+8,y+30,10,20)
  
  ellipse(x-7,y+30,10,20)
  
  //dogpaws
  
   fill('darkorange')

  ellipse(x+23,y+40,10,8)
  ellipse(x-20,y+40,10,8) 
  ellipse(x+8,y+40,10,8)
  ellipse(x-7,y+40,10,8)
  

}