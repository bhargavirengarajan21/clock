import React from "react";
import "./styles.css";

class TimerIn extends React.Component {
  render() {
    return (
      <div>
        HR:
        <input
          type="number"
          min={0}
          max={24}
          value={this.props.hours}
          name="hours"
          onChange={this.props.handleChange}
          required
        />
        MIN:
        <input
          type="number"
          min={0}
          max={60}
          name="minutes"
          value={this.props.minutes}
          onChange={this.props.handleChange}
          required
        />
      </div>
    );
  }
}
class Timer extends React.Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.hours}:{this.props.minutes}:{this.props.seconds}
        </h1>
      </div>
    );
  }
}
class Start extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.startcountdown}>Start</button>
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: "",
      minutes: "",
      seconds: "00",
      isClicked: false
    };
    this.remainingmin = 0;
    this.remainingsec = 0;
    this.intervalhandle = 0;
    this.tick = this.tick.bind(this);
    this.startcountdown = this.startcountdown.bind(this);
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  tick() {
    var hr = Math.floor(this.remainingmin / 60);
    console.log(hr);
    var min = Math.floor(this.remainingsec / 60);
    console.log(min);
    var sec = this.remainingsec - min * 60;
    console.log(sec);

    this.setState({
      minutes: min,
      hours: hr,
      seconds: sec
    });

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      });
    }
    if (min < 10) {
      this.setState({
        value: "0" + min
      });
    }
    if (hr < 10) {
      this.setState({
        hours: "0" + hr
      });
    }
    if (hr === 0 && min === 0 && sec === 0) {
      alert("TIME UP");
      clearInterval(this.intervalhandle);
    }
    this.remainingsec--;
    if (this.remainingsec === 0) {
      this.remainingmin--;
    }
  }
  startcountdown() {
    this.intervalhandle = setInterval(this.tick, 1000);
    let mintime = this.state.hours;
    let sectime = this.state.minutes;
    this.remainingmin = mintime * 60;
    this.remainingsec = sectime * 60;
    this.setState({
      isClicked: true
    });
  }

  render() {
    const clicked = this.state.isClicked;

    if (clicked) {
      return (
        <div>
          <Timer
            hours={this.state.hours}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
          />
        </div>
      );
    } else {
      return (
        <div>
          <TimerIn
            hours={this.state.hours}
            minutes={this.state.minutes}
            handleChange={this.handleChange}
          />
          <Timer
            hours={this.state.hours}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
          />
          <Start
            startcountdown={this.startcountdown}
            value={this.state.value}
          />
        </div>
      );
    }
  }
}

export default App;
