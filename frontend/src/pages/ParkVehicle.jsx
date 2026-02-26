import React, { useState, useEffect } from "react";
import { useParking } from "../context/ParkingContext";
import ParkVehicleForm from "../components/parking/ParkVehicleForm";
import ParkingResult from "../components/parking/ParkingResult";
import SlotCard from "../components/slots/SlotCard";
import Loader from "../components/common/Loader";
import "./ParkVehicle.css";

const ParkVehicle = () => {
  const { slots, loading, fetchSlots } = useParking();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleResult = (res) => {
    setResult(res);
    fetchSlots();
  };

  const occupiedSlots = slots.filter((s) => s.isOccupied);
  const availableCount = slots.filter((s) => !s.isOccupied).length;

  return (
    <div className="park-page">
      <div className="park-page__header">
        <h1>Park / Remove Vehicle</h1>
        <p>Auto-allocate nearest matching slot or remove an existing vehicle</p>
      </div>

      <div className="park-page__layout">
        {/* Left: Form */}
        <div className="park-page__left">
          <div className="park-page__avail-bar">
            <span className="park-page__avail-label">Available Slots</span>
            <span className="park-page__avail-count">{availableCount}</span>
          </div>

          <ParkVehicleForm onResult={handleResult} />

          {result && (
            <ParkingResult result={result} onClear={() => setResult(null)} />
          )}
        </div>

        {/* Right: Occupied */}
        <div className="park-page__right">
          <div className="park-page__section-header">
            <h2>Occupied Slots</h2>
            <span className="park-page__badge">{occupiedSlots.length}</span>
          </div>

          {loading ? (
            <Loader size="sm" />
          ) : occupiedSlots.length === 0 ? (
            <div className="park-page__empty">
              <p>🎉 All slots are currently free!</p>
            </div>
          ) : (
            <div className="park-page__occupied-list">
              {occupiedSlots.map((slot) => (
                <SlotCard key={slot._id} slot={slot} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkVehicle;
