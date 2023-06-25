
//It gives a name property and img property for each object.

const cardArray = [
  { name: 'cat1', img: 'images/cat1.jpeg' },
  { name: 'cat2', img: 'images/cat2.jpeg' },
  { name: 'cat3', img: 'images/cat3.jpeg' },
  { name: 'cat4', img: 'images/cat4.jpeg' },
  { name: 'cat5', img: 'images/cat5.jpeg' },
  { name: 'cat6', img: 'images/cat6.jpeg' },
  { name: 'cat7', img: 'images/cat7.jpeg' },
  { name: 'cat8', img: 'images/cat8.jpeg' },
  { name: 'cat9', img: 'images/cat9.jpeg' },
  { name: 'cat10', img: 'images/cat10.jpeg' },
  { name: 'cat11', img: 'images/cat11.jpeg' },
  { name: 'cat12', img: 'images/cat12.jpeg' },
  { name: 'cat13', img: 'images/cat13.jpeg' },
  { name: 'cat14', img: 'images/cat14.jpeg' },
  { name: 'cat15', img: 'images/cat15.jpeg' },
  { name: 'cat16', img: 'images/cat16.jpeg' },
  { name: 'cat17', img: 'images/cat17.jpeg' },
  { name: 'cat18', img: 'images/cat18.jpeg' },
  { name: 'cat19', img: 'images/cat19.jpeg' },
  { name: 'cat20', img: 'images/cat20.jpeg' }
];

//It helps to prevent clicking on other cards while the match is being checked.

let isChecking = false;

const gridDisplay = document.querySelector('#grid'); //It saves id in variably.
const cardsFlipped = []; //It saves the empty array.
let cardsMatched = 0; //It starts with 0 and It follows the number of matched card.


//It calls the restartGame function when the button is clicked.

document.querySelector('#restart-button').addEventListener('click', restartGame);


//It creates game board by each card in the cardArray

function createBoard() { 
  resizeGrid();
  startTimer();


//It gives a name and click button for every card

  cardArray.forEach((card) => { 
    for (let i = 0; i < 2; i++) {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.setAttribute('data-name', card.name);
      cardElement.innerHTML = `<img src="images/pati.png" alt="Card">`;
      cardElement.addEventListener('click', flipCard);
      gridDisplay.appendChild(cardElement);
    }
  });
  shuffleCards(); //It helps to make random card
}

document.querySelector('#restart-button').addEventListener('click', restartGame);


//It restarts the game when we call.

function restartGame() {
  stopTimer();

  const winScreenElement = document.querySelector('#win-screen');
  winScreenElement.classList.add('hidden');

  gridDisplay.innerHTML = '';
  cardsFlipped.length = 0;
  cardsMatched = 0;
  document.querySelector('#score-number').innerText = `Score: ${cardsMatched}`;
  createBoard();
  
  isChecking = false; // Reset the isChecking variable to false
}


//It makes random card

function shuffleCards() {  
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}



//When click the card,it works. It controls the card that flipped.
//If 2 card flipped, It obstructs click another cards. 

function flipCard() { 
  if (isChecking) return;

  if (!this.classList.contains('flipped') && cardsFlipped.length < 2) {
    this.classList.add('flipped');
    const imgElement = this.querySelector('img');
    const cardName = this.getAttribute('data-name');
    imgElement.src = `images/${cardName}.jpeg`;
    cardsFlipped.push(this);
    this.classList.add('flipped');
    if (cardsFlipped.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}



//It checks if the flipped cards match.
//It updates the score, and handles the case when all cards are matched.

function checkMatch() {
  
  isChecking = true; // A match is currently being checked

  const card1 = cardsFlipped[0];
  const card2 = cardsFlipped[1];
  const cardName1 = card1.getAttribute('data-name');
  const cardName2 = card2.getAttribute('data-name');

  if (cardName1 === cardName2) {
    card1.classList.add('matched');
    card2.classList.add('matched');

    // Hide the cards after the animation ends

    card1.addEventListener('animationend', () => {
      card1.style.visibility = 'hidden';
    });
    card2.addEventListener('animationend', () => {
      card2.style.visibility = 'hidden';
    });

    cardsMatched++;
    document.querySelector('#score-number').innerText = `Score: ${cardsMatched}`;

    if (cardsMatched === cardArray.length) {
      winScreen();
      return;
    }
    
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      const imgElements = document.querySelectorAll('.card img');
      imgElements.forEach((imgElement) => {
        imgElement.src = 'images/pati.png';
      });
    }, 500);
  }

  cardsFlipped.length = 0;
  setTimeout(() => { isChecking = false; }, 500); // Allow cards to be flipped again after check is done

}


let timer = 0;
let timerInterval;


//It starts the timer. It start at "0".

function startTimer() {
timer = 0;
timerInterval = setInterval(function() {
  timer++;
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  document.querySelector('#timer-number').innerText = ` ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);
}


//It stops the timer

function stopTimer() {
clearInterval(timerInterval);
}


// They arrange screens which is changeable

function adjustCardSize() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const cardStyle = window.getComputedStyle(card);
    card.style.height = cardStyle.width;
  });
}

window.addEventListener('resize', adjustCardSize);
window.addEventListener('DOMContentLoaded', adjustCardSize);


//It calculates the appropriate card size based on the minimum value of the client width and height of the body element. 
//The grid is set to have 8 columns and 5 rows using the calculated cardSize, and the width and height of the grid element are set accordingly.

function resizeGrid() {
  const grid = document.getElementById('grid');
  const body = document.getElementById('body');
  const gridSize = Math.min(body.clientWidth, body.clientHeight);
  const cardSize = gridSize / 10;
  
  grid.style.gridTemplateColumns = `repeat(8, ${cardSize}px)`;
  grid.style.gridTemplateRows = `repeat(5, ${cardSize}px)`;

  grid.style.width = `${cardSize * 8}px`; 
  grid.style.height = `${cardSize * 5}px`; 
}


//When the window is resized the resizeGrid function is called to adjust the grid size.

window.addEventListener('resize', resizeGrid);
window.addEventListener('DOMContentLoaded', resizeGrid);

window.addEventListener('resize', function() {
  resizeGrid();
  adjustCardSize();
});

window.addEventListener('fullscreenchange', function() {
  resizeGrid();
  adjustCardSize();
});


//It works when all cards are matched. 
//It stops the timer, updates the final score and time on the win screen

function winScreen() {
  stopTimer();

  const finalScoreElement = document.querySelector('#final-score');
  finalScoreElement.textContent = cardsMatched;

  const finalTimeElement = document.querySelector('#final-time');
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  finalTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const winScreenElement = document.querySelector('#win-screen');
  winScreenElement.classList.remove('hidden');
}


const playAgainButton = document.querySelector('#play-again-button');
playAgainButton.addEventListener('click', restartGame);



createBoard();