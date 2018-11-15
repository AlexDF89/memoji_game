import React from 'react';
import Title from './components/Title';
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'start'
    }
  }

  render() {
    return (
      <main>
        <Title title="Memoji" />
        {(this.state.page === 'start') ?
          <StartPage />
          :
          <GamePage />
        }
      </main>
    );
  }
}

export default App;