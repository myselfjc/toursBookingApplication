const fs = require('fs');
const User = require('./../models/userModel');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  }catch(err){
    return res.json({
      status: 'failed',
      error: 'Invalid ID',
    });
  }
};

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(users),
    (error) => console.log(error)
  );
  res.status(201).json({
    status: 'Success',
    data: {
      users,
    },
  });
};

exports.getUserById = (req, res) => {
  const user = users.find((el) => el.id === +req.params.id);
  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  if (+req.params.id >= users.length) {
    const user = User.find
    return res.json({
      status: 'failed',
      error: 'Invalid ID',
    });
  }
};
