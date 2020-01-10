import React from 'react';
import Login from './login.js';
import Chat from './chat.js';
import './App.css';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: '',
      login: false,
      messages: [],
      color: '',
      error: ''
    }

    this.onLogin = this.onLogin.bind(this);
}
    onLogin (username){
      this.setState({
        login: true,
        username: username
      })
    }

      render(){
        return (

          this.state.login  ? <Chat username={this.state.username}  /> : <Login onLogin={this.onLogin} />

        );
      }
    }

    export default App;
