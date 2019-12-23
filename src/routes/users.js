const express = require('express');
const router = express.Router();

const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users.controller');

router.get('/', getUsers)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

router.get('/:id', getUser)

module.exports = router