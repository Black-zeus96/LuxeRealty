import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

/// Update user info
export const updateUserInfo = async(req, res, next)  => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, "Unauthorized Access"))
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUserInfo = await User.findByIdAndUpdate(req.params.id,{
        $set:{
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      },{new: true})
      const {password, ...info} = updatedUserInfo._doc;
      res.status(200).json(info)
     } catch (error) {
        return next(errorHandler(500, "Internal Server Error"));
      }

  
};
