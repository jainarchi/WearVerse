import dotenv from 'dotenv'
dotenv.config()



if( ! process.env.MONGO_URI){
    throw new Error('Mongo URI not defined in environment variables') 
}

if(! process.env.JWT_SECRET_KEY){
    throw new Error('JWT secret key not defined in environment variables')
}

if(! process.env.GOOGLE_CLIENT_ID || ! process.env.GOOGLE_CLIENT_SECRET){
    throw new Error('Google client ID or secret not defined in environment variables')
}


if(! process.env.GOOGLE_CALLBACK_URL){
    throw new Error('Google callback URL not defined in environment variables')
}

if(! process.env.IMAGE_KIT_PRIVATE_KEY){
    throw new Error('Image kit private key not defined in environment variables')
}

if( ! process.env.REDIS_HOST || ! process.env.REDIS_PORT || ! process.env.REDIS_PASSWORD){
    throw new Error('Redis configuration not defined in environment variables')
}

if( ! process.env.RAZORPAY_KEY_ID && ! process.env.RAZORPAY_KEY_SECRET){
    throw new Error('Razorpay key secret not defined in environment variables')
}

if(! process.env.CLIENT_URL){
    throw new Error('Client URL not defined in environment variables')
}



export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY,
    RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID ,
    RAZORPAY_KEY_SECRET:process.env.RAZORPAY_KEY_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    CLIENT_URL: process.env.CLIENT_URL
}