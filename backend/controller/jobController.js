import jobRequestModel from "../models/jobRequestModel";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobRequestModel.find({});
    res.json({ success: true, data:jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const { id } = req.body;

    const job = await jobRequestModel.findById(id);

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    res.json({success:true,data:job})
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getAllJobs };
