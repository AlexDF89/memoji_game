import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.totalSeconds = props.time;

    this.state = {
      minutes: this.getMinutes(),
      seconds: this.getSeconds()
    };

    this.tick = this.tick.bind(this);
  }

  getMinutes() {
    return Math.floor(this.totalSeconds / 60);
  }

  getSeconds() {
    return this.totalSeconds % 60;
  }

  tick() {
    if (this.totalSeconds > -1){
      const minutes = Math.floor(this.totalSeconds / 60);
      const seconds = this.totalSeconds % 60;
      this.totalSeconds -= 1;
      this.setState({minutes, seconds});
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    return(
      <div className="timer" id="timer">{`0${this.state.minutes}: ${(this.state.seconds > 9) ? this.state.seconds : ('0' + this.state.seconds)}`}</div>
    );
  }

}

export default Timer;