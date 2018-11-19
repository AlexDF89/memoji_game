import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import Title from './components/Title';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import WindowErr from './components/WindowErr';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'start',
      cards: null,
      sec: null,
      errMess: false
    }

    this.startGame = this.startGame.bind(this);

  }
  

  startGame(cards, sec) {
    const data = {cards, sec};
    axios.post('/game', data)
      .then(response => response.data)
      .then(game => {
        if (game.err) {
          this.setState({ errMess: game.errMess });
          this.setState({ errMess: false });
          return;
        }
        this.setState({ errMess: false, page: 'game', cards: game.cards, sec: game.sec });
      })
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <main>
        <ReactCSSTransitionGroup 
          component='section'
          transitionName='slide'
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={0}>  

         {this.state.errMess ?  <WindowErr errMess={this.state.errMess}/> : ''} 

        </ReactCSSTransitionGroup >
        
        <Title title="Memoji" />
        {(this.state.page === 'start') ?
          <StartPage startGame={this.startGame} />
          :
          <GamePage cards={this.state.cards} sec={this.state.sec} />
        }
      </main>
    );
  }
}

export default App;