import { Cases } from "@prisma/client";
import { useState } from "react";
import {
  AiOutlineCloseCircle,
  AiFillEdit,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { trpc } from "../../utils/trpc";
import styles from "./CaseModal.module.css";

interface CaseModalProps {
  currentCase: Cases | undefined;
  customer: string | undefined;
  site: string | undefined;
  setModal: (modal: boolean) => void;
  refetchear: () => void;
}

const CaseModal = ({
  currentCase,
  customer,
  site,
  setModal,
  refetchear,
}: CaseModalProps) => {
  const [edit, setEdit] = useState(false);
  const [stealthNote, setStealthNote] = useState(currentCase?.stealthNotes);
  const [note, setNote] = useState(currentCase?.notes);
  const [atention, setAtention] = useState(currentCase?.atention);
  const mutation = trpc.categories.updateCase.useMutation();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.title}>
            <p>Case:</p> {currentCase?.id}
          </span>
          <div className={styles.btnContainer}>
            {!edit && (
              <button onClick={() => setEdit(true)}>
                <AiFillEdit size={38} />
              </button>
            )}

            {edit ? (
              <button>
                <AiOutlineCheckCircle
                  size={38}
                  color="#63C132"
                  onClick={() => {
                    mutation.mutate({
                      id: currentCase?.id,
                      stealthNotes: stealthNote,
                      notes: note,
                      atention: atention,
                    });
                    setEdit(false);
                  }}
                />
              </button>
            ) : (
              <button onClick={() => setModal(false)}>
                <AiOutlineCloseCircle
                  size={38}
                  color="F13030"
                  onClick={() => {
                    refetchear();
                  }}
                />
              </button>
            )}
          </div>
        </div>
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
          {edit ? (
            <div>
              <p className={styles.label}>Needs atention:</p>
              <input
                className={styles.checkbox}
                type={"checkbox"}
                checked={atention}
                onChange={() => setAtention(!atention)}
              />
            </div>
          ) : (
            <div>
              <p className={styles.label}>Needs atention:</p>
              {atention ? <p>Yes</p> : <p>No</p>}
            </div>
          )}
        </div>
        <div className={styles.notesContainer}>
          <div>
            <p className={styles.label}>Stealth service notes:</p>
            {edit ? (
              <textarea
                name="service-notes"
                id="service-notes"
                placeholder="Service note..."
                onChange={(e) => setStealthNote(e.target.value)}
                value={stealthNote}
              />
            ) : (
              <p>{stealthNote ? stealthNote : currentCase?.stealthNotes}</p>
            )}
          </div>
          <div>
            <p className={styles.label}>Notes:</p>
            {edit ? (
              <textarea
                name="service-notes"
                id="service-notes"
                placeholder="Note..."
                onChange={(e) => setNote(e.target.value)}
                value={note}
              />
            ) : (
              <p>{note ? note : currentCase?.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;
