// Arrays

const playerHand = [];
const dealerHand = [];
const deck = [];
const leftoverDeck = [];

const suits = ["clubs", "diamonds", "hearts", "spades"];

// Variables

let playerHandValue = 0;
let dealerHandValue = 0;

// Image lookup table

const cardImgs = {
    "1clubs": "imgs/ace_clubs.png",
    "2clubs": "imgs/two_clubs.png",
    "3clubs": "imgs/three_clubs.png",
    "4clubs": "imgs/four_clubs.png",
    "5clubs": "imgs/five_clubs.png",
    "6clubs": "imgs/six_clubs.png",
    "7clubs": "imgs/seven_clubs.png",
    "8clubs": "imgs/eight_clubs.png",
    "9clubs": "imgs/nine_clubs.png",
    "10clubs": "imgs/ten_clubs.png",
    "11clubs": "imgs/jack_clubs.png",
    "12clubs": "imgs/queen_clubs.png",
    "13clubs": "imgs/king_clubs.png",
    "1diamonds": "imgs/ace_diamonds.png",
    "2diamonds": "imgs/two_diamonds.png",
    "3diamonds": "imgs/three_diamonds.png",
    "4diamonds": "imgs/four_diamonds.png",
    "5diamonds": "imgs/five_diamonds.png",
    "6diamonds": "imgs/six_diamonds.png",
    "7diamonds": "imgs/seven_diamonds.png",
    "8diamonds": "imgs/eight_diamonds.png",
    "9diamonds": "imgs/nine_diamonds.png",
    "10diamonds": "imgs/ten_diamonds.png",
    "11diamonds": "imgs/jack_diamonds.png",
    "12diamonds": "imgs/queen_diamonds.png",
    "13diamonds": "imgs/king_diamonds.png",
    "1hearts": "imgs/ace_hearts.png",
    "2hearts": "imgs/two_hearts.png",
    "3hearts": "imgs/three_hearts.png",
    "4hearts": "imgs/four_hearts.png",
    "5hearts": "imgs/five_hearts.png",
    "6hearts": "imgs/six_hearts.png",
    "7hearts": "imgs/seven_hearts.png",
    "8hearts": "imgs/eight_hearts.png",
    "9hearts": "imgs/nine_hearts.png",
    "10hearts": "imgs/ten_hearts.png",
    "11hearts": "imgs/jack_hearts.png",
    "12hearts": "imgs/queen_hearts.png",
    "13hearts": "imgs/king_hearts.png",
    "1spades": "imgs/ace_spades.png",
    "2spades": "imgs/two_spades.png",
    "3spades": "imgs/three_spades.png",
    "4spades": "imgs/four_spades.png",
    "5spades": "imgs/five_spades.png",
    "6spades": "imgs/six_spades.png",
    "7spades": "imgs/seven_spades.png",
    "8spades": "imgs/eight_spades.png",
    "9spades": "imgs/nine_spades.png",
    "10spades": "imgs/ten_spades.png",
    "11spades": "imgs/jack_spades.png",
    "12spades": "imgs/queen_spades.png",
    "13spades": "imgs/king_spades.png",
}

// Card class

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

const buttonArea = document.getElementById('button-area');

// Deck handling

// Create the deck
function makeDeck() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            deck.push(new Card(j + 1, suits[i]));
        }
    }
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[deck[i], deck[j]] = [deck[j], deck[i]];
  	}
}

// Check if deck needs to be refilled and refill it
function checkDeck() {
    const deckEmpty = deck.length == 0;
    const leftoverCnt = leftoverDeck.length;

    if (deckEmpty) {
        for (let i = 0; i < leftoverCnt; i++) {
            deck.push(leftoverDeck.shift());
        }

        shuffleDeck();
    }
}

// Deal cards to player and dealer
function dealPlayerCard(cnt) {
    for (let i = 0; i < cnt; i++) {
        playerHand.push(deck[0]);
        deck.shift();
    }
}

