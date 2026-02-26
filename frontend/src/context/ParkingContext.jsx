import React, { createContext, useContext, useReducer, useCallback } from "react";
import { slotService } from "../services/api";
import toast from "react-hot-toast";

const ParkingContext = createContext();

const initialState = {
  slots: [],
  stats: null,
  loading: false,
  statsLoading: false,
  actionLoading: false,
  error: null,
  lastParked: null,
};

const parkingReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_STATS_LOADING":
      return { ...state, statsLoading: action.payload };
    case "SET_ACTION_LOADING":
      return { ...state, actionLoading: action.payload };
    case "SET_SLOTS":
      return { ...state, slots: action.payload, loading: false };
    case "SET_STATS":
      return { ...state, stats: action.payload, statsLoading: false };
    case "ADD_SLOT":
      return { ...state, slots: [...state.slots, action.payload].sort((a, b) => a.slotNo - b.slotNo) };
    case "UPDATE_SLOT":
      return {
        ...state,
        slots: state.slots.map((s) => (s._id === action.payload._id ? action.payload : s)),
        actionLoading: false,
        lastParked: action.payload,
      };
    case "DELETE_SLOT":
      return { ...state, slots: state.slots.filter((s) => s._id !== action.payload) };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false, actionLoading: false };
    case "CLEAR_LAST_PARKED":
      return { ...state, lastParked: null };
    default:
      return state;
  }
};

export const ParkingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(parkingReducer, initialState);

  const fetchSlots = useCallback(async (filters = {}) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await slotService.getAll(filters);
      dispatch({ type: "SET_SLOTS", payload: res.data.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  const fetchStats = useCallback(async () => {
    dispatch({ type: "SET_STATS_LOADING", payload: true });
    try {
      const res = await slotService.getStats();
      dispatch({ type: "SET_STATS", payload: res.data.data });
    } catch (err) {
      dispatch({ type: "SET_STATS_LOADING", payload: false });
    }
  }, []);

  const addSlot = useCallback(async (data) => {
    dispatch({ type: "SET_ACTION_LOADING", payload: true });
    try {
      const res = await slotService.create(data);
      dispatch({ type: "ADD_SLOT", payload: res.data.data });
      dispatch({ type: "SET_ACTION_LOADING", payload: false });
      toast.success(res.data.message);
      fetchStats();
      return { success: true };
    } catch (err) {
      dispatch({ type: "SET_ACTION_LOADING", payload: false });
      return { success: false };
    }
  }, [fetchStats]);

  const parkVehicle = useCallback(async (data) => {
    dispatch({ type: "SET_ACTION_LOADING", payload: true });
    try {
      const res = await slotService.parkVehicle(data);
      if (res.data.data) {
        dispatch({ type: "UPDATE_SLOT", payload: res.data.data });
        toast.success(res.data.message);
        fetchStats();
        return { success: true, slot: res.data.data };
      } else {
        dispatch({ type: "SET_ACTION_LOADING", payload: false });
        toast.error(res.data.message);
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      dispatch({ type: "SET_ACTION_LOADING", payload: false });
      return { success: false };
    }
  }, [fetchStats]);

  const removeVehicle = useCallback(async (id) => {
    dispatch({ type: "SET_ACTION_LOADING", payload: true });
    try {
      const res = await slotService.removeVehicle(id);
      dispatch({ type: "UPDATE_SLOT", payload: res.data.data });
      toast.success(res.data.message);
      fetchStats();
      return { success: true };
    } catch (err) {
      dispatch({ type: "SET_ACTION_LOADING", payload: false });
      return { success: false };
    }
  }, [fetchStats]);

  const deleteSlot = useCallback(async (id) => {
    try {
      const res = await slotService.delete(id);
      dispatch({ type: "DELETE_SLOT", payload: id });
      toast.success(res.data.message);
      fetchStats();
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }, [fetchStats]);

  const clearLastParked = useCallback(() => {
    dispatch({ type: "CLEAR_LAST_PARKED" });
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        ...state,
        fetchSlots,
        fetchStats,
        addSlot,
        parkVehicle,
        removeVehicle,
        deleteSlot,
        clearLastParked,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) throw new Error("useParking must be used within ParkingProvider");
  return context;
};

export default ParkingContext;
