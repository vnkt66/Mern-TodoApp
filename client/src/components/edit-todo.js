import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
    state = {
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    }

    componentDidMount() {
        if(localStorage.getItem('username') === null) {
          this.props.history.push('/Login');
          window.location.reload(false);
        }
        axios.get('http://localhost:5000/todos/'+ this.props.match.params.id)
        .then((resp) => {
           this.setState({
               todo_description: resp.data.todo_description,
               todo_responsible: resp.data.todo_responsible,
               todo_priority: resp.data.todo_priority,
               todo_completed: resp.data.todo_completed
           })
        })
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

    onChangeTodoCompleted = (event) => {
       this.setState((prevState) => {
           return {
               todo_completed: !prevState.todo_completed
           }
       })   
    }

    onSubmit = (event) => {
        event.preventDefault();

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        axios.put('http://localhost:5000/todos/update/' + this.props.match.params.id, newTodo)
        .then((res) => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
               <h3>Edit Todo</h3>
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

                   <div className="form-check">
                   <input 
                   className="form-check-input" 
                   type="checkbox" 
                   name="completedCheckbox" 
                   id="completedCheckbox" 
                   checked={this.state.todo_completed} 
                   onChange={this.onChangeTodoCompleted}
                   value={this.state.todo_completed}
                   />
                   <label className="form-check-label" htmlFor="completedCheckbox">
                     Completed
                   </label>
                   </div>

                  </div>
                  <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary"/>
                  </div>
               </form>
            </div>
        );
    }
}

export default EditTodo;