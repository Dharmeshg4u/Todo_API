const express = require('express');
const router = express.Router();
const { getAllTodos, getTodoById, createTodo, updateTodoById, deleteTodoById } = require('../controllers/todoController');
const { check } = require('express-validator');

router.get('/', getAllTodos);

router.get('/:id', getTodoById);

router.post('/', [
    check('title').notEmpty(),
    check('completed').isBoolean()
], createTodo);

router.put('/:id', [
    check('title').optional().notEmpty(),
    check('completed').optional().isBoolean()
], updateTodoById);

router.delete('/:id', deleteTodoById);

module.exports = router;