import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import {config} from './config/config.js'
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'



const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin : config.CLIENT_URL ,
        credentials : true,
        methods :["POST" , "GET" , "PUT" , "DELETE" , "PATCH"]
    }
))



app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID : config.GOOGLE_CLIENT_ID ,
    clientSecret : config.GOOGLE_CLIENT_SECRET ,
    callbackURL : config.GOOGLE_CALLBACK_URL,   
} , (accessToken , refreshToken , profile , done) => {
    return done(null , profile)
}))




import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import wishlistRouter from './routes/wishlist.routes.js'
import orderRouter from './routes/order.routes.js'
import sellerRouter from './routes/seller.routes.js'
import locationRouter from './routes/location.routes.js'
import accountRouter from './routes/account.routes.js'


app.use('/api/auth' , authRouter)
app.use('/api/account' , accountRouter)
app.use('/api/products' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/wishlist' , wishlistRouter)
app.use('/api/orders' , orderRouter)
app.use('/api/seller' , sellerRouter)
app.use('/api/location' , locationRouter)



export default app