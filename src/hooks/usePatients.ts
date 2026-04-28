import { useContext } from "react";
import { PatientContext } from "../contexts/PatientContext";

export const usePatients = () => useContext(PatientContext);