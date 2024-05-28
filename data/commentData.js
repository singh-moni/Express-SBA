const Comment = require('../models/Comment.js');

let comments = [

    { quizId: 10, userId: 1, text: 'How to kill a mocking bird' },
    { quizId: 20, userId: 5, text: 'Jack of all trades, master of none' },
    { quizId: 30, userId: 3, text: 'A stitch in time saves nine' },
    { quizId: 40, userId: 2, text: 'The monk who sold his ferrari' },
    { quizId: 50, userId: 4, text: 'An evening in Paris' }
];

module.exports = {
  getAllComments: () => comments,
  createComment: (quizId, userId, text) => {
    const newComment = new Comment(comments.length + 1, quizId, userId, text);
    comments.push(newComment);
    return newComment;
  }
};
      