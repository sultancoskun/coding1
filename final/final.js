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


const gridDisplay = document.querySelector('#grid'); //It saves id in variably.
const cardsFlipped = []; //It saves the empty array.
let cardsMatched = 0; //It starts with 0 and It follows the number of matched card.


function createBoard() { //It creates game board by each card in the cardArray
  resizeGrid();
  startTimer();



  cardArray.forEach((card) => { //It gives a name and click button for every card
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

function restartGame() {

  stopTimer();

  gridDisplay.innerHTML = '';
  cardsFlipped.length = 0;
  cardsMatched = 0;
  document.querySelector('#score-number').innerText = `${cardsMatched}`;
  createBoard();
}


function shuffleCards() {  //IT makes random card
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function flipCard() { //When click the card,it works. It controls the card that flipped and If 2 card flipped, It obstructs click another cards. 
  if (!this.classList.contains('flipped') && cardsFlipped.length < 2) {
    this.classList.add('flipped');
    const imgElement = this.querySelector('img');
    const cardName = this.getAttribute('data-name');
    imgElement.src = `images/${cardName}.jpeg`;
    cardsFlipped.push(this);
    if (cardsFlipped.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() { //It controls the card. If cards id is same, they hidden and score's number changes. If cards id is different, It flipped back.
  const card1 = cardsFlipped[0];
  const card2 = cardsFlipped[1];
  const cardName1 = card1.getAttribute('data-name');
  const cardName2 = card2.getAttribute('data-name');
  
  if (cardName1 === cardName2) {
    card1.style.visibility = 'hidden';
    card2.style.visibility = 'hidden';
    cardsMatched++;
    document.querySelector('#score-number').innerText = `${cardsMatched}`;

    if (cardsMatched === cardArray.length) {
    stopTimer();
      }


  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    const imgElements = document.querySelectorAll('.card img');
    imgElements.forEach((imgElement) => {
      imgElement.src = 'images/pati.png';
    });
  }
  
  cardsFlipped.length = 0;
}

let timer = 0;
let timerInterval;


function startTimer() {
timer = 0;
timerInterval = setInterval(function() {
  timer++;
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  document.querySelector('#timer-number').innerText = ` ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);
}

function stopTimer() {
clearInterval(timerInterval);
}


function adjustCardSize() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const cardStyle = window.getComputedStyle(card);
    card.style.height = cardStyle.width;
  });
}

window.addEventListener('resize', adjustCardSize);
window.addEventListener('DOMContentLoaded', adjustCardSize);



function resizeGrid() {
  const grid = document.getElementById('grid');
  const body = document.getElementById('body');
  const gridSize = Math.min(body.clientWidth, body.clientHeight);
  const cardSize = gridSize / 10;
  
  grid.style.gridTemplateColumns = `repeat(8, ${cardSize}px)`;
  grid.style.gridTemplateRows = `repeat(5, ${cardSize}px)`;

  grid.style.width = `${cardSize * 8}px`; // set grid width
  grid.style.height = `${cardSize * 5}px`; // set grid height
}

// They arrange screens which is changeable

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






createBoard();