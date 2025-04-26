import { Patient } from "../types/Patient";

let patients: Patient[] = [];

export const submitPatient = async (patient: Patient) => {
  patient.id = Date.now().toString();
  patients.push(patient);
  return patient;
};

export const getPatients = async (): Promise<Patient[]> => {
  return patients;
};

export const deletePatient = async (id: string) => {
  patients = patients.filter((patient) => patient.id !== id);
};
