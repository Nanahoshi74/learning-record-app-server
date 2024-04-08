const router = require("express").Router();
const User = require("../models/User");

//ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      password: req.body.password,
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

    const ValidPassword = req.body.password === user.password;

    if (!ValidPassword) return res.status(400).json("パスワードが違います");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
