import express from "express";
const router = express.Router();

import {
  AddDoctor,
  delDoctor,
  editDoctor,
  getDoctor,
  getDoctorByUserId,
  getDoctors,
  getDoctorsId,
} from "../controllers/doctor";

router.post("/doctor/add", AddDoctor);

router.get("/doctors", getDoctors);
router.put("/doctor/:id", editDoctor);
router.get("/doctors/ids", getDoctorsId);
router.get("/doctor/:id", getDoctor);
router.get("/doctors/ids", getDoctorsId);
router.get("/doctorsUser/:id", getDoctorByUserId);

router.delete("/doctors/:id", delDoctor);
module.exports = router;
