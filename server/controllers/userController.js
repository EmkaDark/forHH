require("dotenv").config();
const bcript = require("bcryptjs");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
class Admin {
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await UserModel.findOne({ login });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const isPasswordCorrect = await bcript.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res
          .status(404)
          .json({ message: "неправильный логин или пароль!" });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const SUser = {
        username: user.username,
        surname: user.surname,
        other: user.other,
        login: user.login,
        token,
      };
      console.log(SUser);
      res.json({ SUser, token });
    } catch (err) {
      res.json({ message: "error" });
    }
  }

  async register(req, res) {
    try {
      const { login, password, username, surname, other } = req.body;
      console.log(login, password, username, surname, other);
      const user = await UserModel.findOne({ login });
      if (user) {
        return res.json({
          message: "Пользователь с таким логином уже существует!",
        });
      }

      const salt = bcript.genSaltSync(10);

      const hashPassword = bcript.hashSync(password, salt);

      const newUser = await UserModel.create({
        username,
        login,
        surname,
        other,
        password: hashPassword,
      });
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const SUser = {
        username: newUser.username,
        surname: newUser.surname,
        other: newUser.other,
        login: newUser.login,
      };
      console.log(SUser);
      res.json({ SUser, token });
    } catch (error) {
      res.json({ message: "error" });
    }
  }

  async getMe(req, res) {
    try {
      const user = await UserModel.findById({ _id: req.userId });

      if (!user) {
        return res.json({ message: "Такого пользователя не существует!" });
      }

      const SUser = {
        username: user.username,
        surname: user.surname,
        other: user.other,
        login: user.login,
      };
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.json({ SUser, token });
    } catch (error) {
      res.json({ message: "error" });
    }
  }
}

module.exports = new Admin();
