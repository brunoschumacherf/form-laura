import { Link } from "react-router-dom";
import "../index.css";

export const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <h1 className="thankyou-title">Obrigado pelo envio!</h1>
        <p className="thankyou-subtext">Entraremos em contato com você em breve.</p>
        <Link to="/" className="thankyou-button">
          Voltar para o formulário
        </Link>
      </div>
    </div>
  );
};
