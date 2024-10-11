let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let message = document.querySelector(".msg")

let turnO = true;
let count = 0;

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            box.classList.add("o-color");
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.classList.add("x-color");
            turnO = true;
        }
        box.disabled = true;

        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
});


const gameDraw = () => {
    message.innerText = "Game was Draw!";
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
    
}

const disableBoxes = () => {
   for(let box of boxes){
    box.disabled = true;
   }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-color", "x-color");
    }
}

const showWinner = (winner) => {
    message.innerText = `Congratulations! Winner Is ${winner}`;
    messageContainer.classList.remove("hide"); 
    disableBoxes();

};

const checkWinner = () => {
    for(let pattern of winPattern){
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;
        
        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
               showWinner(posVal1);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);