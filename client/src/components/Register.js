import React, { Component } from 'react';
import axios from 'axios'; 
import { Loader, Message } from 'semantic-ui-react';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import UserRegister from './UserRegister';

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    loggeduser: '',
    sellermail: '' ,
    loading: false,
    visible: false
  }
  componentDidMount() {
    var user = localStorage.getItem('username');
    this.setState({
      loggeduser: user
    })
    if(user !== null) {
      this.props.history.push('/');
  }
  }

onChangename = (event) => {
  this.setState({
      username: event.target.value
  })
  console.log(event.target.value);
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


handleDismiss = () => {
  this.setState({ visible: false })
}

onSubmit = (event) => {
  console.log('clicked');
  event.preventDefault();

  const newUser = {
    username: this.state.username,
    password: this.state.password,
    email: this.state.email
}
  
  console.log(this.state.username);
  console.log(this.state.password);

  this.setState({
    loading: true
  })

  axios.post('http://localhost:5000/todos/register', newUser)
  .then((res) => {
    if(res.statusText) {
      this.setState({
        loading: false,
        visible: true
      })
      localStorage.setItem('username', res.data.user);
      this.props.history.push('/');
      toast.notify('Welcome, Start Adding Todos', {
        duration: 2000
      })
      window.location.reload(false);
  }
  if(res.data.err === 'user already exists') {
    toast.notify('User Already Exists!', {
      duration: 2000
    })
    localStorage.removeItem('username');
    this.setState({
      loading: false,
      visible: false
    })
  }
  });

  this.setState({
      username: '',
      password: '',
      email: ''
  })
}

render() {
  var data;
  var popup;
  if(this.state.visible) {
    popup = <Message
       color='green'
       onDismiss={this.handleDismiss}
       header='Welcome,'
       content='Start adding Todos'
     />
 } else {
   popup = '';
 }
  if(this.state.loading) {
    data = <Loader style={{marginTop: '190px'}} active inline='centered' size='massive'>Registering</Loader>
  } else {
    data =   <UserRegister
              onnamechange={(event) => this.onChangename(event)}
              onpasswordchange={(event) => this.onChangepassword(event)}
              onemailchange={(event) => this.onChangeemail(event)}
              onsubmit={(event) => this.onSubmit(event)}
              />
  }
  return (
    <div onSubmit={this.onSubmit}>
      <div>
        {popup}
        {data}
     </div>
    </div>
  );
}
}

export default Register;