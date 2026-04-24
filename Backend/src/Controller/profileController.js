import { Register } from "../Model/RegisterModel.js"
import { validationResult, matchedData } from "express-validator";

const Getallprofile = async (req, res) => {
    try {
        const user = await Register.find({},{
            Password:0,
            Phone:0,
            createdAt:0,
            updatedAt:0,
            __v:0
        })
       return  res.status(200).json({ message: "Sucessfully Get all profile", user: user })
    } catch (err) {
        return res.status(404).json({ message: "server error", err })
    }
}

export default Getallprofile


export const updateProfile = async (req, res) => {
  try {

    // ✅ validation check
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return res.status(400).json({
        error: validation.array(),
        message: "Validation failed",
      });
    }

    // ✅ get id
    const { id } = req.params;

    // ✅ check user exists
    const user = await Register.findOne({ _id: id });
console.log(user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ get validated fields
    const { Name, Bio } = matchedData(req);

    // ✅ image upload handling
    const profileImage = req.file ? req.file.filename : null;

    const updatedData = {
      ...(Name && { Name }),
      ...(Bio && { Bio }),
      ...(profileImage && {
        profilePic: `http://localhost:3000/Upload/${profileImage}`,
      }),
    };

    // ✅ update user
    const updatedUser = await Register.findByIdAndUpdate(
        id,
      updatedData,
      { new: true }
    );
    console.log(updatedUser);
    

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};