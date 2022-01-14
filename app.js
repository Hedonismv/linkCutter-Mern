const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const corsMiddleware = require('./middleware/cors.middleware');
const app = express()


//To parse the backend message
app.use(express.json())

//Middlewares
app.use(corsMiddleware)

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

//production
if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    } )
}


const PORT = config.get('port') || 4000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log('hello zaebal', PORT))
    }catch (e){
        console.log('Server error',e)
        process.exit(1)
    }
}

start()
