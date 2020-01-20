import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.corsProxy = 'https://cors-anywhere.herokuapp.com/';
    this.state = { apiId: '', cards: [], cardsRemaining: 52}
  }

  createRandVal = (boundary) => {
    let val = Math.random() * boundary;
    val *= Math.random() > 0.5 ? 1 : -1;
    return val;
  }

  componentDidMount = async () => {
    const apiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
    const res = await fetch(`${this.corsProxy}${apiUrl}`);
    const data = await res.json()
    this.setState({apiId : data.deck_id})
  }
  
  handldeClick = async (e) => {
    if(this.state.cardsRemaining === 0) return; 
    const apiUrl = `https://deckofcardsapi.com/api/deck/${this.state.apiId}/draw/`;
    const res = await fetch(`${this.corsProxy}${apiUrl}`);
    const data = await res.json()
    const newCard = { 
      ...data.cards[0], 
      xDisplacement: this.createRandVal(18), 
      yDisplacement: this.createRandVal(18), 
      rotation: this.createRandVal(42)
    }
    this.setState({ cards: [...this.state.cards, newCard], cardsRemaining: data.remaining })
  }

  renderCards = () => {
    return this.state.cards.map(c => {
      const alt = `${c.value} of ${c.suit.toLowerCase()}`
      return <Card key={c.code} 
              imgUrl={c.image} 
              altText={alt}
              rotation={c.rotation}
              xDisplacement={c.xDisplacement}
              yDisplacement={c.yDisplacement} 
              />
    }); 
  }

  render() { 
    return ( 
      <div className="Deck">
        <h1>♦ card dealer ♦</h1>
        <h2>♦ a fun way to deal cards ♦</h2>
        <h3>{this.state.cardsRemaining === 45 && 'All cards have been dealt! '}</h3>
        <button onClick={this.handldeClick}>deal me a card</button>
        <div className="cards">
          {this.renderCards()}
        </div>
      </div>
     );
  }
}
 
export default Deck;