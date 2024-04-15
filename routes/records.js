const router = require("express").Router();
const Record = require("../models/Record");
const User = require("../models/User");

//その日にちに記録を追加、編集する
router.put("/add/:date", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const user = await User.findOne({ username: username });

    if (user.password === password) {
      const date = req.params.date;
      let record = await Record.findOne({
        $and: [{ date: date }, { userId: user._id }],
      });

      if (!record) {
        const newRecord = new Record({
          date: date,
          userId: user._id,
          studyTime: req.body.studyTime || {},
        });
        record = await newRecord.save();
      }

      const subject = req.body.subject;
      const subject_time = req.body.subject_time;
      record.studyTime[subject] = subject_time;
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
  const username = req.query.username;
  const password = req.query.password;

  try {
    const newRecord = new Record(req.body);
    const user = await User.findOne({ username: username });
    if (user.password === password && String(user._id) === req.body.userId) {
      const savedRecord = await newRecord.save();
      return res.status(200).json(savedRecord);
    } else {
      return res
        .status(403)
        .json("あなたは他人の記録を作成することができません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ユーザとdateからその日の記録を返す
router.get("/record/:date", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const user = await User.findOne({ username: username });
    if (user.password === password) {
      const date = req.params.date;
      const record = await Record.findOne({
        $and: [{ date: date }, { userId: user._id }],
      });
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

module.exports = router;
