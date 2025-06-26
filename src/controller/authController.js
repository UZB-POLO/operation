const User = require('../models/userModel');
const Account = require('../models/accountModel'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const { branch, masterBranch, name, surName, lastName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      branch,
      masterBranch,
      name,
      surName,
      lastName,
      username,
      fullName: `${surName} ${name} ${lastName}`,
      password: hashedPassword
    });

    const token = createToken(user);

    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = createToken(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
