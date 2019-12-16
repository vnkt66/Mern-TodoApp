import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Segment, Header, Divider, Label } from 'semantic-ui-react';
import axios from 'axios';

const Todo = (props) => {
    const del = (id) => {
        axios.delete('http://localhost:5000/todos/delete/' + id).then((res) => {
          if(res.data.todo) {
            window.location.reload(false); 
          }
        })
    }
    return (
        <Card>
          <Card.Content>
            <Label as='a' color={props.todo_completed ? 'green' : 'red'} ribbon>
              {props.todo_completed ? 'completed': 'Pending'}
            </Label>
            <Card.Header>{props.todo_responsible}</Card.Header>
            <Card.Meta>{props.todo_date}</Card.Meta>
            <Card.Description>
              {props.todo_description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button as={Link} to={ "/edit/" + props.todo_id } basic color='green'>
                Edit
              </Button>
              <Button basic color='red' onClick={del.bind(this, props.todo_id)}>
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
    )
} 

class TodosList extends Component {
    _isMounted = false;
    state = {
        todos: []
    }

    componentDidMount() {
        this._isMounted = true;
        let logged = localStorage.getItem('username');
        if(logged === null) {
            this.props.history.push('/Login');
            window.location.reload('false');
        }
        axios.get('http://localhost:5000/todos/')
        .then((res) => {
            console.log(res.data);
            console.log(logged);
            let to = res.data.filter((todo) => {
               return todo.user === logged
            })
            console.log(to);
            if(this._isMounted) {
                this.setState({
                    todos: to
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentWillUnmount() {
       this._isMounted = false;
    }

    todoList = () => {
        return this.state.todos.map((todo) => {
                return (
                    <Todo
                     key={todo._id} 
                     todo_description={todo.todo_description}
                     todo_responsible={todo.todo_responsible}
                     todo_priority={todo.todo_priority}
                     todo_completed={todo.todo_completed}
                     todo_date={todo.todo_date}
                     todo_id={todo._id}
                     />
                );
            })
    }

    render() {
        return (
            <div>
                 <Segment inverted color='olive'>
                 <Header as='h2' textAlign='center' color='grey'>
                    Todos
                 </Header>
                 <Divider />
                 <Card.Group>
                   { this.todoList() }
                 </Card.Group>
                 </Segment>
            </div>
        );
    }
}

export default TodosList;