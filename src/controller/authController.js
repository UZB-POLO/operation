const User = require('../models/userModel');
<<<<<<< HEAD
const Account = require('../models/accountModel');
=======
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
<<<<<<< HEAD
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

=======
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
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
<<<<<<< HEAD
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = createToken(user);

=======

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 84f9b039bf7a007186110b6d1e932540048a32a3
