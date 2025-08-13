import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { create } from 'express-handlebars';
import passport, { session } from "passport";
import configurePassport from "./config/passport.js";

const hbs = create({ extname: '.hbs' });

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// View engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
routes(app);

export default app;