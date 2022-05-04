const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var con3;
var rope;
var rope3;
var bubble,bubble_img;
var cut_sound,eating_sound;

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  eating_sound.setVolume(19);

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-20,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');


  rope = new Rope(5,{x:230,y:330});
  rope2 = new Rope(5,{x:5,y:450});
  rope3 = new Rope(6.2,{x:100,y:220});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);
  con3 = new Link(rope3,fruit);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);

  button.mouseClicked(drop2);

  button2 = createImg('cut_btn.png');
  button2.position(5,420);
  button2.size(50,50);

  //button2.Clicked(drop);
  
  //button2.mousePress(drop);
  
  //button2.mouseClick(drop);

  button2.mouseClicked(drop);

  ellipseMode(RADIUS);


  button3 = createImg('cut_btn.png');
  button3.position(90,220);
  button3.size(50,50);
  button3.mouseClicked(drop3);
}

function draw() 
{
  

  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();
  rope3.show();

  if(collide(fruit,bunny,80)==true)
  {

    eating_sound.play();
     // remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit=null;


    bunny.changeAnimation('eating');
    
  

  
  }
  
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }


    
  
    

  drawSprites();

}

function drop()
{
  cut_sound.play();
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function remove_rope()
{
  
  rope.break();
  con.dettach();
  con= null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function drop2(){
  cut_sound.play();
  rope.break();
  con.dettach();
  con = null; 

}

function drop3(){
  cut_sound.play();
  rope3.break();
  con3.dettach();
  con3 = null; 

}

