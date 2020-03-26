import React, { Component } from 'react';
import './MemoryCard.css';

class MemoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isFlipped: false
    };
}

    clickHandler = () => {
        this.setState({
            isFlipped: !this.state.isFlipped
        })
    }
  
  render() {

    const { isFlipped } = this.state;

    const memoryCardInnerClass = 
        "MemoryCardInner " + (isFlipped === true && "flipped");


    return (
        <div className="MemoryCard" onClick= {this.clickHandler.bind(this)}>
            <div className={memoryCardInnerClass}>
                <div className="MemoryCardBack">
                    <img
                    src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png"
                    alt="Digital Crafts Logo"
                    />
                </div>
                <div className="MemoryCardFront">
                    {this.props.symbol}
                </div>
            </div>
        </div>
    
    );
  }
}

export default MemoryCard;
