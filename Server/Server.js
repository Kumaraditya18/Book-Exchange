const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // ✅ Load .env

dotenv.config(); // ✅ Read .env variables

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000; // ✅ use PORT from env

// ✅ Use Atlas URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🟢 Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send(' Book Exchange API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
