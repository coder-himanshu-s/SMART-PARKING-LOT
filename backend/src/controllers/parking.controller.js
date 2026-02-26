const ParkingSlot = require("../models/ParkingSlot");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// @desc    Add a new parking slot
// @route   POST /api/slots
// @access  Public
const addSlot = asyncHandler(async (req, res) => {
  const { slotNo, isCovered, isEVCharging } = req.body;

  if (!slotNo) throw new ApiError(400, "Slot number is required");

  const existing = await ParkingSlot.findOne({ slotNo });
  if (existing) throw new ApiError(409, `Slot number ${slotNo} already exists`);

  const slot = await ParkingSlot.create({
    slotNo,
    isCovered: Boolean(isCovered),
    isEVCharging: Boolean(isEVCharging),
    isOccupied: false,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, slot, "Parking slot added successfully"));
});

// @desc    Get all parking slots
// @route   GET /api/slots
// @access  Public
const getAllSlots = asyncHandler(async (req, res) => {
  const { isOccupied, isCovered, isEVCharging } = req.query;

  const filter = {};
  if (isOccupied !== undefined) filter.isOccupied = isOccupied === "true";
  if (isCovered !== undefined) filter.isCovered = isCovered === "true";
  if (isEVCharging !== undefined) filter.isEVCharging = isEVCharging === "true";

  const slots = await ParkingSlot.find(filter).sort({ slotNo: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, slots, "Slots fetched successfully"));
});

// @desc    Get a single slot by ID
// @route   GET /api/slots/:id
// @access  Public
const getSlotById = asyncHandler(async (req, res) => {
  const slot = await ParkingSlot.findById(req.params.id);
  if (!slot) throw new ApiError(404, "Slot not found");

  return res.status(200).json(new ApiResponse(200, slot, "Slot fetched successfully"));
});

// @desc    Park a vehicle - allocate nearest matching slot
// @route   POST /api/slots/park
// @access  Public
const parkVehicle = asyncHandler(async (req, res) => {
  const { needsEV, needsCover, vehicleNumber } = req.body;

  const filter = {
    isOccupied: false,
  };

  if (needsEV) filter.isEVCharging = true;
  if (needsCover) filter.isCovered = true;

  // Nearest = lowest slot number
  const slot = await ParkingSlot.findOne(filter).sort({ slotNo: 1 });

  if (!slot) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "No slot available matching your requirements")
      );
  }

  slot.isOccupied = true;
  slot.vehicleInfo = {
    parkedAt: new Date(),
    vehicleNumber: vehicleNumber || null,
  };

  await slot.save();

  return res
    .status(200)
    .json(new ApiResponse(200, slot, `Vehicle parked at Slot ${slot.slotNo}`));
});

// @desc    Remove vehicle from slot (free the slot)
// @route   PUT /api/slots/:id/remove
// @access  Public
const removeVehicle = asyncHandler(async (req, res) => {
  const slot = await ParkingSlot.findById(req.params.id);
  if (!slot) throw new ApiError(404, "Slot not found");
  if (!slot.isOccupied) throw new ApiError(400, "Slot is already empty");

  slot.isOccupied = false;
  slot.vehicleInfo = { parkedAt: null, vehicleNumber: null };
  await slot.save();

  return res
    .status(200)
    .json(new ApiResponse(200, slot, `Slot ${slot.slotNo} is now free`));
});

// @desc    Delete a slot
// @route   DELETE /api/slots/:id
// @access  Public
const deleteSlot = asyncHandler(async (req, res) => {
  const slot = await ParkingSlot.findById(req.params.id);
  if (!slot) throw new ApiError(404, "Slot not found");
  if (slot.isOccupied) throw new ApiError(400, "Cannot delete an occupied slot");

  await ParkingSlot.findByIdAndDelete(req.params.id);

  return res.status(200).json(new ApiResponse(200, {}, "Slot deleted successfully"));
});

// @desc    Get dashboard stats
// @route   GET /api/slots/stats
// @access  Public
const getStats = asyncHandler(async (req, res) => {
  const total = await ParkingSlot.countDocuments();
  const occupied = await ParkingSlot.countDocuments({ isOccupied: true });
  const available = total - occupied;
  const evSlots = await ParkingSlot.countDocuments({ isEVCharging: true });
  const coveredSlots = await ParkingSlot.countDocuments({ isCovered: true });

  return res.status(200).json(
    new ApiResponse(200, { total, occupied, available, evSlots, coveredSlots }, "Stats fetched")
  );
});

module.exports = {
  addSlot,
  getAllSlots,
  getSlotById,
  parkVehicle,
  removeVehicle,
  deleteSlot,
  getStats,
};