function dealDealerCard(cnt) {
    for (let i = 0; i < cnt; i++) {
        dealerHand.push(deck[0]);
        deck.shift();
    }
}

// Send hand cards to leftovers
function resetHands() {
    const playerCardCnt = playerHand.length;
    const dealerCardCnt = dealerHand.length;

    for (let i = 0; i < playerCardCnt; i++) {
        leftoverDeck.push(playerHand.shift());
    }

    for (let i = 0; i < dealerCardCnt; i++) {
        leftoverDeck.push(dealerHand.shift());
    }
}

// Rendering

// Update table cards
function renderPlayerLastCard() {
    const tableCards = document.getElementById('player-hand');
    const cardImg = document.createElement('img');

    cardImg.src = cardImgs[playerHand[playerHand.length - 1].rank + playerHand[playerHand.length - 1].suit];

    // inline styling :yippee:
    cardImg.style.width = "7.5rem";
    cardImg.style.borderRadius = "0.5rem";
    cardImg.style.margin = "0.5rem";

    tableCards.appendChild(cardImg);
}

function renderDealerLastCard() {
    const tableCards = document.getElementById('dealer-hand');
    const cardImg = document.createElement('img');

    cardImg.src = cardImgs[dealerHand[dealerHand.length - 1].rank + dealerHand[dealerHand.length - 1].suit];

    // inline styling :yippee:
    cardImg.style.width = "7.5rem";
    cardImg.style.borderRadius = "0.5rem";
    cardImg.style.margin = "0.5rem";

    tableCards.appendChild(cardImg);
}

function flipHoleCard() {
    const cardImg = document.getElementById('dealer-hand').lastElementChild;
    cardImg.src = "imgs/back.png";
}
function unflipHoleCard() {
    const cardImg = document.getElementById('dealer-hand').lastElementChild;
    cardImg.src = cardImgs[dealerHand[dealerHand.length - 1].rank + dealerHand[dealerHand.length - 1].suit];
}

function unrenderCards() {
    document.getElementById('player-hand').innerHTML = "";
    document.getElementById('dealer-hand').innerHTML = "";
}

// Switch buttons
function showHitStandButtons() {
    const hitButton = document.createElement('button');
    const standButton = document.createElement('button');

    buttonArea.innerHTML = "";

    // Define inline styles for hit button
    hitButton.id = "hit-button";
    hitButton.innerText = "Hit!";
    hitButton.style.paddingLeft = "0.5rem";
    hitButton.style.paddingRight = "0.5rem";
    hitButton.style.paddingTop = "0.25rem";
    hitButton.style.paddingBottom = "0.25rem";
    hitButton.style.marginRight = "0.5rem";
    hitButton.style.backgroundColor = "oklch(50.5% 0.213 27.518)";
    hitButton.style.border = "2px solid oklch(70.4% 0.191 22.216)";
    hitButton.style.borderRadius = "0.375rem";
    hitButton.style.color = "oklch(88.5% 0.062 18.334)";

    // Define inline styles for stand button
    standButton.id = "stand-button";
    standButton.innerText = "Stand!";
    standButton.style.paddingLeft = "0.5rem";
    standButton.style.paddingRight = "0.5rem";
    standButton.style.paddingTop = "0.25rem";
    standButton.style.paddingBottom = "0.25rem";
    standButton.style.marginLeft = "0.5rem";
    standButton.style.backgroundColor = "oklch(48.8% 0.243 264.376)";
    standButton.style.border = "2px solid oklch(70.7% 0.165 254.624)";
    standButton.style.borderRadius = "0.375rem";
    standButton.style.color = "oklch(88.2% 0.059 254.128)";

    // Add event listeners to buttons
    hitButton.addEventListener("click", hitPlayer);
    standButton.addEventListener("click", endPlayerTurn);

    buttonArea.appendChild(hitButton);
    buttonArea.appendChild(standButton);
}

