const RedisStore = require('connect-redis').default;
const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client
  .connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch(console.error);

// Initialize store.
const sessionConfig = {
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
};

module.exports = {
  sessionConfig,
};
