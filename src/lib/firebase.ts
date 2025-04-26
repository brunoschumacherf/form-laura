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


// nunca faca isso kkk
export const loginWithFirestore = async (email: string, password: string) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    console.log(email);
    console.log(data.email);
    console.log(password == data.password);
    if (data.email === email && data.password === password) {
      console.log("Login bem-sucedido!");
      return true;
    }
  }
  return false;
};
