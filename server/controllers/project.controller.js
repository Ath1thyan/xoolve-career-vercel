import { Project } from "../models/project.model.js";

// recruiter posting projects
export const postProject = async (req, res) => {
    try {
        const { title, description, requirements, budget, location, duration, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !budget || !location || !duration || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const project = await Project.create({
            title,
            description,
            requirements: requirements.split(","),
            budget: Number(budget),
            location,
            duration,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New project created successfully.",
            project,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// freelancers getting projects list
export const getAllProjects = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const projects = await Project.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!projects) {
            return res.status(404).json({
                message: "Projects not found.",
                success: false
            })
        };
        return res.status(200).json({
            projects,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// freelancer
export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate({
            path:"bids"
        });
        if (!project) {
            return res.status(404).json({
                message: "Projects not found.",
                success: false
            })
        };
        return res.status(200).json({ project, success: true });
    } catch (error) {
        console.log(error);
    }
}
// Projects posted by recruiter
export const getAdminProjects = async (req, res) => {
    try {
        const adminId = req.id;
        const projects = await Project.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!projects) {
            return res.status(404).json({
                message: "Projects not found.",
                success: false
            })
        };
        return res.status(200).json({
            projects,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// recruiter deleting a project
export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
                success: false
            })
        };
        return res.status(200).json({
            message: "Project deleted successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
