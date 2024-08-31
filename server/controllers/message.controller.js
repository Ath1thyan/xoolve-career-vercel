import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        };

        await Promise.all([gotConversation.save(), newMessage.save()]);
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}

export const getMessage = async (req,res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}


// get only users with old conversation
export const getOldUsers = async (req, res) => {
    try {
        const senderId = req.id;
        const conversations = await Conversation.find({ participants: senderId }).populate("participants");

        const oldUsers = conversations
            .filter(conversation => conversation.messages.length > 0)
            .map(conversation => 
                conversation.participants.find(participant => participant._id.toString() !== senderId.toString())
            );

        return res.status(200).json(oldUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};