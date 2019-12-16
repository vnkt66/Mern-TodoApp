import React, { Component } from 'react';
import axios from 'axios';

class CreateTodo extends Component {
    state = {
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false,
        user: ''
    }

    componentDidMount() {
        if(localStorage.getItem('username') === null) {
            this.props.history.push('/Login');
            window.location.reload(false);
        } else {
            this.setState({
                user: localStorage.getItem('username')
            })
        }
    }

    onChangeTodoDescription = (event) => {
       this.setState({
           todo_description: event.target.value
       })
    }

    onChangeTodoResponsible = (event) => {
        this.setState({
            todo_responsible: event.target.value
        })
     }

    onChangeTodoPriority = (event) => {
        this.setState({
            todo_priority: event.target.value
        })
     }

    onSubmit = (event) => {
        event.preventDefault();

        console.log(`Form Submitted`);
        console.log(this.state.todo_description);
        console.log(this.state.todo_responsible);
        console.log(this.state.todo_priority);
        console.log(this.state.todo_completed);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
            user: this.state.user
        }

        axios.post('http://localhost:5000/todos/add', newTodo)
        .then((res) => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
        })

        this.props.history.push('/');
        window.location.reload(false);
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
               <h3>Create New Todo</h3>
               <form onSubmit={this.onSubmit}> 
                  <div className="form-group">
                   <label htmlFor="forResponsible">Title:</label>
                   <input 
                   type="text" 
                   className="form-control" 
                   id="forResponsible" 
                   value={this.state.todo_responsible}
                   onChange={this.onChangeTodoResponsible}/>
                  </div>
                  <div className="form-group">
                  <label for="forDesc">Description</label>
                  <textarea 
                   className="form-control" 
                   id="forDesc" 
                   value={this.state.todo_description}
                   onChange={this.onChangeTodoDescription}
                   rows="3"></textarea>
                  </div> 
                  <div className="form-group">
                  <div className="form-check form-check-inline">
                   <input 
                   className="form-check-input" 
                   type="radio" 
                   name="priorityOptions" 
                   id="priorityLow" 
                   value="Low"
                   checked={this.state.todo_priority==='Low'} 
                   onChange={this.onChangeTodoPriority}
                   />
                   <label className="form-check-label" htmlFor="priorityLow">
                    Low
                   </label>
                   </div>
                   <div className="form-check form-check-inline">
                   <input 
                   className="form-check-input" 
                   type="radio" 
                   name="priorityOptions" 
                   id="priorityMedium" 
                   value="Medium"
                   checked={this.state.todo_priority==='Medium'} 
                   onChange={this.onChangeTodoPriority}
                   />
                   <label className="form-check-label" htmlFor="priorityMedium">
                    Medium
                   </label>
                   </div>

                   <div className="form-check form-check-inline">
                   <input 
                   className="form-check-input" 
                   type="radio" 
                   name="priorityOptions" 
                   id="priorityHigh" 
                   value="High"
                   checked={this.state.todo_priority==='High'} 
                   onChange={this.onChangeTodoPriority}
                   />
                   <label className="form-check-label" htmlFor="priorityHigh">
                    High
                   </label>
                   </div>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary"/>
                  </div>
               </form>
            </div>
        );
    }
}

export default CreateTodo;