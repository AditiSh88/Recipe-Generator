// auth.js (Backend)
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Assuming User is a MongoDB model

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();
  const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
