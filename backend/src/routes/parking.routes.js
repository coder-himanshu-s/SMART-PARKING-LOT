const express = require("express");
const router = express.Router();
const {
  addSlot,
  getAllSlots,
  getSlotById,
  parkVehicle,
  removeVehicle,
  deleteSlot,
  getStats,
} = require("../controllers/parking.controller");

// Stats
router.get("/stats", getStats);

// CRUD Slots
router.route("/").get(getAllSlots).post(addSlot);
router.route("/:id").get(getSlotById).delete(deleteSlot);

// Park/Remove
router.post("/park", parkVehicle);
router.put("/:id/remove", removeVehicle);

module.exports = router;
