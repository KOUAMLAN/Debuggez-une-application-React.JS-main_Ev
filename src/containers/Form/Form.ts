import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Simule une API de contact
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState(""); // Ajout du state

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setConfirmation(""); // Réinitialise le message à chaque envoi
      try {
        await mockContactApi();
        setSending(false);
        setConfirmation("Votre message a bien été envoyé !");
        onSuccess();
      } catch (err) {
        setSending(false);
        setConfirmation("Une erreur est survenue. Veuillez réessayer.");
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
          {/* Affichage du message de confirmation ou d’erreur */}
          {confirmation && (
            <div
              style={{
                marginTop: "1em",
                color: confirmation.startsWith("Votre message") ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {confirmation}
            </div>
          )}
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;