const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
const router = require('./routes');

=======
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD
app.use("/api", router);


=======

// Routes
const authRoutes = require('./routes/authRoutes');
const operationRoutes = require('./routes/operation');

app.use('/api/auth', authRoutes);
app.use('/api/operations', operationRoutes);
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));
