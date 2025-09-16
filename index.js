const express = require('express')
const app = express()
const userRouter = require('./routes/userRouter')
const postRouters = require('./routes/postRouter')
// const {PrismaClient} = require('@prisma/client');
// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use('/user',userRouter)
app.use('/post',postRouters)

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})