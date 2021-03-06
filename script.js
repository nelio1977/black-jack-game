
let total=0
let cards= []
const startEl=document.querySelector("#startEl")
const amountEl=document.querySelector(".amount-bet")
const cardsEl= document.querySelector("#cardsEl")
const sumEl= document.querySelector("#sumEl")
const betMsg= document.querySelector("#betMsg")
const msgEl= document.querySelector("#msgEl")
const newCard= document.querySelector("#newcardEl")
const user= document.querySelector("#user")
const amountBtn= document.querySelectorAll(".btn")
const div= document.querySelector("div")
let isAlive= false;
let hasBlackJack= false;
let msg= ""
let message= ""
let theBet= 0
const users= {
    name: "User Credits", 
    cash: 30
}
user.textContent= users.name + ":  $ " + users.cash;

const btns= div.getElementsByClassName("btn")
for(let i=0; i<btns.length; i++) {
    btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active")
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

function randomCard() {
    let randomNumber= Math.floor(Math.random() * 13) + 1; 
    if(randomNumber > 11) {
        return 10;
    }else {
        return randomNumber;  
    }  
}

function checkBet() {
    if(users.cash < theBet) {
         msg= "Sorry, not enough credits to play"; 
         theBet= 0;        
       } else if (users.cash >= theBet) {
         betMsg.textContent= "";
         amountEl.textContent= " $ " + theBet
         return theBet;            
       } 
       betMsg.textContent= msg;
       msgEl.textContent= "";
}

amountBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
       theBet = e.target.value;
       checkBet()
    })     
}) 
   
startEl.addEventListener("click", ()=> {
    if(checkBet()) {
        let firstCard= randomCard();
        let secondCard= randomCard();
        cards=[firstCard, secondCard]    
        total= firstCard + secondCard;
        renderGame()
    } 
  })

function renderGame() {  
    let cardsMsg= ""
     cardsEl.textContent = "Cards: ";
     for(let i=0; i < cards.length; i++) {
       cardsMsg += cards[i] + " ";
     }
     cardsEl.textContent += cardsMsg
     sumEl.textContent = "total: " + total 

    if(total === 21) {
        message= "You got the black jack!"
        let bet= users.cash += theBet * .98;
        const newBet= bet.toFixed(2)
        user.textContent = `User Credits: $ ${newBet}` 
        theBet= 0;
        amountEl.textContent = "$ 0";  
         isAlive= true;
        hasBlackJack= true;

  } else if(total > 21) {
        message= "Sorry, you lose. Bet and start again."
        let bet= users.cash -= theBet
        const newBet= bet.toFixed(2)
        user.textContent = `User Credits: $ ${newBet}`     
        theBet= 0;
        amountEl.textContent = "$ 0";
         isAlive= false;
        hasBlackJack= false;

  } else if(total < 21) {
        message= "Want to draw a new card?"
        isAlive= true;
        hasBlackJack=false
  }
  msgEl.textContent= message;
}

newCard.addEventListener("click", () => {
    if(!hasBlackJack && isAlive) {
        let newCard= randomCard();  
        cards.push(newCard)
        total += newCard; 
        checkBet()
        renderGame()
    }   
})

