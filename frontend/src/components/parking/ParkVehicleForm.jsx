import React, { useState } from "react";
import { useParking } from "../../context/ParkingContext";
import "./ParkVehicleForm.css";

const ParkVehicleForm = ({ onResult }) => {
  const { parkVehicle, actionLoading } = useParking();
  const [form, setForm] = useState({
    needsEV: false,
    needsCover: false,
    vehicleNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await parkVehicle(form);
    onResult(result);
  };

  return (
    <form className="park-form" onSubmit={handleSubmit}>
      <div className="park-form__title">
        <span className="park-form__icon">🚗</span>
        <div>
          <h2>Park Vehicle</h2>
          <p>System will allocate the nearest matching slot</p>
        </div>
      </div>

      <div className="park-form__field">
        <label className="park-form__label">Vehicle Number <span className="park-form__optional">(optional)</span></label>
        <input
          className="park-form__input"
          type="text"
          placeholder="e.g. MH-01-AB-1234"
          value={form.vehicleNumber}
          onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value.toUpperCase() })}
          maxLength={15}
        />
      </div>

      <div className="park-form__requirements">
        <p className="park-form__req-title">Parking Requirements</p>
        <div className="park-form__toggles">
          <label className={`park-form__toggle ${form.needsCover ? "park-form__toggle--on" : ""}`}>
            <input
              type="checkbox"
              checked={form.needsCover}
              onChange={(e) => setForm({ ...form, needsCover: e.target.checked })}
            />
            <div className="park-form__toggle-content">
              <span className="park-form__toggle-icon">☂</span>
              <div>
                <strong>Covered Parking</strong>
                <small>Protected from weather</small>
              </div>
            </div>
            <div className="park-form__toggle-check">{form.needsCover ? "✓" : ""}</div>
          </label>

          <label className={`park-form__toggle ${form.needsEV ? "park-form__toggle--on" : ""}`}>
            <input
              type="checkbox"
              checked={form.needsEV}
              onChange={(e) => setForm({ ...form, needsEV: e.target.checked })}
            />
            <div className="park-form__toggle-content">
              <span className="park-form__toggle-icon">⚡</span>
              <div>
                <strong>EV Charging</strong>
                <small>Electric vehicle charging</small>
              </div>
            </div>
            <div className="park-form__toggle-check">{form.needsEV ? "✓" : ""}</div>
          </label>
        </div>
      </div>

      <button className="park-form__submit" type="submit" disabled={actionLoading}>
        {actionLoading ? (
          <span className="park-form__loading">
            <span className="park-form__spinner" /> Finding Slot...
          </span>
        ) : (
          "Find & Allocate Slot →"
        )}
      </button>
    </form>
  );
};

export default ParkVehicleForm;
