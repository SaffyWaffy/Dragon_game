   //constants
var canvas_width = 800;
var canvas_height = 600;
var dragon_width = 64;
var dragon_height = 160;
var ground_Y = 500;
var dragonYSpeed = 1;
var spacebar_code = 32;
var rightArrow_code = 68;
var leftArrow_code = 65;
var eKeyCode = 69;
var dragonJumpSpeed = 15;
var dragonXspeed = 0;
var background_width = 898;
var dragonFramesInSprite = 3;
var dragonAnimationFrames = 2;
var animationSpeed = 20;



//bulshit



//setings
var cameraX = 0;
var cameraY = 0;

var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = canvas_width;
canvas.height = canvas_height;
document.body.appendChild(canvas);

var rock = new Image();
rock.src = 'rock.png';

var shopSign = new Image();
shopSign.src = 'shop_sign.png';

var dragonPicture = new Image();
dragonPicture.src = 'AdultGreenDragonSprite.png';

var flyingDragon = new Image();
flyingDragon.src ='GreenDragonWingsOpen.png';

var flyingDragonLeft = new Image();
flyingDragonLeft.src = 'GreenDragonWingsOpenLeft.png';

var dragonPictureLeft = new Image();
dragonPictureLeft.src = 'AdultGreenDragonSpriteLeft.png';

var background = new Image();
background.src = 'background.png';

var dragonDisplayed = dragonPicture;

var dragonX = canvas_width / 2;
var dragonY = ground_Y - dragon_height;
var dragonYspeed = 0;
var dragonIsInTheSky = false;
var spacbarIsPressed = false;
var rightArrowKeyPressed = false;
var leftArrowKeyPressed = false;
var dragonFrameNr = 0;
var fpsCounter = 0;
var keyCodeIsPressed = 1;
var rockData=[{x:60,
y:130,
Image:rock},{
x:760,
y:130,
Image:rock},{
x:360,
y:130,
Image:rock
}];  


var dragonSpriteSheath ={
dragonFramesInSprite:2,
spriteWidth:dragon_width,
spriteHeight: dragon_height,
Image:dragonDisplayed
};




// switch case parameters
var switchDrawing = 1;





//attaches an event handler to an element without overwriting existing event handlers
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup',onKeyUp);
window.addEventListener('load', start);

function start(){
window.requestAnimationFrame(hoofdLus);
}



//main loop
function hoofdLus(){
update();
draw();
window.requestAnimationFrame(hoofdLus);
}




//gamer movement
function onKeyDown(event){

//when you press space turns var to true
if (event.keyCode === spacebar_code){ 
spacbarIsPressed = true;
}

//when you press right key turns true
if (event.keyCode === rightArrow_code){
rightArrowKeyPressed = true;  
}

//when press left key return true
if (event.keyCode === leftArrow_code){
leftArrowKeyPressed = true;
}

if (event.keyCode === eKeyCode){
keyCodeIsPressed++
}

}
function onKeyUp(event){

//when release spacebar returns false
if (event.keyCode === spacebar_code){
spacbarIsPressed = false;
}

//when release right arrow key returns false
if (event.keyCode === rightArrow_code){
rightArrowKeyPressed = false;
}

//when release arrow key left return false
if (event.keyCode === leftArrow_code){
leftArrowKeyPressed = false;
}

if (event.keyCode === eKeyCode){

}

}






//updates
function update(){
fpsCounter = fpsCounter + 1;


// this again idk
dragonX = dragonX + dragonXspeed;



if (keyCodeIsPressed == 2){
switchDrawing = 2;
}
if (keyCodeIsPressed == 3){
switchDrawing = 1;
keyCodeIsPressed = 1;
}







// checks if spacebar is pressed
if (spacbarIsPressed &&! dragonIsInTheSky){
dragonYspeed = -dragonJumpSpeed;
dragonIsInTheSky = true
}


//idk
dragonY = dragonY + dragonYspeed;

//something
dragonYspeed = dragonYspeed + dragonYSpeed;

//if dragon height is higher then gound level minus the dragon height
//then dragon y is equal to ground minus dragon height yea idfk what the hell this means
if (dragonY > (ground_Y - dragon_height)){
dragonY = ground_Y - dragon_height;
dragonYspeed = 0;
dragonIsInTheSky = false;
}

//changes the dragon png based on if the dragon is jumping
if (dragonIsInTheSky === true){
dragonDisplayed = flyingDragon;
}else{
dragonDisplayed = dragonPicture;
}


//movement with arrows
// when arrow key pressed changes speed to 5
if (rightArrowKeyPressed === true&&dragonIsInTheSky===true){
dragonXspeed = 400;dragonDisplayed = flyingDragon;}
else if (rightArrowKeyPressed === true){
dragonXspeed = 3;
dragonDisplayed=dragonPicture;
}


//when arrow left speed -5 aka backwards
else if (leftArrowKeyPressed===true&&dragonIsInTheSky===true){
dragonXspeed = -5
dragonDisplayed = flyingDragonLeft;
}
else if (leftArrowKeyPressed === true){
dragonXspeed = -3
dragonDisplayed = dragonPictureLeft;
}
else{
dragonXspeed = 0;
}



//places the dragon appropriately
cameraX = dragonX - 150;
if((fpsCounter&animationSpeed)=== 0){
dragonFrameNr = dragonFrameNr+1;
if (dragonFrameNr>=dragonAnimationFrames){
dragonFrameNr=0;
}
}

for (var i=0;i<rockData.length;i++){
if((rockData[i].x-cameraX)<-canvas_width){
rockData[i].x+=(750+canvas_width)+150;
}
}
}

//drawing
function draw(){


switch(switchDrawing){






case 1:
// makes regular background blue
c.fillStyle = 'lightskyblue';
c.fillRect(0,0,canvas_width,ground_Y- 40);

//generates background with camera
var backgroundX = - (cameraX % background_width);
c.drawImage(background, backgroundX, 0);
c.drawImage(background,backgroundX + background_width, 0);
c.drawImage(background,0 - cameraX,0);  
//backgroundCounter + 1;

//this ^ code generates the background implement a counter so that you can make stuff




//draws rocks
for(var i=0; i<rockData.length;i++){
c.drawImage(rockData[i].Image,rockData[i].x-
cameraX,ground_Y-rockData[i].y-cameraY);
}


//draws the dragon
var dragonSpriteSheathLine = Math.floor(dragonFrameNr/dragonFramesInSprite);
var dragonSpriteSheathColumn = dragonFrameNr % dragonFramesInSprite;
var dragongSheathX = dragonSpriteSheathColumn * dragon_width;
var dragonSheathY = dragonSpriteSheathLine * dragon_height;

if(dragonIsInTheSky===false){
c.drawImage(dragonDisplayed,dragongSheathX,dragonSheathY,
dragon_width,dragon_height,dragonX-cameraX,dragonY-cameraY,dragon_width,dragon_height)}
else{
c.drawImage(dragonDisplayed,dragonX-cameraX,dragonY-cameraY);}

function drawAnimatedSprites(sreenX,screenY,frameNr, spriteSheath){
var SpriteSheathLine = Math.floor(dragonFrameNr/dragonFramesInSprite);
var SpriteSheathColumn = dragonFrameNr % dragonFramesInSprite;
var spriteSheathX = dragonSpriteSheathColumn * dragon_width;
var spriteSheathY = dragonSpriteSheathLine * dragon_height;



}


break;


case 2:
c.fillStyle = 'lightskyblue';
c.fillRect(0,0,canvas_width,ground_Y- 40);

c.drawImage(shopSign,255,0);





}


}