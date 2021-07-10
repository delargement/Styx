import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import exphbs from 'express-handlebars';
dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.engine('hbs',exphbs({defaultLayout: 'main',extname:'hbs'}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');


app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port);
