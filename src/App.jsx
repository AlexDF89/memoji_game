import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import Title from './components/Title';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import WindowErr from './components/WindowErr';
import WindowWin from './components/WindowWin';
import WindowLose from './components/WindowLose';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'start',
      cards: null,
      sec: null,
      errMess: false,
      gameID: null,
      win: false,
      lose: false,
      minutes: null,
      seconds: null
    }

    this.startGame = this.startGame.bind(this);
    this.flip = this.flip.bind(this);
    this.tick = this.tick.bind(this);

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
        window.history.pushState(null, null, 'game');
        this.setState({
          errMess: false, 
          page: 'game', 
          gameID: game.gameID, 
          cards: game.cards, 
          sec: game.sec,
          win: game.win,
          minutes: this.getMinutes(game.sec),
          seconds: this.getSeconds(game.sec)
        });

      })
      .catch(error => console.error(error.message));
  }

  flip(elem) {
    if (elem.tagName === 'DIV') {
      const parentElement = elem.parentNode;

      const data = {
        position: parentElement.dataset.position,
        gameID: this.state.gameID
      };

      axios.post('/flip', data)
        .then(response => response.data)
        .then(dataGame => {
          this.setState({ 
            cards: dataGame.cards,
            win: dataGame.win,
            lose: dataGame.lose
          });
        })
        .catch( e => console.error(e.message));
			
    }
  }

  getMinutes(sec) {
    return Math.floor(sec / 60);
  }

  getSeconds(sec) {
    return sec % 60;
  }

  tick() {
    if (this.state.sec > -1){
      const minutes = Math.floor(this.state.sec / 60);
      const seconds = this.state.sec % 60;
      this.setState({sec: this.state.sec - 1, minutes, seconds});
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          <GamePage 
            handleClick={this.flip} 
            gameID={this.state.gameID} 
            cards={this.state.cards} 
            minutes={this.state.minutes} 
            seconds={this.state.seconds} 
          />
        }
        { this.state.win 
          ? <WindowWin startGame={this.startGame} />
          : ''
        }
        { this.state.lose
          ? <WindowLose startGame={this.startGame} />
          : ''
        }
        
        
      </main>
    );
  }
}

export default App;