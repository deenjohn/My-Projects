import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class SearchGitHubUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userName = this.state.userName;
    const url = "https://api.github.com/users/" + userName;
    const that = this;
    axios
      .get(url)
      .then(function(response) {
        that.props.onSubmit(response.data);
        that.setState({ userName: "" });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          UserName:
          <input
            type="text"
            name="enter"
            value={this.state.userName}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cards = this.props.users.map(user => (
      <Card key={user.id} user={user} />
    ));
    return <div>{cards}</div>;
  }
}

function Card(props) {
  return (
    <div className="card">
      <div className="image-frame">
        <img src={props.user.avatar_url} />
      </div>
      <div className="card-info">
        <span>{props.user.login} </span>
        <br />
        <span>{props.user.bio} </span>
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.addNewUser = this.addNewUser.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('prevState ',this.state)
    //console.log('nextState ',nextState)
    return true;
  }

  addNewUser(userInfo) {
    const user = {
      avatar_url: userInfo.avatar_url,
      login: userInfo.login,
      id: userInfo.id,
      bio: userInfo.bio
    };

    this.setState({ users: [...this.state.users, user] });
  }

  render() {
    return (
      <div>
        <SearchGitHubUser onSubmit={this.addNewUser} />
        <CardList users={this.state.users} />
      </div>
    );
  }
}

export default App;
