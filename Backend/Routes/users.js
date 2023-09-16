const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      
      return res
        .status(409)
        .send({ message: "user with given email already exists!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const example = new User({ ...req.body, password: hashPassword })

    await example.save();

    console.log(example);
    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
