import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);

    // Start server
    app.listen(PORT, () => {
      console.log(
        `✅ Server running on port ${PORT} [${process.env.NODE_ENV || "development"
        }]`
      );
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
