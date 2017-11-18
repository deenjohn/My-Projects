import React, { Component } from "react";
import "./App.css";
import _ from "lodash";
import randomNumber from "./RandomNumber";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNumbers: [],
      numberOfStars: randomNumber(),
      answerIsCorrect: null,
      usedNumbers: [],
      redraws: 5,
      doneStatus: ""
    };
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.updateDoneStatus = this.updateDoneStatus.bind(this);
    this.possibleSolutions = this.possibleSolutions.bind(this);
    this.possibleCombinationSum = this.possibleCombinationSum.bind(this);
  }

  selectNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
      return;
    }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      answerIsCorrect: null
    }));
  }

  unselectNumber(clickedNumber) {
    this.setState(prev => ({
      selectedNumbers: prev.selectedNumbers.filter(
        number => number !== clickedNumber
      )
    }));
  }

  checkAnswer() {
    console.log("checkAnswer");
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.numberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }

  acceptAnswer() {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfStars: randomNumber()
      }),
      this.updateDoneStatus
    );
  }

  redraw() {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState(
      prevState => ({
        usedNumbers: [],
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfStars: randomNumber(),
        redraws: prevState.redraws - 1
      }),
      this.updateDoneStatus
    );
  }

  possibleCombinationSum(arr, n) {
    console.log("possibleCombinationSum ", arr, n);
    if (arr.indexOf(n) >= 0) {
      console.log("possibleCombinationSum  : true");
      return true;
    }
    if (arr[0] > n) {
      console.log("possibleCombinationSum  : false");
      return false;
    }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    var listSize = arr.length,
      combinationsCount = 1 << listSize;
    for (var i = 1; i < combinationsCount; i++) {
      var combinationSum = 0;
      for (var j = 0; j < listSize; j++) {
        if (i & (1 << j)) {
          combinationSum += arr[j];
        }
      }
      if (n === combinationSum) {
        return true;
      }
    }
    console.log("possibleCombinationSum  : false");
    return false;
  }

  possibleSolutions({ numberOfStars, usedNumbers }) {
    const possibleNumbers = _.range(1, 10).filter(
      number => usedNumbers.indexOf(number) === -1
    );
    console.log(possibleNumbers);
    return this.possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus() {
    console.log("updateDone");
    this.setState(function(prevState, props) {
      /*sucessfull run */
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done. Nice !!" };
      }
      /*unsucessfull run */
      if (prevState.redraws === 0 && this.possibleSolutions(prevState)) {
        console.log("unsucessfull");
        return { doneStatus: "Game Over !!" };
      }
    });
  }

  render() {
    const {
      selectedNumbers,
      numberOfStars,
      answerIsCorrect,
      usedNumbers,
      doneStatus
    } = this.state;

    return (
      <div className="App">
        <h3 className="header"> Play Nine Star</h3>
        <div className="row">
          <div className="star-frame">
            <h7>Stars</h7>
            <Stars numberOfStars={numberOfStars} />
          </div>
          <div className="control">
            <Button
              selectedNumbers={selectedNumbers}
              checkAnswer={this.checkAnswer}
              answerIsCorrect={answerIsCorrect}
              acceptAnswer={this.acceptAnswer}
              redraw={this.redraw}
              noOfRedraws={this.state.redraws}
            />
          </div>

          <div className="answer-frame">
            <h7>Answer</h7>
            <Answer
              selectedNumbers={selectedNumbers}
              unselect={this.unselectNumber}
            />
          </div>
          <br />
          {doneStatus ? (
            <DoneFrame doneStatus={doneStatus} />
          ) : (
            <Numbers
              selectedNumbers={this.state.selectedNumbers}
              selectNumber={this.selectNumber}
              usedNumbers={usedNumbers}
            />
          )}
        </div>
      </div>
    );
  }
}

function Stars(props) {
  let stars = [];
  for (let i = 0; i < props.numberOfStars; i++) {
    stars.push(<i key={i} class="fa fa-star" />);
  }

  return <div>{stars}</div>;
}

function Button(props) {
  let button = null;
  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button className="btn btn-danger">
          <i className="fa fa-times" />
        </button>
      );
      break;
    default:
      button = (
        <button
          className="btn btn-lg"
          onClick={props.checkAnswer}
          disabled={props.selectedNumbers.length === 0}
        >
          =
        </button>
      );
      break;
  }
  return (
    <div>
      <div>{button}</div>
      <br />
      <button
        className="btn btn-xs warning"
        onClick={props.redraw}
        disabled={props.noOfRedraws === 0}
      >
        <i className="fa fa-refresh" />
        {props.noOfRedraws}
      </button>
    </div>
  );
}

function Answer(props) {
  return (
    <div>
      {props.selectedNumbers.map((number, i) => (
        <span key={i} onClick={() => props.unselect(number)}>
          {number}
        </span>
      ))}
    </div>
  );
}

function Numbers(props) {
  const numberClassName = number => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used";
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
  };

  const arrayOfNumbers = _.range(1, 10);

  return (
    <div className="text-center">
      <h7>Numbers</h7>
      <div>
        {arrayOfNumbers.map((number, i) => (
          <span
            key={i}
            className={numberClassName(number)}
            onClick={() => props.selectNumber(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
}

function DoneFrame(props) {
  return (
    <div className="done-frame">
      <h2>{props.doneStatus}!</h2>
    </div>
  );
}

export default Game;
