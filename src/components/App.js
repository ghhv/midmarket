import React, { Component } from 'react';
import logo from '../images/midmarket-logo-transparent-white.png';

import MidMarketMap from './MidMarketMap'
import DetailsPanel from './DetailsPanel'

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePlaceClick = this.handlePlaceClick.bind(this);
    this.handleCardSelected = this.handleCardSelected.bind(this);
    this.state = {
      selectedIndex: 0,
      shouldScrollToSelected: false,
      shouldCenterSelected: true
    }
  }

  render() {
    return (
      <div className="app-root">
        <header>
          <img src={logo} className="logo" alt="logo" />
          <div className="header-text">
            <h1>mid-market rising</h1>
            <p className="subtitle">developments in and around sf civic center</p>
          </div>
        </header>
        <main>
          <MidMarketMap
            onPlaceClick={this.handlePlaceClick}
            selectedIndex={this.state.selectedIndex}
            shouldCenterSelected={this.state.shouldCenterSelected}
          />
          <DetailsPanel
            selectedIndex={this.state.selectedIndex}
            onCardSelected={this.handleCardSelected}
            shouldScrollToSelected={this.state.shouldScrollToSelected}
          />
        </main>
      </div>
    );
  }

  handlePlaceClick(index) {
    this.setState({
      selectedIndex: index,
      shouldScrollToSelected: true,
      shouldCenterSelected: false
    });
  }

  handleCardSelected(index) {
    this.setState({
      selectedIndex: index,
      shouldScrollToSelected: false,
      shouldCenterSelected: true
    });
  }
}

export default App;
