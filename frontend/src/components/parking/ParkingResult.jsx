import React from "react";
import "./ParkingResult.css";

const ParkingResult = ({ result, onClear }) => {
  if (!result) return null;

  const success = result.success && result.slot;

  return (
    <div className={`parking-result ${success ? "parking-result--success" : "parking-result--error"}`}>
      <div className="parking-result__header">
        <div className="parking-result__icon">
          {success ? "✅" : "❌"}
        </div>
        <div>
          <h3 className="parking-result__title">
            {success ? `Slot Allocated — #${String(result.slot.slotNo).padStart(3, "0")}` : "No Slot Available"}
          </h3>
          <p className="parking-result__subtitle">
            {success
              ? "Your vehicle has been successfully parked."
              : result.message || "No matching slot found for your requirements."}
          </p>
        </div>
        <button className="parking-result__close" onClick={onClear}>✕</button>
      </div>

      {success && result.slot && (
        <div className="parking-result__details">
          <div className="parking-result__detail">
            <span className="parking-result__detail-label">Slot No.</span>
            <span className="parking-result__detail-value">#{String(result.slot.slotNo).padStart(3, "0")}</span>
          </div>
          <div className="parking-result__detail">
            <span className="parking-result__detail-label">Type</span>
            <span className="parking-result__detail-value">{result.slot.isCovered ? "Covered ☂" : "Open Air"}</span>
          </div>
          <div className="parking-result__detail">
            <span className="parking-result__detail-label">EV Charging</span>
            <span className="parking-result__detail-value">{result.slot.isEVCharging ? "Available ⚡" : "N/A"}</span>
          </div>
          {result.slot.vehicleInfo?.vehicleNumber && (
            <div className="parking-result__detail">
              <span className="parking-result__detail-label">Vehicle</span>
              <span className="parking-result__detail-value mono">{result.slot.vehicleInfo.vehicleNumber}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParkingResult;
