var balloon, balloonImg;
var backgroundImg;
var database;
var position;

function preload()
{
  balloonImg=loadAnimation("images/Balloon1.png" , "images/Balloon2.png" , "images/Balloon3.png");
  backgroundImg=loadImage("images/City.png");
}
function setup()
{
  createCanvas(1000,750);
  database=firebase.database();
  balloon=createSprite(200, 500, 50, 50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale=0.8;
  var balloonposition=database.ref('balloon/position');
  balloonposition.on("value",readposition,showerror);

}

function draw() {
  background(backgroundImg);

  if(keyDown(LEFT_ARROW))
  {
    balloon.x = balloon.x-10;
  }
  else if(keyDown(RIGHT_ARROW))
  {
    balloon.x = balloon.x+10
  }
  else if(keyDown(UP_ARROW))
  {
    balloon.y = balloon.y-10
    balloon.addAnimation("balloon" , balloonImg);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW))
  {
    balloon.y = balloon.y+10
    balloon.addAnimation("balloon" , balloonImg);
    balloon.scale=balloon.scale +0.01;
  }
  textSize(20);
  fill("black");
  stroke(3);
  text("Use arrow keys to move hot air balloon", 30, 30)

  drawSprites();
}
function updatePosition(x,y)
{
   database.ref('balloon/position').set({
       'x':position.x+x,
       'y':position.y+y
   })
}
function readposition(data)
{
    position=data.val()
    balloon.x = position.x;
    balloon.y = position.y;
}
function showerror()
{
    console.log("There is an error in code");
}