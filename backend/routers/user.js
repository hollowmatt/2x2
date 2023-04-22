const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { user_email, user_password } = req.body;
  console.log('req.body: ', req.body);

  let user = await User.findOne({ user_email });
  if(user) {
    return res.status(400).send('User with that email already exists');
  }

  try {
    user = new User(req.body);
    user.user_password = bcrypt.hashSync(user_password, 8);
    await user.save();
    res.status(201).send();
  } catch(e) {
    console.log(e);
    res.status(500).send('uh-oh, something went wrong... try again later: ');
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ user_email: req.body.user_email});
    if(!user) {
      return res.status(400).send('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );

    if(!isMatch) {
      return res.status(400).send('Invalid credentials.');
    }

    const { user_password, ...rest } = user.toObject();
    return res.send(rest);
  } catch(err) {
    return res.status(500).send('Something went awry');
    console.log("error in the system: ", err);
  }
});

module.exports = router;