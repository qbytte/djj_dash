import { Cases, Site, Customer } from "@prisma/client";
import { useState } from "react";
import CaseModal from "../CaseModal/CaseModal";
import styles from "./GlobalTable.module.css";

interface GlobalTableProps {
  cases:
    | (Cases & {
        site: Site;
        customer: Customer;
      })[]
    | undefined;
    refetchear: () => void;
}

const GlobalTable = ({ cases, refetchear }: GlobalTableProps) => {
  const [modal, setModal] = useState(false);
  const [currentCase, setCurrentCase] = useState<
    | (Cases & {
        site: Site;
        customer: Customer;
      })
    | undefined
  >(undefined);
  console.log(cases?.length);


  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>Case</th>
            <th>Date</th>
            <th>Status</th>
            <th>Queue</th>
            <th>Group</th>
            <th>Site</th>
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
              <td>{c.customer.alt}</td>
              <td>{c.site.name}</td>
              <td>{c.notes}</td>
              {c.atention ? <td>Yes</td> : <td>No</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <CaseModal
          customer={currentCase?.customer.name}
          site={currentCase?.site.name}
          currentCase={currentCase}
          setModal={setModal}
          refetchear={refetchear}
        />
      )}
    </div>
  );
};

export default GlobalTable;
