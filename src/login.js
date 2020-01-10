import React from 'react';
import './App.css';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      login: false,
      color: '',
      error: 'none'
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(e) {
    this.setState({username: e.target.value});
    }

      handleSubmit(e) {

        e.preventDefault();
        let username = this.state.username;
        let userValidation = /^[A-Za-z\-_\s]{1,12}$/;
        console.log(username);

        if (userValidation.test(username)) {
          console.log("Good Username");
          this.setState({login: true });
          this.props.onLogin(username);
        }
        else {
          console.log("Bad Username");
          this.setState({login: false, color: 'red', error: 'inline-block' });
        }
        console.log(this.state);

      }


      render(){

        let errorMessage = {
          display: this.state.error,
          color: this.state.color,
          fontWeight: 'bold',
          width: '600px',
          wordWrap: 'break-word'
        }



        return (
          <div className="App">
          <h1> Login to chat! </h1>
          <form onSubmit={this.handleSubmit}>
          <label>
          Username:  
          <input style= {{border: "1px solid " + this.state.color}}type="text" value={this.state.username} onChange={this.handleUserChange} name="user" />
          </label>
          <br></br>
          <div style = {errorMessage}>
          <p id="loginError" style = {errorMessage}> The username can only contain alphanumeric characters, “-”, “_” and spaces and must be between 1 and 12 characters long. </p>
          </div>
          <br></br>
          <input type="submit" value="Submit" />
          </form>
          </div>
        );
      }
    }




    export default Login;