function showPlayAgainButton() {
    const playAgainButton = document.createElement('button');

    buttonArea.innerHTML = "";

    // Define inline styles for play again button
    playAgainButton.id = "again-button";
    playAgainButton.innerText = "Play again!";
    playAgainButton.style.paddingLeft = "0.5rem";
    playAgainButton.style.paddingRight = "0.5rem";
    playAgainButton.style.paddingTop = "0.25rem";
    playAgainButton.style.paddingBottom = "0.25rem";
    playAgainButton.style.backgroundColor = "oklch(52.7% 0.154 150.069)";
    playAgainButton.style.border = "2px solid oklch(79.2% 0.209 151.711)";
    playAgainButton.style.borderRadius = "0.375rem";
    playAgainButton.style.color = "oklch(92.5% 0.084 155.995)";

    playAgainButton.addEventListener('click', beginHand);

    buttonArea.appendChild(playAgainButton);
}

// Game logic

// Hit player/dealer functions for convenience
function hitPlayer() {
    checkDeck();
    dealPlayerCard(1);
    renderPlayerLastCard();
    updatePlayerHandValue();
    checkPlayerBust();
}

function hitDealer() {
    checkDeck();
    dealDealerCard(1);
    renderDealerLastCard();
    updateDealerHandValue();
    checkDealerBust();
}

// Update hand values based on hand content
function updatePlayerHandValue() {
    const playerCardCnt = playerHand.length;

    if (playerHand[playerCardCnt - 1].rank < 11) {
        playerHandValue += playerHand[playerCardCnt - 1].rank;
    }
    else if (playerHand[playerCardCnt - 1].rank >= 11) {
        playerHandValue += 10;
    }
    else {
        console.log("The card drawn has not contributed to its hand's value.")
    }

    // debug purposes
    console.log(playerHandValue);
}

function updateDealerHandValue() {
    const dealerCardCnt = dealerHand.length;

    if (dealerHand[dealerCardCnt - 1].rank < 11) {
        dealerHandValue += dealerHand[dealerCardCnt - 1].rank;
    }
    else if (dealerHand[dealerCardCnt - 1].rank >= 11) {
        dealerHandValue += 10;
    }
    else {
        console.log("The card drawn has not contributed to its hand's value.")
    }

    // debug purposes
    console.log(dealerHandValue);
}

// Deal starting cards
function dealStartingCards() {
    for (let i = 0; i < 2; i++) {
        hitDealer();
        hitPlayer();
    }
}

// Handle start of hand
function beginHand() {
    playerHandValue = 0;
    dealerHandValue = 0;

    resetHands();
    unrenderCards();
    dealStartingCards();
    flipHoleCard();
    showHitStandButtons();
}

// Check if player/dealer busted
function checkPlayerBust() {
    if (playerHandValue > 21) {
        alert("You busted!")
        endPlayerTurn();
    }
}

function checkDealerBust() {
    if (dealerHandValue > 21) {
        alert("The dealer busted!")
    }
}

// End player turn
function endPlayerTurn() {
    buttonArea.innerHTML = "";
    beginDealerTurn();
}

// Dealer AI
function beginDealerTurn() {
    unflipHoleCard();
    
    if (playerHandValue < 21) {
        while (dealerHandValue < 17) {
            hitDealer();
        }
    }

    endHand();
}

// Determine if player won, display Play Again button
function endHand() {
    let playerWin = false;

    if (playerHandValue >= dealerHandValue && playerHandValue <= 21) {
        playerWin = true;
    }
    else if (dealerHandValue > 21) {
        playerWin = true;
    }

    if (playerWin) {
        alert("You win!")
    }
    else {
        alert("You lose...")
    }

    showPlayAgainButton();
}

// Debugging

function printDeckContents() {
    for (let i = 0; i < deck.length; i++) {
        console.log(deck[i].rank + deck[i].suit);
    }
}
// Make and shuffle the deck (very very important)
makeDeck();
shuffleDeck();
printDeckContents();

// TODO: Flip hole card