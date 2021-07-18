import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import exphbs from 'express-handlebars';
import indexRouter from './routes/index';
import session from 'express-session';
import User from "./types/User";
// import bodyParser from "body-parser";
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// app.use(bodyParser.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs',exphbs({defaultLayout: 'main',extname:'hbs'}));
app.set('view engine','hbs');
app.use(express.static( path.join( __dirname,'..','public' ) ) );
app.use(session({
  secret: 'secrets',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

app.use('/',indexRouter);

app.listen(port);
