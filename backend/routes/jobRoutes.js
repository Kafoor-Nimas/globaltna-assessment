import express from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  updateStatus,
  deleteJob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getSingleJob);
jobRouter.post("/", createJob);
jobRouter.patch("/:id", updateStatus);
jobRouter.delete("/:id", deleteJob);

export default jobRouter;
