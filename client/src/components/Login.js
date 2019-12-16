import React, { Component } from 'react';
import axios from 'axios';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import UserLogin from './UserLogin';

class Login extends Component {
  state = {
    password: '',
    email: ''
  }
  componentDidMount() {
    console.log(localStorage.getItem('username'));
    var usermail = localStorage.getItem('username');
    if(usermail !== null) {
      this.props.history.push('/');
    }
  }
  
onChangepassword = (event) => {
 this.setState({
     password: event.target.value
 })
}

onChangeemail = (event) => {
  this.setState({
      email: event.target.value
  })
 }

onSubmit = (event) => {
  event.preventDefault();

  console.log(`Form Submitted`);
  console.log(this.state.password);
  console.log(this.state.email);

  const Login = {
      password: this.state.password,
      email: this.state.email
  }

  axios.post('http://localhost:5000/todos/login', Login)
  .then((res) => {
    console.log(res);
      if(res.data.loggeduser) {
        localStorage.setItem('username', res.data.loggeduser);
        this.props.history.push('/');
        toast.notify('You are now logged in!!', {
          duration: 2000
        });
        window.location.reload(false);
      } else if(res.data.err === 'something went wrong') {
        console.log("username and Password don't match");
        toast.notify("Username and Password don't match", {
          duration: 2000
        });
      }
  });

  this.setState({
      password: '',
      email: ''
  })
}

render() {
  return (
    <div>
        <div>
        <UserLogin 
        submit={(event) => this.onSubmit(event)}
        onemailchange={(event) => this.onChangeemail(event)}
        onpasswordchange={(event) => this.onChangepassword(event)}
        />
  </div>
  </div>
  );
}
}

export default Login;