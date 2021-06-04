//Create variables here
var dog , dogImg1, dogImg2;
var database , foodS , foodStock;

function preload(){
	//load images here
  dogImg1 = loadImage("images/dogImg1.png");
  dogImg2 = loadImage("images/dogImg2.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  foodS = database.ref('food/stockLeft');
  foodS.on("value", readStock, showError);
  
  dog = createSprite(400,350,20,20);
  dog.addImage("abc" , dogImg1);
  dog.scale = 0.235;
  
}

function draw() { 
  background(46,139,87);
  textSize(20)
  fill("red")
  text("STOCK LEFT : "+ foodStock, 150,50);

  textSize(20)
  fill(255);
  text("NOTE : Press the UP ARROW KEY to feed the dog", 10,20)

  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("abc", dogImg2)
  }

}

function readStock(data){
  foodStock = data.val();
}

function writeStock(){
  database.ref('/').update({
     
    'stockLeft' : foodStock
  })

  if(foodStock<=0){
    foodStock = 0;
  } else{
    foodStock = foodStock-1;
  }
  
}

function showError(){
  console.log("showError");
}

