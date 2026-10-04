const deck = [];
const dealerHand = [];
const playerHand = [];

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

function drawCard(recipientHand) {
    recipientHand.push(deck[0]);
    deck.shift();

    // debug purposes
    // console.log("Recipient's hand: ");
    // for (let i = 0; i < recipientHand.length; i++) {
    //     console.log(recipientHand[i].rank + " of " + recipientHand[i].suit);
    // };

    // console.log("Deck: ");
    // for (let i = 0; i < deck.length; i++) {
    //     console.log(deck[i].rank + " of " + deck[i].suit);
    // }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[deck[i], deck[j]] = [deck[j], deck[i]];
  	}
}

makeDeck();
shuffleDeck();