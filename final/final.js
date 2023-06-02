const cardArray = [
    { name: 'cat1', img: 'images/cat1.jpg' },
    { name: 'cat2', img: 'images/cat2.jpg' },
    { name: 'cat3', img: 'images/cat3.jpg' },
    { name: 'cat4', img: 'images/cat4.jpg' },
    { name: 'cat5', img: 'images/cat5.jpg' },
    { name: 'cat6', img: 'images/cat6.jpg' },
    { name: 'cat7', img: 'images/cat7.jpg' },
    { name: 'cat8', img: 'images/cat8.jpg' },
    { name: 'cat9', img: 'images/cat9.jpg' },
    { name: 'cat10', img: 'images/cat10.jpg' },
    { name: 'cat11', img: 'images/cat11.jpg' },
    { name: 'cat12', img: 'images/cat12.jpg' },
    { name: 'cat13', img: 'images/cat13.jpg' },
    { name: 'cat14', img: 'images/cat14.jpg' },
    { name: 'cat15', img: 'images/cat15.jpg' },
    { name: 'cat16', img: 'images/cat16.jpg' },
    { name: 'cat17', img: 'images/cat17.jpg' },
    { name: 'cat18', img: 'images/cat18.jpg' },
    { name: 'cat19', img: 'images/cat19.jpg' },
    { name: 'cat20', img: 'images/cat20.jpg' }
  ];
  
  const gridDisplay = document.querySelector('#grid');
  const cardsFlipped = [];
  let cardsMatched = 0;
  
  function createBoard() {
    cardArray.forEach((card) => {
      for (let i = 0; i < 2; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `<img src="images/grid.jpg" alt="Card">`;
        cardElement.addEventListener('click', flipCard);
        gridDisplay.appendChild(cardElement);
      }
    });
    shuffleCards();
  }
  
  function shuffleCards() {
    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card) => {
      const randomPos = Math.floor(Math.random() * cards.length);
      card.style.order = randomPos;
    });
  }
  
  function flipCard() {
    if (!this.classList.contains('flipped') && cardsFlipped.length < 2) {
      this.classList.add('flipped');
      const imgElement = this.querySelector('img');
      const cardName = this.getAttribute('data-name');
      imgElement.src = `images/${cardName}.jpg`;
      cardsFlipped.push(this);
      if (cardsFlipped.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }
  
  function checkMatch() {
    const card1 = cardsFlipped[0];
    const card2 = cardsFlipped[1];
    const cardName1 = card1.getAttribute('data-name');
    const cardName2 = card2.getAttribute('data-name');
  
    if (cardName1 === cardName2) {
      card1.style.visibility = 'hidden';
      card2.style.visibility = 'hidden';

    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      const imgElements = document.querySelectorAll('.card img');
      imgElements.forEach((imgElement) => {
        imgElement.src = 'images/grid.jpg';
      });
    }
  
    cardsFlipped.length = 0;
  }
  
  
  createBoard();