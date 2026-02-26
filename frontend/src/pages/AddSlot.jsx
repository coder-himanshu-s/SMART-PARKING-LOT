import React, { useState } from "react";
import { useParking } from "../context/ParkingContext";
import "./AddSlot.css";

const AddSlot = () => {
  const { addSlot, actionLoading } = useParking();
  const [form, setForm] = useState({ slotNo: "", isCovered: false, isEVCharging: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.slotNo) e.slotNo = "Slot number is required";
    else if (isNaN(form.slotNo) || Number(form.slotNo) < 1) e.slotNo = "Enter a valid positive number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await addSlot({ ...form, slotNo: Number(form.slotNo) });
    if (result.success) {
      setForm({ slotNo: "", isCovered: false, isEVCharging: false });
      setErrors({});
    }
  };

  return (
    <div className="add-slot">
      <div className="add-slot__container">
        <div className="add-slot__header">
          <div className="add-slot__header-icon">➕</div>
          <div>
            <h1>Add Parking Slot</h1>
            <p>Configure and add a new slot to the system</p>
          </div>
        </div>

        <form className="add-slot__form" onSubmit={handleSubmit}>
          {/* Slot Number */}
          <div className={`add-slot__field ${errors.slotNo ? "add-slot__field--error" : ""}`}>
            <label className="add-slot__label">Slot Number <span className="add-slot__required">*</span></label>
            <div className="add-slot__input-wrap">
              <span className="add-slot__input-prefix">#</span>
              <input
                className="add-slot__input"
                type="number"
                min="1"
                placeholder="e.g. 101"
                value={form.slotNo}
                onChange={(e) => { setForm({ ...form, slotNo: e.target.value }); setErrors({ ...errors, slotNo: "" }); }}
              />
            </div>
            {errors.slotNo && <span className="add-slot__error-msg">{errors.slotNo}</span>}
          </div>

          {/* Features */}
          <div className="add-slot__field">
            <label className="add-slot__label">Slot Features</label>
            <div className="add-slot__features">
              <label className={`add-slot__feature-toggle ${form.isCovered ? "add-slot__feature-toggle--on" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.isCovered}
                  onChange={(e) => setForm({ ...form, isCovered: e.target.checked })}
                />
                <span className="add-slot__feature-icon">☂</span>
                <div>
                  <strong>Covered</strong>
                  <small>Protected from rain & sun</small>
                </div>
              </label>

              <label className={`add-slot__feature-toggle ${form.isEVCharging ? "add-slot__feature-toggle--on" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.isEVCharging}
                  onChange={(e) => setForm({ ...form, isEVCharging: e.target.checked })}
                />
                <span className="add-slot__feature-icon">⚡</span>
                <div>
                  <strong>EV Charging</strong>
                  <small>Electric vehicle charging port</small>
                </div>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="add-slot__preview">
            <p className="add-slot__preview-title">Preview</p>
            <div className="add-slot__preview-card">
              <div className="add-slot__preview-num">#{form.slotNo ? String(form.slotNo).padStart(3, "0") : "___"}</div>
              <div className="add-slot__preview-tags">
                <span className={`add-slot__preview-tag ${form.isCovered ? "on" : "off"}`}>☂ {form.isCovered ? "Covered" : "Open"}</span>
                <span className={`add-slot__preview-tag ${form.isEVCharging ? "ev" : "off"}`}>⚡ {form.isEVCharging ? "EV Ready" : "No EV"}</span>
                <span className="add-slot__preview-tag available">✓ Available</span>
              </div>
            </div>
          </div>

          <button type="submit" className="add-slot__submit" disabled={actionLoading}>
            {actionLoading ? "Adding Slot..." : "Add Parking Slot"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSlot;
