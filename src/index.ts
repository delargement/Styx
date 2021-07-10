import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import exphbs from 'express-handlebars';
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

app.get('/', (req, res) => {
  res.render('login',{
    title: 'Login',
  });
});

app.listen(port);
