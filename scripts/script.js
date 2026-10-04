const deck = [];
const dealerHand = [];
const playerHand = [];

// lookup table for card images so i dont have to rename my card files
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

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

function makeDeck() {
    const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            deck.push(new Card(j + 1, suits[i]))
        }
    }
    
    // debug purposes
    // console.log("deck upon makeDeck()");
    // for (let i = 0; i < deck.length; i++) {
    //     console.log(deck[i].rank + " of " + deck[i].suit);
    // }
}

function drawCards(cnt) {
    for (let i = 0; i < cnt; i++) {
        playerHand.unshift(deck[0]);
        deck.shift();
        displayUpdatedHand("player");
    }
}

function dealerDrawCards(cnt) {
    for (let i = 0; i < cnt; i++) {
        dealerHand.unshift(deck[0]);
        deck.shift();
        displayUpdatedHand("dealer");
    }
}

function displayUpdatedHand(person) {
    const tableCards = document.getElementById(`${person}-hand`);
    const cardImg = document.createElement('img');

    cardImg.src = cardImgs[deck[0].rank + playerHand[0].suit.toLowerCase()];
    cardImg.style.width = "7.5rem";
    cardImg.style.borderRadius = "0.5rem";
    cardImg.style.margin = "0.5rem";

    tableCards.appendChild(cardImg);
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[deck[i], deck[j]] = [deck[j], deck[i]];
  	}
}

function startHand() {

}

makeDeck();
shuffleDeck();
