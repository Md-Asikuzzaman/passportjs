import express from 'express';
import router from './routes/index.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import './config/passportConfig.js';

const port = 8080;
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and use it with sessions
app.use(passport.initialize());
app.use(passport.session());

// Use your router
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
