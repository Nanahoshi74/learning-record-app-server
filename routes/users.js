const router = require("express").Router();
const User = require("../models/User");

//とりあえず現在の機能だと使わなそうなのでコメントアウト。今後使うかも?一応残しておく

// //ユーザーの情報の更新
// router.put("/:id", async (req, res) => {
//   if (req.params.id === req.body.userId || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       });
//       res.status(200).json("ユーザ情報が更新されました");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("自分以外のアカウントの情報を更新できません");
//   }
// });

// //ユーザを削除
// router.delete("/:id", async (req, res) => {
//   if (req.params.id === req.body.userId || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("ユーザが削除されました");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("自分以外のアカウントを削除できません");
//   }
// });

// //ユーザ情報の取得
// router.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const username = req.query.username;

//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ username: username });
//     const { password, updatedAt, ...other } = user._doc;
//     return res.status(200).json(other);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

module.exports = router;
