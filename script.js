let total=0
let cards= []
const startEl=document.querySelector("#startEl")
const amountEl=document.querySelector(".amount-bet")
const cardsEl= document.querySelector("#cardsEl")
const sumEl= document.querySelector("#sumEl")
const msgEl= document.querySelector("#msgEl")
const newCard= document.querySelector("#newcardEl")
const user= document.querySelector("#user")
const amountBtn= document.querySelectorAll(".btn")
const div= document.querySelector("div")
let isAlive= false;
let hasBlackJack= false;
let message= ""
let theBet= 0
const users= {
    name: "User", 
    cash: 500
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

amountBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
    console.log(e.target.value)
    theBet = e.target.value
     amountEl.textContent = "$ " + theBet;
    })
}) 
   
startEl.addEventListener("click", ()=> {
    let firstCard= randomCard();
    let secondCard= randomCard();
    cards=[firstCard, secondCard]   
    total= firstCard + secondCard;
    renderGame()
  })

function renderGame() {  
     cardsEl.textContent = "Cards: ";
     for(let i=0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
     }
     sumEl.textContent = "total: " + total 

    if(total === 21) {
        message= "You got the black jack!"
        let bet= users.cash += theBet * .98;
        const newBet= bet.toFixed(2)
        user.textContent = `User: $ ${newBet}` 
        theBet= 0;
        amountEl.textContent = "$ 0";  
         isAlive= true;
        hasBlackJack= true;

  } else if(total > 21) {
        message= "Sorry, you lose. Bet and start again."
        let bet= users.cash -= theBet
        const newBet= bet.toFixed(2)
        user.textContent = `User: $ ${newBet}`     
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
        renderGame()
    }   
})

