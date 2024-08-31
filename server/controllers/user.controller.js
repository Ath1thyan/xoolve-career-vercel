import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, role } = req.body;
        if (!firstName || !lastName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // const file = req.file;
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            // profile:{
            //     profilePhoto:cloudResponse.secure_url,
            // }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${user.firstName}`,
            user,
            token,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const skillsArray = skills ? skills.split(",") : undefined;

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating user data
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // save the Cloudinary URL
            user.profile.resumeOriginalName = file.originalname; // save the original file name
        }

        // Create a new notification
        await Notification.create({
            user: user._id,
            type: "Profile Update",
            message: `Your profile was updated successfully on ${new Date().toLocaleDateString()}`,
            seen: false,
            clickPath: "/"
        });

        await user.save();

        // Sanitizing user object to exclude sensitive data before sending back in response
        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};


export const getUserInfoById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }
        user.password = undefined;
        return res.status(200).json({
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        })
    }
}

// Mark all notifications as seen
export const markAllNotificationsAsSeen = async (req, res) => {
    try {
        await Notification.updateMany({ user: req.id, seen: false }, { seen: true });

        return res.status(200).json({
            message: "All notifications marked as seen successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

// Delete all notifications
export const deleteAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany();

        return res.status(200).json({
            message: "All notifications deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

// Mark a single notification as seen
export const markSingleNotificationAsSeen = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);

        if (!notification || notification.user.toString() !== req.id) {
            return res.status(404).json({
                message: "Notification not found or you don't have permission to access it.",
                success: false
            });
        }

        notification.seen = true;
        await notification.save();

        return res.status(200).json({
            message: "Notification marked as seen successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

// Delete a single notification
export const deleteSingleNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);

        if (!notification || notification.user.toString() !== req.id) {
            return res.status(404).json({
                message: "Notification not found or you don't have permission to delete it.",
                success: false
            });
        }

        await notification.deleteOne();

        return res.status(200).json({
            message: "Notification deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

// Fetch unseen notifications
export const getUnseenNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.id, seen: false });
        return res.status(200).json({
            notifications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

// Fetch seen notifications
export const getSeenNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.id, seen: true });
        return res.status(200).json({
            notifications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

// Get count of unseen notifications for the current user
export const getUnseenNotificationsCount = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Count unseen notifications for the user
        const unseenCount = await Notification.countDocuments({
            userId,
            seen: false
        });

        res.status(200).json({ count: unseenCount });
    } catch (error) {
        console.error("Error fetching unseen notifications count:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


// For message feature
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}