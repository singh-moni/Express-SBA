const express = require('express');
const app = express();
const PORT = 3600;

// Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
};

app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample questions data
let questions = [
    { id: 1, question: 'What continet in Mt. Everest in?', answer: 'Asia' },
    { id: 2, question: 'What is the term of US President (in years)?', answer: '4' },
    { id: 4, question: 'What is study of organisms called?', answer: 'Biology' },
    { id: 3, question: 'What is the name of the galaxy nearest of Milky Way?', answer: 'Andromeda' }
];

// Routes
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.post('/api/submit', (req, res) => {
    const { id, answer } = req.body;
    const question = questions.find(q => q.id === id);
    if (!question) {
        return res.status(404).send('Question not in the Question bank.');
    }
    if (question.answer === answer) {
        res.send('Correct!');
    } else {
        res.send('Incorrect!');
    }
});

// User route
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Comment route
const commentRoutes = require('./routes/comments');
app.use('/comments', commentRoutes);

// Add user route
const addUserRoutes = require('./routes/user');
app.use('/users', addUserRoutes);



// Root route handler
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App!');
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
