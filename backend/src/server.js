import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';

// connect db
connectDB();

// start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

