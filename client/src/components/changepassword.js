import React, { Component } from 'react';
import axios from 'axios';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import { Grid } from 'semantic-ui-react'

class ChangePassword extends Component {

    state = {
        password: ''
    }

    componentDidMount() {
        let username = localStorage.getItem('username');
        if(username === null) {
            this.props.history.push('/');
        }
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
       }

    onSubmit = (event) => {
      event.preventDefault();
      let username = localStorage.getItem('username');

      let UserData = {
        password: this.state.password,
        username: username
    }
      axios.put('http://localhost:5000/todos/changepassword', UserData)
  .then((res) => {
    console.log(res);
    if(res.data.userdata) {
        console.log('Password Changed Successfully');
        localStorage.removeItem('username');
        this.props.history.push('/Login');
        toast.notify('Password Changed Successfully!', {
            duration: 2000
          });
          window.location.reload(false);
    }
     })
    }
    render() {
        return (
          <div onSubmit={this.onSubmit}>
           <Grid>
           <Grid.Column width={14}>
           <form className="form-horizontal">
           <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-8 col-md-8 control-label">Enter Password</label>
           <div className="col-sm-8">
           <input type="password" className="form-control" id="inputEmail3" onChange={this.onChangePassword} placeholder="Password" />
           </div>
           </div>    
           <div className="form-group">
           <div className="col-sm-offset-2 col-sm-10">
           <button type="submit" className="btn btn-primary">Submit</button>
           </div>
           </div>
           </form>
           </Grid.Column>
           </Grid>
          </div>
        )
    }
}

export default ChangePassword;



