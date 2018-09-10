import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Game.css';

class Timer extends React.Component {

    render() {

        return(
            <div>
                Time left: {this.props.seconds} seconds
            </div>
        );
    }
}

class Counter extends React.Component {

    render() {
        return (
            <div id="Counter">
                Counter: {this.props.correct_counter}
            </div>
        );
    }
}

class Game extends React.Component{

    constructor(props){
        super(props);

        this.state = {start: 0, answer: '', first_num: this.genRand(), second_num: this.genRand(), 
                      correct_counter: 0, seconds: 120};

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
 
       this.handleChange = this.handleChange.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    genRand() {
        return Math.floor(Math.random() * 21);
    }

    startTimer() {
        if (this.timer === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds < 0) { 
          clearInterval(this.timer);
        }
    }


    startGame() {
        this.setState({start: 1});
    }

    // this function will handle any changes made to the textbox
    // If the correct answer is submitted, then we move on to the
    // next problem
    handleChange(event) {
        var num = this.state.first_num * this.state.second_num;
        //this.setState({answer: event.target.value});

        this.setState({answer: event.target.value}, () => {
            console.log("this.state: ", this.state);
            if (this.state.answer === num.toString()) {
                this.setState({answer: '', first_num: this.genRand(), second_num: this.genRand(), correct_counter: this.state.correct_counter + 1});
                console.log("yay! " + this.state.correct_counter);
            }
        });
    }

    render(){
        if (!this.state.start) {
            return (
                <div className="DivStartGame">
                    <button className="StartGame" onClick={ () => this.startGame()}>Start</button>
                </div>
            );
        } else if (this.state.seconds < 0) {
            return (
                <div className="DivEndGame">
                    Score: {this.state.correct_counter}
                </div>
            );
        }
        else {

            if (this.timer === 0) {
              this.timer = setInterval(this.countDown, 1000);
            }

            console.log("seconds left: " + this.state.seconds);

            return (
                <div className="Game">
                    <Counter correct_counter={this.state.correct_counter} />
                    <form>
                        <label>
                            {this.state.first_num}x{this.state.second_num} =
                            <input type="text" name="name" autoFocus value={this.state.answer} onChange={this.handleChange} />
                        </label>
                    </form>
                    <Timer seconds={this.state.seconds}/>
                </div>
            );
        }
    }
}

class App extends Component {
  render() {
    return (
      <div>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
          </div>
          <Game />
      </div>
    );
  }
}

export default App;
