import { Patient } from '../types/Patient';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from './firebaseConfig';

const COLLECTION = 'patients';

export const savePatientToDB = async (patient: Patient) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), patient);
    return { id: docRef.id };
  } catch (e) {
    console.error('Erro ao adicionar documento: ', e);
    throw new Error('Erro ao salvar paciente');
  }
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  const patients: Patient[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const { id: _id, ...rest } = data;
    patients.push({ id: doc.id, ...rest } as Patient);    
  });
  return patients;
};

export const deletePatientById = async (id: string) => {
  try {
    const patientDoc = doc(db, COLLECTION, id);
    await deleteDoc(patientDoc);
  } catch (e) {
    console.error('Erro ao excluir paciente: ', e);
    throw new Error('Erro ao excluir paciente');
  }
};
