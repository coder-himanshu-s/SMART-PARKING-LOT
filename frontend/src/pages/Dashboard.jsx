import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParking } from "../context/ParkingContext";
import StatCard from "../components/common/StatCard";
import SlotCard from "../components/slots/SlotCard";
import Loader from "../components/common/Loader";
import "./Dashboard.css";

const Dashboard = () => {
  const { slots, stats, loading, statsLoading, fetchSlots, fetchStats } = useParking();

  useEffect(() => {
    fetchSlots();
    fetchStats();
  }, [fetchSlots, fetchStats]);

  const recentSlots = slots.slice(0, 6);

  return (
    <div className="dashboard">
      {/* Hero */}
      <div className="dashboard__hero">
        <div className="dashboard__hero-content">
          <p className="dashboard__hero-tag">Live System</p>
          <h1 className="dashboard__hero-title">
            Smart Parking<br />
            <span className="dashboard__hero-accent">Lot Management</span>
          </h1>
          <p className="dashboard__hero-desc">
            Automatically allocate, manage, and track parking slots in real time.
          </p>
          <div className="dashboard__hero-actions">
            <Link to="/park" className="dashboard__cta">Park a Vehicle →</Link>
            <Link to="/add-slot" className="dashboard__cta-secondary">Add Slot</Link>
          </div>
        </div>
        <div className="dashboard__hero-visual">
          <div className="dashboard__grid-visual">
            {Array.from({ length: 12 }).map((_, i) => {
              const s = slots[i];
              return (
                <div
                  key={i}
                  className={`dashboard__grid-cell ${s ? (s.isOccupied ? "occupied" : "free") : "empty"}`}
                >
                  {s ? `#${s.slotNo}` : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="dashboard__section">
        <div className="dashboard__stats">
          <StatCard label="Total Slots" value={stats?.total} icon="🏢" color="accent" loading={statsLoading} />
          <StatCard label="Available" value={stats?.available} icon="✅" color="success" loading={statsLoading} />
          <StatCard label="Occupied" value={stats?.occupied} icon="🚗" color="danger" loading={statsLoading} />
          <StatCard label="EV Charging" value={stats?.evSlots} icon="⚡" color="accent2" loading={statsLoading} />
          <StatCard label="Covered" value={stats?.coveredSlots} icon="☂" color="warning" loading={statsLoading} />
        </div>
      </section>

      {/* Recent Slots */}
      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Recent Slots</h2>
          <Link to="/slots" className="dashboard__see-all">View All →</Link>
        </div>
        {loading ? (
          <Loader text="Loading slots..." />
        ) : recentSlots.length === 0 ? (
          <div className="dashboard__empty">
            <p>No parking slots added yet.</p>
            <Link to="/add-slot" className="dashboard__cta-secondary">Add Your First Slot →</Link>
          </div>
        ) : (
          <div className="dashboard__slots-grid">
            {recentSlots.map((slot) => (
              <SlotCard key={slot._id} slot={slot} />
            ))}
          </div>
        )}
      </section>

      {/* Quick actions */}
      <section className="dashboard__section">
        <div className="dashboard__quick-actions">
          <Link to="/add-slot" className="dashboard__action-card">
            <div className="dashboard__action-icon">➕</div>
            <div>
              <strong>Add Slot</strong>
              <p>Create new parking slots</p>
            </div>
          </Link>
          <Link to="/park" className="dashboard__action-card">
            <div className="dashboard__action-icon">🚗</div>
            <div>
              <strong>Park Vehicle</strong>
              <p>Auto-allocate nearest slot</p>
            </div>
          </Link>
          <Link to="/slots" className="dashboard__action-card">
            <div className="dashboard__action-icon">📋</div>
            <div>
              <strong>View All Slots</strong>
              <p>Browse and manage slots</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
