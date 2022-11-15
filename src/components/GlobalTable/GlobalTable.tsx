import { Cases, Site, Customer } from "@prisma/client";
import styles from "./GlobalTable.module.css";

interface GlobalTableProps {
  cases: (Cases & {
    site: Site;
    customer: Customer;
})[] | undefined
}

const GlobalTable = ({ cases }: GlobalTableProps) => {
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
              <td>{c.customer.alt}</td>
              <td>{c.site.name}</td>
              {c.atention ? <td>Yes</td> : <td>No</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalTable;
