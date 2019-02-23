import React, { Component } from 'react';
import './App.css';

const Header = (props) => {
  console.log(props);
  return (
    <header>
      <h1>{props.title}</h1>
      <span className="stats">Players: {props.totalPlayer}</span>
    </header>
  );
}

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      score: 0
    }
  }

  incrementScore = () => {
    //lexical this: 자기 자신을 가리킨다.
    console.log('increment', this);
    // this.state.score = 1; //이렇게하면 화면이 렌더링이 안된다.
    // this.setState({score: 1}) 이렇게하거나
    this.setState(prevState => { //콜백함수를 사용하여 이전 상태를 받아서 새로운 상태 return/ 만약 기존에 score, player속성을 가지고있다면 player는 삭제되는게 아니라 score만 업데이트된다(merge)
      return {
        score: prevState.score + 1
      }
    })
    // this.setState(prevState => ({score: prevState.score + 1}))  //위의 함수를 한줄로 바꿨을 때
  }

  decrementScore = () => {
    this.setState(prevState => ({score: prevState.score - 1}))  //위의 함수를 한줄로 바꿨을 때
  }
  render(){
    return (
      <div className="counter">
        <button className="counter-action decrement"onClick={this.decrementScore}> - </button>
        <span className="counter-score">{this.state.score}</span>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
}

const Player = (props) => (
  <div className="player">
    <span className="player-name">
      <button className="remove-player" onClick= {() => {props.removePlayer(props.id)}}>X</button>
    </span>
    <span className="player-name">{props.name}</span>
    <Counter score = {props.score}/>
  </div>
);

//const -> class component로 변경: render 함수 필요
class App extends React.Component {
  //공통으로 쓰이는 player를 app에 lifting up
  state = {
    players: [
      {name: 'LDK', id: 1},
      {name: 'HONG', id: 2},
      {name: 'KIM', id: 3},
      {name: 'PARK', id: 4},
    ]
  }

  handleRemovePlayer = (id) => {
    this.setState(prevState => {
      return {
        //filter 참인 것들만 새로운 배열로 생성
        players: prevState.players.filter(item => item.id !== id)
      }
    })
  }
  render() {
    return (
      <div className="scoreboard">
        <Header title="My scoreboard" totalPlayers={this.state.players.length}/>
        {
          //class component는 this사용. 반복문을 돌리면서 react element 생성하면서 속성을 물려줌
          this.state.players.map(item => <Player name={item.name}
                                                 key={item.id.toString()}
                                                 removePlayer={this.handleRemovePlayer}
                                                 id={item.id}/>)
        }
      </div>
    )
  }
}

export default App;
