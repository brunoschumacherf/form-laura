import { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../api/api";
import { Patient } from "../types/Patient";

export const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id: string) => {
    await deletePatient(id);
    fetchPatients();
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Pacientes Cadastrados</h2>

      <div className="patient-grid">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div className="card-header">
              <h3>{patient.name}</h3>
              <button onClick={() => handleDelete(patient.id!)} className="delete-button">
                Deletar
              </button>
            </div>

            <div className="card-body">
              <p><strong>Contato:</strong> {patient.contact}</p>
              <p><strong>Instagram:</strong> {patient.instagram}</p>
              <p><strong>Disponibilidade:</strong> {patient.availability}</p>

              <p><strong>Já fez:</strong> {patient.previousTreatments?.join(", ") || "Nenhum"}</p>
              <p><strong>Deseja:</strong> {patient.desiredTreatments?.join(", ") || "Nenhum"}</p>

              <p><strong>Alergias:</strong> {patient.allergies}</p>
              <p><strong>Insegurança com sorriso:</strong> {patient.insecureAboutSmile}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
