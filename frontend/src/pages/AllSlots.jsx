import React, { useEffect, useState } from "react";
import { useParking } from "../context/ParkingContext";
import SlotCard from "../components/slots/SlotCard";
import SlotFilters from "../components/slots/SlotFilters";
import Loader from "../components/common/Loader";
import "./AllSlots.css";

const AllSlots = () => {
  const { slots, loading, fetchSlots } = useParking();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
  };

  const filtered = slots.filter((slot) => {
    const matchesSearch = slot.slotNo.toString().includes(search.trim());
    let matchesFilter = true;
    if (activeFilter === "available") matchesFilter = !slot.isOccupied;
    else if (activeFilter === "occupied") matchesFilter = slot.isOccupied;
    else if (activeFilter === "ev") matchesFilter = slot.isEVCharging;
    else if (activeFilter === "covered") matchesFilter = slot.isCovered;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="all-slots">
      <div className="all-slots__header">
        <div>
          <h1 className="all-slots__title">All Parking Slots</h1>
          <p className="all-slots__subtitle">
            {slots.length} total · {slots.filter(s => !s.isOccupied).length} available
          </p>
        </div>
      </div>

      <div className="all-slots__controls">
        <input
          className="all-slots__search"
          type="text"
          placeholder="Search by slot number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SlotFilters filters={{ active: activeFilter }} onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <Loader text="Loading slots..." />
      ) : filtered.length === 0 ? (
        <div className="all-slots__empty">
          <div className="all-slots__empty-icon">🔍</div>
          <h3>No slots found</h3>
          <p>{slots.length === 0 ? "No slots have been added yet." : "Try adjusting your filters."}</p>
        </div>
      ) : (
        <>
          <p className="all-slots__count">{filtered.length} slot{filtered.length !== 1 ? "s" : ""} shown</p>
          <div className="all-slots__grid">
            {filtered.map((slot) => (
              <SlotCard key={slot._id} slot={slot} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllSlots;
