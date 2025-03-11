const userModel = require("../Models/userModel");

const addUser = async (req, res) => {
  const { name, FatherName, qualification, Gender, mobile } = req.body;
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).send({ message: "Mobile number must be 10 digits long." });
  }
  if (!name || !FatherName || !qualification || !Gender || !mobile) {
    return res.status(400).send({ message: "All fields are required" });
  }
  try {
    let userdata = await userModel.find({ mobile });

    if (userdata.length === 0) {
      userdata = await userModel({ name, FatherName, qualification, Gender, mobile }).save();
      res.status(201).send({ message: "User added successfully", data: userdata });
    } else {
      res.status(409).send({ message: "Mobile number already exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Request failed", error });
  }
};



const getUser = async (req, res) => {
  try {
    let userdata = await userModel.find({});
    res.status(200).send({ message: "success", data: userdata });
  } catch (error) {
    res.status(500).send({ message: "Request failed", error });
  }
};

const updateUser = async (req, res) => {
  const { mobile, name } = req.body;

  try {
    let userdata = await userModel.findOne({ mobile });

    if (userdata !== null) {
      userdata = await userModel.updateOne(
        { mobile },
        { $set: { name } }
      );
      res.status(200).send({ message: "User updated successfully", data: userdata });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Request failed", error });
  }
};

const deleteUser = async (req, res) => {
  const { mobile } = req.body;

  try {
    let userdata = await userModel.findOne({ mobile });

    if (userdata !== null) {
      await userModel.deleteOne({ mobile });
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Request failed", error });
  }
};

const login = async (req, res) => {
  try {
    const { name, mobile } = req.body;

 
    const userdata = await userModel.findOne({ mobile });

   
    if (userdata && userdata.name === name) {
      
      const token = userModel.generateToken(name, mobile); 

      return res.status(200).send({
        message: "Login successful",
        token: token,
      });
    } else {
      
      return res.status(400).send({
        message: "Login failed",
        error: "Invalid mobile or name",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};


module.exports = { addUser, getUser, updateUser, deleteUser, login };
