var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
 cvs.width=600;
 cvs.height=600;
var snakeSize = 20;
var gridX = cvs.width/snakeSize;
var gridY = cvs.height/snakeSize;
var length = 0;
var snakeBody = [];
var dire = 2;
var food = {};
var score = 0;

function init(){//初始化
  snakeBody = [];
  length = 0;
  dire = 2;
  for(var i=0; i<3; i++){
    createSnakeNode(parseInt(gridX/2)+i, parseInt(gridY/2));
  }
  drawSnake();
  putFood();
}
init();

function createSnakeNode(x, y){//创建蛇身
  snakeBody.push({x:x, y:y, color: length===0 ? '#f00' : '#000'});
  length += 1;
  score += 1;
  document.getElementById('score').innerText = '得分：' + (parseInt(length)-3);

}

function drawSnake(){//描绘蛇
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for(var i=0; i<snakeBody.length; i++){
    drawRect(snakeBody[i])
  }
   drawRect(food);
}

function drawRect(snakeNode){//画点
  ctx.beginPath();
  ctx.fillStyle = snakeNode.color;
  ctx.fillRect(snakeNode.x * snakeSize, snakeNode.y * snakeSize, snakeSize, snakeSize);
  ctx.closePath();
}

function snakeMove(){//操作
  var newHand = {x:snakeBody[0].x, y:snakeBody[0].y, color:snakeBody[0].color};//下一个点
  if(dire === 1) newHand.y -= 1;
  if(dire === -1) newHand.y += 1;
  if(dire === 2) newHand.x -= 1;
  if(dire === -2) newHand.x += 1;

  for(var i=snakeBody.length-1; i>0; i--){
      snakeBody[i].x = snakeBody[i-1].x;
      snakeBody[i].y = snakeBody[i-1].y;
    if(snakeBody[i].x === newHand.x && snakeBody[i].y === newHand.y){
        gameover();
        return;
    } 
  }
  snakeBody[0] = newHand;
  isGetFood(newHand);
  if(snakeBody.length > 7) gamewin();
  cheackOufOfBorder(snakeBody[0]);
}
function isGetFood(node){//获取食物
    if(node.x === food.x && node.y === food.y){
        putFood();
        //snakeBody.push({x:snakeBody[snakeBody.length-1].x, y:snakeBody[snakeBody.length-1].y, color:snakeBody[snakeBody.length-1].color,})
        createSnakeNode(snakeBody[snakeBody.length-1].x,snakeBody[snakeBody.length-1].y)
    }
}
function cheackOufOfBorder(node){//边界问题
    if(node.x<0 || node.x>gridX-1 || node.y<0 || node.y>gridY-1) gameover();
}
function gameover(){
    alert('Your Losed')
    window.clearInterval(timerId)
    init(); 
}
function gamewin(){
    alert('Your Winner')
    window.clearInterval(timerId)
}
document.onkeydown=(e)=>{
  e.preventDefault();
  if(e.keyCode === 38) setDirection(1); //上
  if(e.keyCode === 40) setDirection(-1); //下
  if(e.keyCode === 37) setDirection(2); //左
  if(e.keyCode === 39) setDirection(-2); //右
}

function setDirection(dir){//不能反方向操作
  if(Math.abs(dir) === Math.abs(dire)) return;
  dire =dir;
}
var timerId = setInterval(()=>{
  snakeMove();
  drawSnake();
},200)

function putFood(){//放置食物
  var flag = 1;
  while(1){
    flag = 1;
    var foodX = parseInt(Math.random()*gridX - 1);
    var foodY = parseInt(Math.random()*gridY - 1);
    for(var i=0; i<snakeBody.length; i++){
      if(foodX === snakeBody[i].x && foodY === snakeBody[i].y) flag = 0;
    }
    if(flag) break;
  }
  food = {x:foodX, y:foodY, color:'#ccc'};
}