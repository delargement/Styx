import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import exphbs from 'express-handlebars';
import indexRouter from './routes/index';
import session from 'express-session';
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs',exphbs({defaultLayout: 'main',extname:'hbs'}));
app.set('view engine','hbs');
app.use(express.static( path.join( __dirname,'..','public' ) ) );
app.use(cookieParser());
app.use(session({
  secret: 'secrets',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));


app.use('/',indexRouter);

app.listen(port);
