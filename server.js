const express = require('express');
const mongoose = require('mongoose');
// const methodOverride = require("method-override");
var moment = require('moment');
var router  = express.Router();

const app = express();
const bodyParser = require('body-parser');
const cors  = require('cors');
const PORT = 5000;
let Todo = require('./todo.model');
let User = require('./user.model');

app.use(bodyParser.json());

app.use(cors());
app.use('/todos', router);

mongoose.connect("mongodb://localhost/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`MongoDB database connection established successfully`);
})

router.get('/', (req, res) => {
   Todo.find((err, todos) => {
      if(err) {
          console.log(err);
      } else {
          console.log(todos);
          res.json(todos);
      }
   })
})

router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    })
})

router.post('/register', (req, res) => {
    // let user = req.body;
    // console.log(user);
    User.findOne({email: req.body.email}, (err, user) => {
       if(err) {
           console.log(err);
       } else if(!user) {
          console.log('user not found cr');
          console.log(user);
          User.create(req.body, (err, saveduser) => {
            if(err) {
            console.log(err);
            } else {
                console.log(saveduser);
                res.status(200).json({user: req.body.username});
            }
         })
       } else {
           console.log('user already exists');
           res.json({err: 'user already exists'});
       }
    })
})

router.post('/login', (req, res) => {
    let usermail = req.body.email;
    console.log(req.body.email);
    console.log('hello from login');
    User.findOne({email: req.body.email}, (err, user) => {
        console.log(user);
        if(err) {
            console.log(err);
        } else if(user) {
            res.json({loggeduser : user.username});
        } else {
            res.json({ err: 'something went wrong' });
        }
    })
})

router.put('/changepassword', (req, res) => {
    console.log(req.body);
    let userdata = req.body;
    console.log(userdata);
    User.findOneAndUpdate({ username: userdata.username}, { password: userdata.password}, (err, data) => {
      if(err) {
          console.log(err);
      } else {
          res.json({ userdata: data });
      }
    });

})

router.post('/add', (req, res) => {
    let todo = req.body;
    console.log(req.body);
    todo.todo_date = moment().format('lll');
    console.log(moment().format('lll'));
    console.log(todo);
    Todo.create(todo, (err, addedtodo) => {
        if(err) {
            console.log(err);
        } else {
            res.json({todo: 'Todo added Successfully!!!'});
        }
    })
})

router.put('/update/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            console.log(err);
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_date = moment().format('lll');
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then((todo) => {
                res.json('Todo Updated');
            })
            .catch((err) => {
               res.status(400).send('update not possible');
            })
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
       if(err) {
           console.log(err);
       } else {
           res.json({todo: todo});
       }
    })
})

app.listen(PORT, function() {
    console.log('SERVER STARTED', + PORT);
});