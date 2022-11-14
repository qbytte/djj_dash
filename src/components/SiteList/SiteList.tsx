import { Site } from "@prisma/client";
import styles from "./SiteList.module.css";

interface SiteListProps {
  sites: Site[] | undefined;
}

const SiteList = ({ sites }:SiteListProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Site</p>
      {sites?.map((site) => (
        <button>{site?.name}</button>
      ))}
    </div>
  )
}

export default SiteList