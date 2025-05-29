import express from 'express';
import path from 'path';
import nocache from 'nocache';
import userRoute from './Route/userRouter.js';
import { fileURLToPath } from 'url';
// import adminRoute from './Route/adminRouter.js';
const app = express();

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views/user'),
  path.join(__dirname, 'views/admin'),
]);
app.use('/', userRoute);
// app.use('/admin', adminRoute);

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
