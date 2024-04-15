const router = require("express").Router();
const { findOne } = require("../models/Record");
const User = require("../models/User");
const bccrypt = require("bcrypt");

//ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const isexist = await User.findOne({ username: req.body.username });
    if (isexist) {
      return res.status(200).json("exist");
    }
    const hashed_password = await bccrypt.hashSync(req.body.password, 10);
    const newUser = await new User({
      username: req.body.username,
      password: hashed_password,
    });

    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ログイン
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("存在しないユーザーです");

    const isequal_password = await bccrypt.compare(
      req.body.password,
      user.password
    );

    if (!isequal_password) return res.status(400).json("パスワードが違います");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
