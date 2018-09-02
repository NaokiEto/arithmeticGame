import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Game.css';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    // this function will handle any changes made to the textbox
    // If the correct answer is submitted, then we move on to the
    // next problem
    handleChange(event) {
        var num = 8;
        this.setState({value: event.target.value}, () => {
            console.log("this.state: ", this.state);
            if (this.state.value == num.toString()) {
                console.log("yay!");
                alert('Correct: ' + this.state.value);
                event.preventDefault();
            }
        });
    }

    render(){
        return (
            <div className="Game">
                <form>
                    <label>
                        8x1 =
                        <input type="text" name="name" autoFocus value={this.state.value} onChange={this.handleChange} />
                    </label>
                </form>
            </div>
        )
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
