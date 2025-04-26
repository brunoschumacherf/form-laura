import { Patient } from '../types/Patient';
import { sendPatientEmail } from '../lib/email';
import { savePatientToDB, getAllPatients, deletePatientById } from '../lib/firebase';

export const submitPatient = async (patient: Patient) => {

  // await sendPatientEmail(patient);
  await savePatientToDB(patient);

  return patient;
};

export const getPatients = async () => {
  const patients = await getAllPatients();
  return getAllPatients();
};

export const deletePatient = async (id: string) => {
  await deletePatientById(id);
};
