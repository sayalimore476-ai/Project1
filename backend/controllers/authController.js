const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
    try {
    const {name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new User({
    name,
    email,
    password: hashedPassword,
   });
   await newUser.save();
   res.status(201).json({ message: "User registered successfully" });
} catch (err) {
    res.status(500).json({ message: "Server error" });
}
};

//Login calling
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing Email or Password" });
        }
        
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user: existingUser });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get user from data
exports.getUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        // this --password is used to hide pasword from the response
        res.status(200).json(users);
    } catch (err) {
        console.error("getUsers error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// update user

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate
        (id, 
            { name, email }, 
            { new: true }
        ).select("-password");

        res.status(200).json({ updatedUser });
    } catch (err) {
        console.error("updateUser error:", err);
        res.status(500).json({ message: "Server error" });
    }   
}; 

//Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("deleteUser error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

//Image storing and retriving
exports.uploadProfileImage = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { profileImage: req.file.path },
            { new: true }
        );
        res.json(user);
    }    catch (err) {
        console.error("uploadProfileImage error:", err);
        res.status(500).jspn({ message: "Image Upload failed" });

        }
                 
};