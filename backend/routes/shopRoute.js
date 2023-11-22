const express = require("express");
const router = express.Router();

const shopController = require("../controller/shopController");

router.post("/shop", shopController.Addshop);
router.get("/shop", shopController.getshops);
router.put("/shop/:id", shopController.editshop);
router.get("/shops/ids", shopController.getshopsId);
router.get("/shop/:id", shopController.getshop);
router.get("/shopsUser/:id", shopController.getshopByUserId);
router.delete("/shops/:id", shopController.delshop);

module.exports = router;
