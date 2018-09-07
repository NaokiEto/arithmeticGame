import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Game.css';

class Game extends React.Component{

    constructor(props){
        super(props);

        this.state = {start: 0, answer: '', first_num: this.genRand(), second_num: this.genRand(), correct_counter: 0};

        this.handleChange = this.handleChange.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    genRand() {
        return Math.floor(Math.random() * 10);
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
                
                //alert('Correct: ' + this.state.answer);
                //event.preventDefault();
            }
        });

    }

    render(){
        if (!this.state.start) {
            return (
                <div className="DivStartGame">
                    <button className="StartGame" onClick={ () => this.startGame()}>Start</button>
                </div>
            )
        } else {
            return (
                <div className="Game">
                    <div id="Counter">
                    Counter: {this.state.correct_counter}
                    </div>
                    <form>
                        <label>
                            {this.state.first_num}x{this.state.second_num} =
                            <input type="text" name="name" autoFocus value={this.state.answer} onChange={this.handleChange} />
                        </label>
                    </form>
                </div>
            )
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
