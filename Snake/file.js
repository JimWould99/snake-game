var snakePosition = [0, 1, 2];
var gameStart = false;
var direction = 1;
var boxes = document.querySelectorAll(".box");
var newHead;
var removed
var speed = 225

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
      direction = -10;
    } else if (event.keyCode == 39) {
      direction = 1;
    } else if (event.keyCode == 40) {
      direction = 10
    }
})

function snakeAnimation(){

  if (snakePosition[0] % 10 == 0 && direction == -1) {
    clearInterval(intervalId);
    alert("Game Over");
  } else if ((snakePosition[0]-9 ) % 10 == 0 && direction == 1) {
   clearInterval(intervalId);
   alert("Game Over");
  } else if (snakePosition[0] <= 9 && direction == -10) {
   clearInterval(intervalId);
   alert("Game Over")
  } else if(snakePosition[0] >= 90  && direction == 10) {
   clearInterval(intervalId);
   alert("Game Over");
  };

   newHead = snakePosition[0] + direction;
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
   }


   console.log(snakePosition)

};

function randomApple(){
  var number = Math.floor(Math.random() * 100);
  boxes[number].classList.add("apple");
}