const router = require("express").Router();
const Record = require("../models/Record");
const User = require("../models/User");

//記録を作成する
router.post("/", async (req, res) => {
  const newRecord = new Record(req.body);
  try {
    const savedRecord = await newRecord.save();
    return res.status(200).json(savedRecord);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//記録を更新する
router.put("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (record.userId === req.body.userId) {
      await record.updateOne({
        $set: req.body,
      });
      return res.status(200).json(record);
    } else {
      return res.status(403).json("他人の記録は編集できません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ここより下、ログインしている本人以外見えてはいけないから変える必要あいそう

//記録の取得
// router.get("/:id", async (req, res) => {
//   try {
//     const record = await Record.findById(req.params.id);
//     return res.status(200).json(record);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//ホームでの全ての記録の取得;
router.get("/all/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user.password === req.body.password) {
      const records = await Record.find({ userId: user._id });
      return res.status(200).json(records);
    } else {
      return res.status(403).json("あなたは他人の記録を見ることはできません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
// router.get("/all/:username", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     const records = await Record.find({ userId: user._id });
//     return res.status(200).json(records);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//日付と名前からその人の記録を取得する
// router.get("/study/:/:date", async (req, res) => {
//   try {
//     // const record = await
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

module.exports = router;
