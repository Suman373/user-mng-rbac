const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/users');
const roleRoute = require('./routes/roles');
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI  || "";


app.use(cors({origin:'*'}));
app.use(express.urlencoded({limit:'1mb', extended:true}));
app.use(express.json());

// api routes
app.use("/users", userRoute);
app.use('/roles',roleRoute);

// catch all
app.use('/',(req,res)=>{
    res.send('Welcome to RBAC backend server');
});



// db connection
const connectDB = async()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();

app.listen(PORT, ()=> console.log(`Server is listening to port ${PORT}`));