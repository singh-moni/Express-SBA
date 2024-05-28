
const express = require('express');
const router = express.Router();
const commentData = require('../data/commentData');

router.get('/', (req, res) => {
  const comments = commentData.getAllComments();
  res.json(comments);
});

router.post('/', (req, res) => {
  const { quizId, userId, text } = req.body;
  const newComment = commentData.createComment(quizId, userId, text);
  res.status(201).json(newComment);
});

module.exports = router;