import emailjs from 'emailjs-com';
import { Patient } from '../types/Patient';

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID!;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY!;

export const sendPatientEmail = async (patient: Patient) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    name: patient.name,
    contact: patient.contact,
    instagram: patient.instagram,
    previousTreatments: patient.previousTreatments.join(', '),
    desiredTreatments: patient.desiredTreatments.join(', '),
    allergies: patient.allergies,
    insecureAboutSmile: patient.insecureAboutSmile,
    availability: patient.availability,
  }, PUBLIC_KEY);
};
