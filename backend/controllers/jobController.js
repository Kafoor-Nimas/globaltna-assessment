import jobRequestModel from "../models/jobRequestModel.js";

const getAllJobs = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    const jobs = await jobRequestModel.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobRequestModel.findById(id);

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    } = req.body;

    if (!title || !description) {
      return res.json({
        success: false,
        message: "title and description are required",
      });
    }

    const job = await jobRequestModel.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    res.json({ success: true, data: job });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["Open", "In Progress", "Closed"];

    if (!status) {
      return res.json({ success: false, message: "status is required" });
    }

    if (!allowed.includes(status)) {
      return res.json({
        success: false,
        message: `status must be one of: ${allowed.join(", ")}`,
      });
    }

    await jobRequestModel.findByIdAndUpdate(id, { status });
    res.json({ success: true, message: "Status updated succefully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    await jobRequestModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getAllJobs, getSingleJob, createJob, updateStatus, deleteJob };
