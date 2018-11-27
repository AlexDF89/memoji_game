import React from 'react';

function Timer (props)  {

    return(
      <div className="timer" id="timer">{`0${props.minutes}: ${(props.seconds > 9) ? props.seconds : ('0' + props.seconds)}`}</div>
    );

}

export default Timer;