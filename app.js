const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { getSecret } = require('./config/secrets');

dotenv.config();

(async () => {

    // Retrieve secrets and set them as global environment variables
    await getSecret();

    // Initialize Express
    const app = express();

    // Body parser middleware
    app.use(express.json());

    // Connect to MongoDB
    connectDB();

    // Use routes
    app.use('/api/auth', authRoutes);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})();