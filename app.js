import express from 'express';
import path from 'path';
import nocache from 'nocache';
import userRoute from './Route/userRouter.js';
import db from './config/db.js';
import { fileURLToPath } from 'url';
import session from 'express-session';
// import adminRoute from './Route/adminRouter.js';
const app = express();
app.use(nocache())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views/user'),
  path.join(__dirname, 'views/admin'),
]);

app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use('/', userRoute);
// app.use('/admin', adminRoute);

db();
app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
     