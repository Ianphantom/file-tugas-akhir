import { createContext, useState } from "react";

export const PatientContext = createContext({
  currentPatient: null,
  setCurrentPatient: () => null,
  isLoading: null,
  setIsLoading: () => null,
});

export const PatientProvider = ({ children }) => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = { currentPatient, setCurrentPatient, isLoading, setIsLoading };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
