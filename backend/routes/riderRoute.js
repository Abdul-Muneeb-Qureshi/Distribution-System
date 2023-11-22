const express = require("express");
const router = express.Router();

const riderController = require("../controller/riderController");

router.post("/rider", riderController.Addrider);
router.get("/rider", riderController.getriders);
router.put("/rider/:id", riderController.editrider);
router.get("/riders/ids", riderController.getridersId);
router.get("/rider/:id", riderController.getrider);
router.get("/ridersUser/:id", riderController.getriderByUserId);
router.delete("/riders/:id", riderController.delrider);

module.exports = router;
