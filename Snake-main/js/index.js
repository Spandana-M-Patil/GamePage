let inputDir ={ x:0 , y: 0};
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{x : 15, y : 13}]
let score = 0;
food = {x: 10, y : 10};

//get scorebox and hiscorebox elements
const scoreBox = document.getElementById('scoreBox');
const hiscoreBox = document.getElementById('hiscoreBox');


//game function
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    // call game engine to update game state
    gameEngine();
    
}

// check if the snake collides with itself or the boundaries
function isCollide(snake){
    //check for self-collision
    for( let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // check for wall collision
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
    
    }
    return false;
}


// game engine to update the state and render
function gameEngine(){
    //updating the snake array
    // check for collisions
    if(isCollide(snakeArr)){
        //soundplaygameover
        //soundpausemusic
        inputDir = {x: 0, y:0};
        alert("Game over. press any key to play again!");
        snakeArr = [{x:15, y:13}];
        //soundmusic
        score = 0;
        return;
    }

    //if you  have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        // add a new segment to the snake at the head's current position plus the direction
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y +inputDir.y});

        //foodsound
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HiScore: " +hiscoreval; 
       
        }
        scoreBox.innerHTML = "Score: " +score;
        // define the grid boundaries(adjust based on your grid size)
        // regenerate food position
        let a = 2;  // minimum value for the grid position
        let b = 16;  // maximum value for the grid position

        // regenertae the food at a random position within the grid boundaries
       
        food = {
            x: Math.round(a +(b-a)* Math.random()),  // random x position between a and b
            y: Math.round(a+(b-a)* Math.random())   // random y position between a and b
        };
        //score++;  // increment score if needed
    }

    //moving the snake
    for(let i = snakeArr.length - 2; i>=0; i--){
        
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    // select the board element if its not already selected globally
    const board = document.getElementById('board');

    //clear the board before rendering the new state
    board.innerHTML = "";

    //display the snake
    snakeArr.forEach((e,index) => {
        const snakeElement = document.createElement('div');  //create a new div element for each part of the snake
        snakeElement.style.gridRowStart = e.y;   // position the element in the correct row
        snakeElement.style.gridColumnStart = e.x;  // position the element in the correct column

        // add the appropriate class to the snake segment
        if(index === 0){  // assuming the first element is the head of the snake
            snakeElement.classList.add('head');  //optional1: add a speacial class for the head
        }
        else{
            snakeElement.classList.add('snake');  // add the snake class for the body segments
        }
        board.appendChild(snakeElement);  // append the snake segment to the board
    });


    //display the food
    const foodElement = document.createElement('div');// create a div for the food
    foodElement.style.gridRowStart= food.y;// position the food in the correct row
    foodElement.style.gridColumnStart= food.x;// position the food in the correct column
    foodElement.classList.add('food')// add the food class for styling
    board.appendChild(foodElement);// append the food element to the board
}


// main logic stars here
let hiscore = localStorage.getItem("hiscore");
    if(hiscore === null){
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
    }
    else{
        hiscoreval = JSON.parse(hiscore);
        hiscoreBox.innerHTML = "HiScore: " +hiscoreval;
    }



window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} //start the game by clicking any button
    //sound
    switch (e.key){
            case "ArrowUp":
                console.log("ArrowUp")
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                console.log("ArrowDown")
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                console.log("ArrowLeft")
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                console.log("ArrowRight")
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
    }
});
