import { Cases } from "@prisma/client";
import { useState } from "react";
import styles from "./CaseTable.module.css";

interface CaseTableProps {
  cases: Cases[] | undefined;
}

const CaseTable = ({ cases }: CaseTableProps) => {
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
            <th>Needs atention</th>
          </tr>
        </thead>
        <tbody>
          {cases?.map((c) => (
            <tr key={c.id} className={styles.row}>
              <td>{c.id}</td>
              <td>{c.date}</td>
              <td>{c.status}</td>
              <td>{c.queue}</td>
              {c.atention ? <td>Yes</td> : <td>No</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;
