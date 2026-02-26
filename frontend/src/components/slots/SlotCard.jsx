import React, { useState } from "react";
import Badge from "../common/Badge";
import { useParking } from "../../context/ParkingContext";
import "./SlotCard.css";

const SlotCard = ({ slot }) => {
  const { removeVehicle, deleteSlot, actionLoading } = useParking();
  const [confirming, setConfirming] = useState(null);

  const handleRemove = async () => {
    if (confirming === "remove") {
      await removeVehicle(slot._id);
      setConfirming(null);
    } else {
      setConfirming("remove");
    }
  };

  const handleDelete = async () => {
    if (confirming === "delete") {
      await deleteSlot(slot._id);
      setConfirming(null);
    } else {
      setConfirming("delete");
    }
  };

  const parkedDuration = slot.vehicleInfo?.parkedAt
    ? getTimeSince(slot.vehicleInfo.parkedAt)
    : null;

  return (
    <div className={`slot-card ${slot.isOccupied ? "slot-card--occupied" : "slot-card--free"}`}>
      {/* Top row */}
      <div className="slot-card__header">
        <div className="slot-card__number">
          <span className="slot-card__hash">#</span>
          <span className="slot-card__no">{String(slot.slotNo).padStart(3, "0")}</span>
        </div>
        <Badge
          label={slot.isOccupied ? "Occupied" : "Available"}
          color={slot.isOccupied ? "red" : "green"}
        />
      </div>

      {/* Features */}
      <div className="slot-card__features">
        <span className={`slot-card__feat ${slot.isCovered ? "slot-card__feat--on" : "slot-card__feat--off"}`}>
          ☂ {slot.isCovered ? "Covered" : "Open"}
        </span>
        <span className={`slot-card__feat ${slot.isEVCharging ? "slot-card__feat--ev" : "slot-card__feat--off"}`}>
          ⚡ {slot.isEVCharging ? "EV Ready" : "No EV"}
        </span>
      </div>

      {/* Vehicle info */}
      {slot.isOccupied && (
        <div className="slot-card__vehicle">
          {slot.vehicleInfo?.vehicleNumber && (
            <p className="slot-card__plate">{slot.vehicleInfo.vehicleNumber}</p>
          )}
          {parkedDuration && (
            <p className="slot-card__duration">⏱ {parkedDuration}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="slot-card__actions">
        {slot.isOccupied && (
          <button
            className={`slot-card__btn slot-card__btn--remove ${confirming === "remove" ? "slot-card__btn--confirm" : ""}`}
            onClick={handleRemove}
            disabled={actionLoading}
          >
            {confirming === "remove" ? "Confirm?" : "Remove Vehicle"}
          </button>
        )}
        {!slot.isOccupied && (
          <button
            className={`slot-card__btn slot-card__btn--delete ${confirming === "delete" ? "slot-card__btn--confirm" : ""}`}
            onClick={handleDelete}
          >
            {confirming === "delete" ? "Confirm?" : "Delete Slot"}
          </button>
        )}
        {confirming && (
          <button className="slot-card__btn slot-card__btn--cancel" onClick={() => setConfirming(null)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m`;
  return `${Math.floor(hrs / 24)}d`;
};

export default SlotCard;
