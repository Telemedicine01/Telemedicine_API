import mongoose  from 'mongoose';
import express from 'express';


//Make database connection
await mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch(err => console.log('error'))

const app = express();

app.listen(3000, () => console.log(`Server is listening on PORT 3000`)); 