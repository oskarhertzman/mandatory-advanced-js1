import React from 'react';
import './App.css';
import io from 'socket.io-client';
import sendBtn from './send-button.png';





class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      messages: [],
      new_message: {}
    }


    console.log(this.props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);



    };

    componentDidMount() {
        this.socket = io('http://3.120.96.16:3000');
        let socket = this.socket;
        socket.on('connect', function(){
          console.log("CONNECTED!");
          console.log(socket.id);
        });
      socket.on('messages', data => {
        this.setState({messages: data})
        let messages = data;
        console.log(messages);
      });

      socket.on('disconnect', function(){});
    }

    componentDidUpdate () {
      let socket = this.socket;
      socket.on('new_message', message => {
        console.log("NEW MESSAGE: ", message);
        this.setState({new_message: message})
        console.log(this.state.new_message);

        // Separate copy of array & removes first item of it in order to always have 20 messages.
        let copy = [...this.state.messages];
        copy.splice(0, 1);
        this.setState({messages: copy})

        // Adds a new message object new_messages to the message array.
        let joined = this.state.messages.concat(this.state.new_message);
        this.setState({messages: joined})
        console.log(this.state.messages);

      })

    }


    handleContentChange(e) {
      this.setState({content: e.target.value});
      }


      handleChatSubmit(e) {
        e.preventDefault();
        let socket = this.socket;
        let content = this.state.content;
        let username = this.props.username;
        console.log(content + " " + username);
        let contentValidation = /^.{1,200}$/s;

        if (contentValidation.test(content)) {
          console.log("Good content");
          socket.emit('message', {
              username: this.props.username,
              content: content
            }, (response) => {
              console.log("Emitted: ", response);
            });
        }
        else {
          console.log("Bad Content");
        }
        this.setState({content: ''})
        console.log(this.state);
      }



      render(){

        let chatInfo = this.state.messages;

        const ChatRender = ({chatInfo}) => (
          <div className="Chat">
            {chatInfo.map(msg => (
              <div className="message" key={msg.id}>
              <h3>{msg.username}</h3>
              <br></br>
              <p>{msg.content}</p>
            </div>
            ))}
          </div>
        );


    return (
<div className="ChatApp" >
  <div className="Header">
    <h1>School Chat</h1>
    </div>
    <ChatRender chatInfo={chatInfo} />
  <footer className="footer">
    <form onSubmit={this.handleChatSubmit}>
      <div className="chatinput">
        <textarea rows="4" cols="60" value={this.state.content} onChange={this.handleContentChange} name="message" placeholder = "Message..." > </textarea>
        <button type="submit" className="chatbutton"> <img src ={sendBtn} /> </button>
      </div>

      <div className="chatname">
        <span style={{textTransform: 'capitalize'}}>User: #{this.props.username}</span>
      </div>
    </form>
  </footer>
</div>
        );
      }
    }


    export default Chat;
