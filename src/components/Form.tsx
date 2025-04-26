import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitPatient } from "../api/api";
import { Patient } from "../types/Patient";

export const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Patient>({
    name: "",
    contact: "",
    instagram: "",
    previousTreatments: [],
    desiredTreatments: [],
    allergies: "",
    insecureAboutSmile: "",
    availability: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, section: "previous" | "desired") => {
    const { value, checked } = e.target;
    const field = section === "previous" ? "previousTreatments" : "desiredTreatments";

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.availability) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    await submitPatient(formData);
    navigate("/thank-you");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        {/* Logo */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>

        <h2 className="form-title">Paciente Modelo</h2>

        {/* Nome e Instagram */}
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Contato */}
        <div className="form-row">
          <input
            type="text"
            name="contact"
            placeholder="Número para contato"
            value={formData.contact}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Tratamentos já feitos */}
        <div className="form-section">
          <label className="form-label">Marque o que você já fez:</label>
          <div className="checkbox-grid">
            {["Limpeza", "Canal", "Restauração de dentes anteriores", "Restauração de dentes posteriores", "Clareamento", "Extração", "Facetas e lentes", "Utiliza aparelho ortodôntico", "Outro"].map((item) => (
              <label key={item} className="checkbox-label">
                <input
                  type="checkbox"
                  value={item}
                  onChange={(e) => handleCheckboxChange(e, "previous")}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Tratamentos procurados */}
        <div className="form-section">
          <label className="form-label">Marque o que você procura:</label>
          <div className="checkbox-grid">
            {["Clareamento", "Restauração de anteriores", "Restauração de posteriores", "Limpeza", "Extração", "Canal", "Outro"].map((item) => (
              <label key={item} className="checkbox-label">
                <input
                  type="checkbox"
                  value={item}
                  onChange={(e) => handleCheckboxChange(e, "desired")}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Alergias */}
        <div className="form-section">
          <label className="form-label">Possui alergias?</label>
          <div className="radio-group">
            {["Sim", "Não", "Não sei"].map((item) => (
              <label key={item} className="radio-label">
                <input
                  type="radio"
                  name="allergies"
                  value={item}
                  onChange={handleChange}
                  required
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Insegurança com sorriso */}
        <div className="form-section">
          <label className="form-label">Se sente inseguro com a cor do seu sorriso?</label>
          <select
            name="insecureAboutSmile"
            value={formData.insecureAboutSmile}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
            <option value="Talvez">Talvez</option>
          </select>
        </div>

        {/* Disponibilidade */}
        <div className="form-section">
          <label className="form-label">Qual a sua disponibilidade?</label>
          <div className="radio-group">
            {["Segunda-feira", "Terça-feira", "Sexta-feira"].map((item) => (
              <label key={item} className="radio-label">
                <input
                  type="radio"
                  name="availability"
                  value={item}
                  onChange={handleChange}
                  required
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Botão de envio */}
        <button type="submit" className="form-button">
          Enviar
        </button>
      </form>
    </div>
  );
};
