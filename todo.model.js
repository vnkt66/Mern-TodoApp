var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    todo_description: String,
    todo_responsible: String,
    todo_date: String,
    todo_priority: String,
    todo_completed: Boolean,
    user: String
});

module.exports = mongoose.model('Todo', todoSchema);