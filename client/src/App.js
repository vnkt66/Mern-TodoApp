import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import TodosList from './components/todos-list';
import EditTodo from './components/edit-todo';
import CreateTodo from './components/create-todo';
import Register from './components/Register';
import Login from './components/Login';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ChangePassword from './components/changepassword';

class App extends Component {
  state = {
    logged: false
  }
  componentDidMount() {
    var logged = localStorage.getItem('username') !== null;
    this.setState({
      logged: logged
    })
  }

  logout = () => {
     localStorage.removeItem('username');
     toast.notify("You are logged Out", {
      duration: 2000
    });
     window.location.reload(false);
  }
  render() {
    return (
        <div className="container">
         
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a className="navbar-brand" href="https://portfolio-66.firebaseapp.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-mandalorian"></i></a>
         <Link to="/" className="navbar-brand">Todo App</Link>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
              {
                !this.state.logged ?
                <li className="nav-item">
                  <Link to="/Register" className="nav-link">Register</Link> 
                </li> : ''
              }
              {
                !this.state.logged ?
                <li className="nav-item">
                  <Link to="/Login" className="nav-link">Login</Link> 
                </li> : ''
              }
              {
                this.state.logged ?  
                <li className="nav-item">
                <Link style={{position: 'relative', top: '12px'}} to="/" className="nav-link">Todos</Link>
                </li> : ''
              }
              {
                this.state.logged ?  
                <li className="nav-item">
                <Link to="/create" style={{position: 'relative', top: '12px'}} className="nav-link">Create Todo</Link> 
                </li> : ''
              }
              {
                this.state.logged ?
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img alt="" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" className="rounded-circle" />
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link to="/ChangePassword" className="dropdown-item">Change Password</Link>
                  <Link to="" className="dropdown-item" onClick={ this.logout }>Log Out</Link>
                </div>
              </li>  : '' 
              }
           </ul>
          </div>
      </nav>
         <Route path="/" exact component={TodosList}/>
         <Route path="/edit/:id" exact component={EditTodo}/>
         <Route path="/create" exact component={CreateTodo}/>
         <Route path="/Register" exact component={Register}/>
         <Route path="/Login" exact component={Login}/>
         <Route path="/ChangePassword" exact component={ChangePassword}/>
        </div>
    )
  }
}

export default App;
