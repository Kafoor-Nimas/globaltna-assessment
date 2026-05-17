import jobRequestModel from "../models/jobRequestModel";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobRequestModel.find({});
    res.json({ success: true, data: jobs });
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
      contactDetails,
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
    const { status, id } = req.body;

    if (!status) {
      return res.json({ success: false, message: "status is required" });
    }

    await jobRequestModel.findByIdAndUpdate(id, { status });
    res.json({ success: true, message: "Status updated succefully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteJob = async(req,res)=>{
  try {
    const {id}=req.body

    await jobRequestModel.findOneAndDelete(id)

    res.json({success:true,message:"Job deleted successfully"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { getAllJobs, getSingleJob ,createJob,updateStatus,deleteJob};
