const deck = [];
const dealerHand = [];
const playerHand = [];
const leftoverDeck = [];

let playerHandValue = 0;
let dealerHandValue = 0;

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
}

function drawCards(cnt) {
    for (let i = 0; i < cnt; i++) {
        if (deck.length < 1) {
            const leftoverCnt = leftoverDeck.length;
            for (let i = 0; i < leftoverCnt; i++) {
                deck.unshift(leftoverDeck.shift());
            }
            shuffleDeck();
            document.getElementById('leftovers').style.opacity = "0%";
        }
        playerHand.push(deck.shift());
        displayUpdatedHand("player");
    }
}

function dealerDrawCards(cnt) {
    for (let i = 0; i < cnt; i++) {
        if (deck.length < 1) {
            for (let i = 0; i < 52; i++) {
                deck.unshift(leftoverDeck.shift());
            }
            shuffleDeck();
            document.getElementById('leftovers').style.opacity = "0%";
        }

        dealerHand.push(deck.shift());
        displayUpdatedHand("dealer");
    }
}

function displayUpdatedHand(person) {
    const displayedCards = document.getElementById(`${person}-hand`);
    const cardImg = document.createElement('img');

    switch (person) {
        case "player":
            cardImg.src = cardImgs[playerHand[playerHand.length - 1].rank + playerHand[playerHand.length - 1].suit.toLowerCase()];
            break;
        case "dealer":
            cardImg.src = cardImgs[dealerHand[dealerHand.length - 1].rank + dealerHand[dealerHand.length - 1].suit.toLowerCase()];
            break;
        default:
            console.log("Oops! Either you're seeing this because you passed an unsupported argument to displayUpdatedHand(), or you forgot break keywords when writing this switch case. Check your code dingus")
    }
    
    cardImg.style.width = "7.5rem";
    cardImg.style.borderRadius = "0.5rem";
    cardImg.style.margin = "0.5rem";

    displayedCards.appendChild(cardImg);
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[deck[i], deck[j]] = [deck[j], deck[i]];
  	}
}

function startHand() {
    const displayedCards = document.getElementById('player-hand');
    const displayedDealerCards = document.getElementById('dealer-hand');
    const displayedLeftovers = document.getElementById('leftovers');

    playerHandValue = 0;
    dealerHandValue = 0;

    if (playerHand.length > 0) {
        const handLength = playerHand.length;
        console.log("Player's hand length is greater than 0")
        for (let i = 0; i <= handLength; i++){
            deck.push(playerHand.shift());
        }
    }

    if (dealerHand.length > 0) {
        const handLength = dealerHand.length;
        console.log("Dealer's hand length is greater than 0")
        for (let i = 0; i <= handLength; i++){
            deck.push(dealerHand.shift());
        }
    }

    displayedCards.innerHTML = "";
    displayedDealerCards.innerHTML = "";

    shuffleDeck();

    for (let i = 0; i < 2; i++) {
        hitDealer();
        hitPlayer();
    }

    if (dealerHandValue > 21) {
        dealerHandValue -= 10;
    }

    displayedDealerCards.lastElementChild.src = "imgs/back.png";

    replaceStartButton();

    console.log("Debug log upon hand start: ");
    debugShit();
}

function replaceStartButton() {
    const buttonArea = document.getElementById('button-area');

    while (buttonArea.childElementCount > 0) {
        buttonArea.firstElementChild.remove();
    }

    const hitButton = document.createElement('button');
    const standButton = document.createElement('button');

    // Define the inline styles for the Hit button in a brute forcey way akin to Steve Harvey mark I
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

    // Repeat for Stand button
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

    // Add event listeners so that these actually do something
    hitButton.addEventListener("click", hitPlayer);
    standButton.addEventListener("click", dealerTurn);

    buttonArea.appendChild(hitButton);
    buttonArea.appendChild(standButton);
}

function hitPlayer() {
    drawCards(1);

    const lastCard = playerHand.length - 1;

    switch (true) {
        // TODO: make player able to choose ace value
        // case playerHand[lastCard].rank == 1:
        //     playerHand[lastCard].value = resolveAce();
        //     break;
        case playerHand[lastCard].rank < 11:
            playerHand[lastCard].value = playerHand[lastCard].rank;
            break;
        case playerHand[lastCard].rank >= 11:
            playerHand[lastCard].value = 10;
            break;
        default:
            alert("fuck the switch case dont work")
    }

    playerHandValue += playerHand[lastCard].value;

    console.log(playerHand[lastCard].value);
    console.log(playerHandValue);

    setTimeout(function() {
        if (playerHandValue > 21) {
            alert("You busted!");
            dealerTurn();
        }
    }, 300)
}

