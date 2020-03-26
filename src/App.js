import React, { Component } from 'react';
import './App.css';
import './components/MemoryCard.css';
import MemoryCard from './components/MemoryCard';

function generateDeck () {
  const symbols = [`∆`,` ß`, `£`, `§`,`•`, `$`, `+`, `ø`];
  let deck = [];
  for (let i = 0; i < 16; i++) {
    deck.push({
      symbol: symbols[i%8],
      isFlipped: false
    });
  };

  shuffle(deck);
  console.log("this is the deck", deck);
  return deck;

}
  
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;

}

class App extends Component {

  constructor(props){
    super(props);
      this.state = {
        deck: generateDeck(),
        pickedCards: []
      }
  }

  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped)
    return;  

    let cardToFlip = {...this.state.deck[cardIndex]}
    cardToFlip.isFlipped = true

    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

      if (newPickedCards.length === 2) {
        let card1Index = newPickedCards[0];
        let card2Index = newPickedCards[1];
        let card1 = newDeck[card1Index];
        let card2 = newDeck[card2Index];

        if (card1.symbol !== card2.symbol) {
          this.unflipCards(card1Index, card2Index);
        }
        newPickedCards = [];
      }
    this.setState({
      deck: newDeck, pickedCards: newPickedCards
    })
  }

  unflipCards(card1Index, card2Index) {

    let newDeck = this.state.deck.map(card => {
      return{...card};
    })

    newDeck[card1Index].isFlipped = false;
    newDeck[card2Index].isFlipped = false;

    this.setState({
      deck: newDeck
    })

  }

  render() {

    let cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard
      symbol = {card.symbol}
      isFlipped = {card.isFlipped}
      key = {index}
      pickCard = {this.pickCard.bind(this,index)}/>

    });

    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h2>Match Cards To Win</h2>
        </header>
        <div className="gameBoard">
        {cardsJSX.slice(0,4)}
        {cardsJSX.slice(4,8)}
        {cardsJSX.slice(8,12)}
        {cardsJSX.slice(12,16)}
        </div>
      </div>
      );
    }
}

export default App;

