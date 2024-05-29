var snakePosition = [252, 250, 250];
var gameStart = false;
var direction = 1;
var boxes = document.querySelectorAll(".box");
var newHead = 1;
var removed
var speed = 200
var lives = document.querySelector('#lives')
var points = document.querySelector('#points')
var snakeLength = 3;
var flashInterval;
let amount = 0;
let flashCount;

var startPoints = 0;
var startLives = 3;

document.addEventListener('click', function () {
    if (!gameStart){
        gameStart = true;
        startSnake();
    }
})

function startSnake(){
  snakePosition.forEach(element => {
    boxes[element].classList.add("snake")
   });
   randomApple()
   snakeSpeed()
  
};

function snakeSpeed(){
  speed -= 15
  intervalId = setInterval(function(){snakeAnimation()}, speed);  
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
      direction = -1;
    } else if (event.keyCode == 38) {
      direction = -30;
    } else if (event.keyCode == 39) {
      direction = 1;
    } else if (event.keyCode == 40) {
      direction = 30
    }
})

function snakeAnimation(){

  newHead = snakePosition[0] + direction;
  
  if (snakePosition[0] % 30 == 0 && direction == -1) {
    collusion()
  } else if (snakePosition[0] % 30 == 0 && direction == 1 && snakePosition[0] != 0) {
   collusion()
  } else if (snakePosition[0] <= 29 && direction == -30) {
   collusion()
  }  else if(snakePosition[0] >= 570  && direction == 30) {
   collusion()
  } else if(boxes[snakePosition[0] + direction].classList.contains('snake')){
   collusion()
  }
  
  

  function collusion(){
    lives.classList.add('hit')
    setTimeout(function(){
      lives.classList.remove('hit')
     }, 500)
    startLives -= 1;
    if (startLives == 0) {
      clearInterval(intervalId)
      alert("Game Over")
    } else if (startLives == 2) {
      clearInterval(intervalId)
      snakeSpeed()
    } else if (startLives == 1) {
      clearInterval(intervalId)
      snakeSpeed()
    }
    lives.innerHTML = "Lives: " + startLives
    snakePosition.forEach(element => {
      boxes[element].classList.remove('snake')
    });
    snakePosition = []
    newHead = 250
    console.log(snakePosition)
    for (let index = 250; index < 250 + snakeLength; index++) {
      snakePosition.unshift(index)
    }
    snakePosition.forEach(element => {
      boxes[element].classList.add('snake')
    })
     flashCount = setInterval(flash, 200)
    console.log(snakePosition) 
  }
   

  function flash() {
    amount++

    snakePosition.forEach(element => {
      if (boxes[element].classList.contains('snake')) {
        boxes[element].classList.remove('snake')
      } else {
        boxes[element].classList.add('snake')
      }
      })
      }
     
      if (amount >= 10) {
        clearInterval(flashCount)
      }
    

   snakePosition.unshift(newHead); 
   removed = snakePosition.pop();
   boxes[newHead].classList.add("snake")
   boxes[removed].classList.remove("snake");

   if(boxes[newHead].classList.contains("apple")){
    snakePosition.push(removed);
    console.log("have apple");
    boxes[newHead].classList.remove("apple");
    randomApple();
    clearInterval(intervalId);
    snakeSpeed();
    snakeLength++
    console.log(snakeLength)
    startPoints += 1;
    points.innerHTML = 'Points: ' + startPoints;
   }
  
}
function randomApple(){
  var number = Math.floor(Math.random() * 600);
  boxes[number].classList.add("apple");
}