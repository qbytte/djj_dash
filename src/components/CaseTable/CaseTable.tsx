import { Cases, Customer, Site } from "@prisma/client";
import { useState } from "react";
import CaseModal from "../CaseModal/CaseModal";
import styles from "./CaseTable.module.css";

interface CaseTableProps {
  cases: Cases[] | undefined;
  customer:
    | (Customer & {
        sites: Site[];
        cases: Cases[];
      })
    | null
    | undefined;
    currentSiteName: string;
    refetchear: () => void;
}

const CaseTable = ({ cases, customer, currentSiteName, refetchear }: CaseTableProps) => {
  const [modal, setModal] = useState(false);
  const [currentCase, setCurrentCase] = useState<Cases | undefined>(undefined);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>Case</th>
            <th>Date</th>
            <th>Status</th>
            <th>Queue</th>
            <th>Notes</th>
            <th>Needs atention</th>
          </tr>
        </thead>
        <tbody>
          {cases?.map((c) => (
            <tr
              key={c.id}
              className={styles.row}
              onClick={() => {
                setCurrentCase(c);
                setModal(true);
              }}
            >
              <td>{c.id}</td>
              <td>{c.date}</td>
              <td>{c.status}</td>
              <td>{c.queue}</td>
              <td>{c.notes}</td>
              {c.atention ? <td>Yes</td> : <td>No</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <CaseModal
          customer={customer?.name}
          site={currentSiteName}
          currentCase={currentCase}
          setModal={setModal}
          refetchear={refetchear}
        />
      )}
    </div>
  );
};

export default CaseTable;