function hitDealer() {
    dealerDrawCards(1);

    const lastCard = dealerHand.length - 1;

    switch (true) {
        case dealerHand[lastCard].rank == 1:
            if (dealerHandValue + 11 > 21) {
                dealerHand[lastCard].value = 1;
            }
            else {
                dealerHand[lastCard].value = 11;
            }
            break;
        case dealerHand[lastCard].rank < 11:
            dealerHand[lastCard].value = dealerHand[lastCard].rank;
            break;
        case dealerHand[lastCard].rank >= 11:
            dealerHand[lastCard].value = 10;
            break;
        default:
            alert("fuck the switch case dont work")
    }

    dealerHandValue += dealerHand[lastCard].value;

    console.log(dealerHand[lastCard].value);
    console.log(dealerHandValue);

    setTimeout(function() {
        if (dealerHandValue > 21) {
            alert("Dealer busted!");
        }
    }, 300);
}

function dealerTurn() {
    const lastCard = dealerHand.length - 1;
    const cardImg = document.getElementById('dealer-hand').lastElementChild
    cardImg.src = cardImgs[dealerHand[lastCard].rank + dealerHand[lastCard].suit.toLowerCase()];

    if (playerHandValue < 21) {
        while (dealerHandValue < 17) {
            hitDealer();
        }
    }
    
    setTimeout(endHand, 300);
}

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

    const buttonArea = document.getElementById('button-area');

    buttonArea.firstElementChild.remove();
    buttonArea.firstElementChild.remove();

    const playAgainButton = document.createElement('button');

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

    playAgainButton.addEventListener('click', startHand);

    buttonArea.appendChild(playAgainButton);
}

function debugShit() {
    let currentElement = ""
    const deckStringified = []

    console.log("Player's hand: ");
    for (let i = 0; i < playerHand.length; i++) {
        console.log(playerHand[i].rank.toString() + playerHand[i].suit.toString());
    }

    console.log("Dealer's hand: ");
    for (let i = 0; i < dealerHand.length; i++) {
        console.log(dealerHand[i].rank.toString() + dealerHand[i].suit.toString());
    }
    
    console.log("Deck contents: ");
    for (let i = 0; i < deck.length; i++) {
        currentElement = deck[i].rank.toString() + deck[i].suit.toString();
        deckStringified.push(currentElement);
    }
    console.log(deckStringified.toString());
}

// TODO: make player able to choose ace value
// function resolveAce() {
//     const buttonArea = document.getElementById('button-area');

//     while (buttonArea.childElementCount > 0) {
//         buttonArea.firstElementChild.remove();
//     }

//     const elevenButton = document.createElement('button');
//     const oneButton = document.createElement('button');
//     let value = 0;

//     // Styling for eleven button

//     elevenButton.id = "eleven-button";
//     elevenButton.innerText = "11";
//     elevenButton.style.paddingLeft = "0.5rem";
//     elevenButton.style.paddingRight = "0.5rem";
//     elevenButton.style.paddingTop = "0.25rem";
//     elevenButton.style.paddingBottom = "0.25rem";
//     elevenButton.style.marginRight = "0.5rem";
//     elevenButton.style.backgroundColor = "oklch(37.3% 0.034 259.733)";
//     elevenButton.style.border = "2px solid oklch(70.4% 0.04 256.788)";
//     elevenButton.style.borderRadius = "0.375rem";
//     elevenButton.style.color = "oklch(92.9% 0.013 255.508)";

//     // Styling for one button

//     oneButton.id = "one-button";
//     oneButton.innerText = "1";
//     oneButton.style.paddingLeft = "0.5rem";
//     oneButton.style.paddingRight = "0.5rem";
//     oneButton.style.paddingTop = "0.25rem";
//     oneButton.style.paddingBottom = "0.25rem";
//     oneButton.style.marginRight = "0.5rem";
//     oneButton.style.backgroundColor = "oklch(37.3% 0.034 259.733)";
//     oneButton.style.border = "2px solid oklch(70.4% 0.04 256.788)";
//     oneButton.style.borderRadius = "0.375rem";
//     oneButton.style.color = "oklch(92.9% 0.013 255.508)";

//     elevenButton.addEventListener("click", function() {
//         value = 11;
//         replaceStartButton();
//     })

//     oneButton.addEventListener("click", function() {
//         value = 1;
//         replaceStartButton();
//     })

//     buttonArea.appendChild(elevenButton);
//     buttonArea.appendChild(oneButton);

//     return value;
// }

makeDeck();
