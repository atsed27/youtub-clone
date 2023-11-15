import mongoose from 'mongoose';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import { CreateError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
  } catch (error) {
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(CreateError(404, 'user is not found'));
    }
    const passIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passIsCorrect) {
      return next(CreateError(400, 'password is incorrect'));
    }

    //send token;
    const token = jwt.sign({ id: user._id }, process.env.Jwt_S);
    const { password, ...others } = user._doc;
    res
      .cookie('tokenye', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async () => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.Jwt_S);
      res
        .cookie('tokenye', token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const saveUser = await newUser.save();
      const token = jwt.sign({ id: saveUser._id }, process.env.Jwt_S);
      res
        .cookie('tokenye', token, {
          httpOnly: true,
        })
        .status(200)
        .json(saveUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
