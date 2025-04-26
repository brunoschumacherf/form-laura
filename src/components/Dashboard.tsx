import { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../api/api";
import { Patient } from "../types/Patient";
import { loginWithFirestore } from "../lib/firebase"; // ajuste o caminho se necessário

export const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPatients();
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    const success = await loginWithFirestore(email, password);
    if (success) {
      setIsAuthenticated(true);
    } else {
      setLoginError("Email ou senha inválidos.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este paciente?")) return;
    await deletePatient(id);
    fetchPatients();
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Bem-vindo</h2>

          <div className="login-input-group">
            <label className="login-label">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginError && <p className="login-error">{loginError}</p>}

          <button className="login-button" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Pacientes Cadastrados</h2>

      {loading ? (
        <p className="loading-text">Carregando pacientes...</p>
      ) : patients.length === 0 ? (
        <p className="empty-text">Nenhum paciente cadastrado.</p>
      ) : (
        <div className="patient-grid">
          {patients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <div className="card-header">
                <h3>{patient.name}</h3>
                <button
                  onClick={() => handleDelete(patient.id!)}
                  className="delete-button"
                >
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
      )}
    </div>
  );
};
