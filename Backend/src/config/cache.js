import "dotenv/config";
import Redis from "ioredis";


const redis = Redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,   
})


redis.on("connect", () => {
    console.log("Connected to Redis");
  });
  
redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});
  

export default redis
