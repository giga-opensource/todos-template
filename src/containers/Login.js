import React, { Component } from 'react';

class MessageText extends Component {
  render() {
    const { message } =this.props;
    return (
      <div>
        MessageText: <p>{message}</p>
      </div>
    )
  }
}

class LoginForm extends Component {
  render() {
    const {name, password, onSignIn, onSignIn} = this.props
    return(
      <div>
        <div>
          Name:<input refs="name" type="text"/><br/>
          Password:<input refs="password" type="text"/>
        </div>
          <button onClick = {() =>onSignIn(name,password)}>sign in</button>
          <button onClick = {() =>onSignUp(name,password)}>sign up</button>
        <div></div>
      <div>
    )
  }
}


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:
        {name:'Lily',password:'1234567'}
      ],
      message:null
    }
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignIn(name, password) {
    if(this.state.users.name.value === name && this.state.users.password.value ===password){
      this.setState({message: "login-success"})
    }else{
      this.setState({message: "login-fail"})
    }
  }

  onSignUp(name, password) {
    if(this.state.users.name.value === name){
      this.setState({message: "login-fail"})
    }else{
      const newUsers = this.state.users.slice();
      newUsers.push({name, password})
      this.setState({message: "login-success"})
    }
  }


  render() {
    const { message }= this.state;
    return(
      <div className='todo-box'>
        <MessageText
          message = {message}

        />
        <LoginForm
          name = { this.state.name}
          password = { this.state.password }
          onSignIn = { this.onSignIn }
          onSignUp = { this.onSignUp}
        />
      </div>
    )；
  }
}
