import { Bid } from "../models/bid.model.js";
import { Project } from "../models/project.model.js";
import { Notification } from "../models/notification.model.js";

export const bidProject = async (req, res) => {
    try {
        const userId = req.id;
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(400).json({
                message: "Project id is required.",
                success: false
            })
        };
        // check if the user has already bid for the project
        const existingBid = await Bid.findOne({ project: projectId, applicant: userId });

        if (existingBid) {
            return res.status(400).json({
                message: "You have already raised bid for this project",
                success: false
            });
        }

        // check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found",
                success: false
            })
        }
        // create a new bid
        const newBid = await Bid.create({
            project:projectId,
            applicant:userId,
        });

        // Create a notification for the recruiter
        const notification = await Notification.create({
            user: project.created_by, // Recruiter's user ID
            type: 'Project Bid',
            message: `A user has raised a bid for your project titled '${project.title}'.`,
            companyId: project.company,
            clickPath: `/admin/projects/${projectId}`
        });

        project.bids.push(newBid._id);
        await project.save();
        return res.status(201).json({
            message:"Project bidded successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getBiddedProjects = async (req,res) => {
    try {
        const userId = req.id;
        const bid = await Bid.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'project',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!bid){
            return res.status(404).json({
                message:"No Bids",
                success:false
            })
        };
        return res.status(200).json({
            bid,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// number of user bid for the project - recruiter
export const getbids = async (req,res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate({
            path:'bids',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!project){
            return res.status(404).json({
                message:'Project not found.',
                success:false
            })
        };
        return res.status(200).json({
            project, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const bidId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the bid by bid id
        const bid = await Bid.findOne({_id:bidId});
        if(!bid){
            return res.status(404).json({
                message:"Bid not found.",
                success:false
            })
        };

        // update the status
        bid.status = status.toLowerCase();
        await bid.save();

        // Create a notification for the applicant
        const notification = await Notification.create({
            user: bid.applicant._id, // Applicant's user ID
            type: 'Application Status Update',
            message: `The status of your bid for the project has been updated to '${bid.status}'.`,
            companyId: bid.project.company,
            clickPath: '/my-bids'
        });

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}