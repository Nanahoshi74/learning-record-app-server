const router = require("express").Router();
const Record = require("../models/Record");
const User = require("../models/User");

//その日にちに記録を追加する
router.put("/add/:date", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const user = await User.findOne({ username: username });

    if (user.password === password) {
      const date = req.params.date;
      const record = await Record.findOne({ date: date });

      const subject = req.body.subject;
      const subject_time = req.body.subject_time;
      record.studyTime[subject] = subject_time;
      // const newRecord = record;
      await record.updateOne({
        studyTime: record.studyTime,
      });
      return res.status(200).json(record);
    } else {
      return res.status(403).json("他の人の記録に追加できません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

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

//ユーザとdateからその日の記録を返す
router.get("/record/:date", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const user = await User.findOne({ username: username });
    if (user.password === password) {
      const date = req.params.date;
      const record = await Record.findOne({ date: date });
      return res.status(200).json(record);
    } else {
      return res.status(403).json("あなたは他人の記録を見ることはできません");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

//ホームでの全ての記録の取得;
router.get("/all", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const user = await User.findOne({ username: username });
    if (user.password === password) {
      const records = await Record.find({ userId: user._id });
      return res.status(200).json(records);
    } else {
      return res.status(403).json("あなたは他人の記録を見ることはできません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//記録の取得;
router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    return res.status(200).json(record);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
