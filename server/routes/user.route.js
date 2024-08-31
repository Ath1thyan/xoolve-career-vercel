import express from "express";
import { login, logout, register, updateProfile, getUserInfoById, markAllNotificationsAsSeen, deleteAllNotifications, markSingleNotificationAsSeen, deleteSingleNotification, getUnseenNotifications, getSeenNotifications, getOtherUsers, getUnseenNotificationsCount } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import multer from 'multer';
const upload = multer();
 
const router = express.Router();

router.route("/register").post(upload.none(), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/get/user/:id").get(isAuthenticated, getUserInfoById);
router.route("/other-users").get(isAuthenticated,getOtherUsers);


// Notification routes
router.route("/notifications/mark-all-seen").post(isAuthenticated, markAllNotificationsAsSeen);
router.route("/notifications/delete-all").delete(isAuthenticated, deleteAllNotifications);
router.route("/notifications/mark-seen/:id").post(isAuthenticated, markSingleNotificationAsSeen);
router.route("/notifications/delete/:id").delete(isAuthenticated, deleteSingleNotification);

router.route("/notifications/unseen").get(isAuthenticated, getUnseenNotifications);
router.route("/notifications/seen").get(isAuthenticated, getSeenNotifications);
router.route("/notifications/unseen-count").get(isAuthenticated, getUnseenNotificationsCount);


export default router;