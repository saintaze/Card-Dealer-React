import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render () {
    const {imgUrl, altText} = this.props;
    const styles = {
      transform: `rotate(${this.props.rotation}deg) 
                  translateX(${this.props.xDisplacement}px)
                  translateY(${this.props.yDisplacement}px)`,
    }
    return (
      <div className="Card">
        <img src={imgUrl} alt={altText} style={styles}/>
      </div>
    );
  }
}

export default Card;