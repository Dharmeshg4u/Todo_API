const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
const { Todo, getAllTodos, getTodoById, createTodo, updateTodoById, deleteTodoById } = require('../models/Todo');

function getAllTodosHandler(req, res) {
    const todos = getAllTodos();
    res.json(todos);
}

function getTodoByIdHandler(req, res) {
    const { id } = req.params;
    const todo = getTodoById(id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Todo not found' });
    }
}

function createTodoHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { title, completed } = req.body;
    const id = Date.now().toString();
    const newTodo = new Todo(id, title, completed);
    createTodo(newTodo);
    res.status(httpStatus.CREATED).json(newTodo);
}

function updateTodoByIdHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = new Todo(id, title, completed);
    if (updateTodoById(id, updatedTodo)) {
        res.json(updatedTodo);
    } else {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Todo not found' });
    }
}

function deleteTodoByIdHandler(req, res) {
    const { id } = req.params;
    deleteTodoById(id);
    res.sendStatus(httpStatus.NO_CONTENT);
}

module.exports = { getAllTodos: getAllTodosHandler, getTodoById: getTodoByIdHandler, createTodo: createTodoHandler, updateTodoById: updateTodoByIdHandler, deleteTodoById: deleteTodoByIdHandler };