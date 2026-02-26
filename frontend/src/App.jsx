import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ParkingProvider } from "./context/ParkingContext";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import AllSlots from "./pages/AllSlots";
import AddSlot from "./pages/AddSlot";
import ParkVehicle from "./pages/ParkVehicle";

const App = () => {
  return (
    <ParkingProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="app__main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/slots" element={<AllSlots />} />
              <Route path="/add-slot" element={<AddSlot />} />
              <Route path="/park" element={<ParkVehicle />} />
              <Route path="*" element={
                <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)' }}>
                  <h2 style={{ fontSize: 48, marginBottom: 16 }}>404</h2>
                  <p>Page not found.</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid rgba(15,23,42,0.08)',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: "'Space Grotesk', sans-serif",
            },
            success: { iconTheme: { primary: '#16a34a', secondary: '#ffffff' } },
            error: { iconTheme: { primary: '#dc2626', secondary: '#ffffff' } },
          }}
        />
      </Router>
    </ParkingProvider>
  );
};

export default App;
