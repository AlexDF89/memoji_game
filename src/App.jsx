import React from 'react';
import axios from 'axios';
import Title from './components/Title';
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'start',
      cards: null,
      sec: null
    }

    this.startGame = this.startGame.bind(this);

  }
  

  startGame(cards, sec) {
    const data = {cards, sec};
    axios.post('http://localhost:3000/game', data)
      .then(response => response.data)
      .then(game => {
        this.setState({ page: 'game', cards: game.cards, sec: game.sec });
      })
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <main>
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