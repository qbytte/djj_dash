import { Cases } from "@prisma/client";
import styles from "./CaseModal.module.css";

interface CaseModalProps {
  currentCase: Cases | undefined;
  customer: string | undefined;
  site: string | undefined;
  setModal: (modal: boolean) => void;
}

const CaseModal = ({ currentCase, customer, site, setModal }: CaseModalProps) => {
  return (
    <div className={styles.background}
      onClick={() => setModal(false)}
    >
      <div className={styles.container}>
        <span className={styles.title}>
          <p>Case:</p> {currentCase?.id}
        </span>
        <div className={styles.infoContainer}>
          <div>
            <p className={styles.label}>Customer:</p>
            <p>{customer}</p>
          </div>
          <div>
            <p className={styles.label}>Site:</p>
            <p>{site}</p>
          </div>
          <div>
            <p className={styles.label}>Case subject:</p>
            <p>{currentCase?.subject}</p>
          </div>
          <div>
            <p className={styles.label}>Date:</p>
            <p>{currentCase?.date}</p>
          </div>
          <div>
            <p className={styles.label}>Status:</p>
            <p>{currentCase?.status}</p>
          </div>
          <div>
            <p className={styles.label}>Queue:</p>
            <p>{currentCase?.queue}</p>
          </div>
          <div>
            <p className={styles.label}>Needs atention:</p>
            {currentCase?.atention ? <p>Yes</p> : <p>No</p>}
          </div>
        </div>
        <div className={styles.notesContainer}>
          <div>
            <p className={styles.label}>Stealth service notes:</p>
            <p>{currentCase?.stealthNotes}</p>
          </div>
          <div>
            <p className={styles.label}>Notes:</p>
            <p>{currentCase?.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;
