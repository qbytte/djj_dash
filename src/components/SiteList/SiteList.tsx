import { Site } from "@prisma/client";
import { useState } from "react";
import styles from "./SiteList.module.css";

interface SiteListProps {
  sites: Site[] | undefined;
  filterCases: (site: string) => void;
  setCurrentSiteName: (site: string) => void;
}

const SiteList = ({ sites, filterCases, setCurrentSiteName }: SiteListProps) => {
  const [currentSite, setCurrentSite] = useState<string>("");

  return (
    <div className={styles.container}>
      <p className={styles.title}>Site</p>
      <button
        className={currentSite === "" ? styles.active : ""}
        onClick={() => {
          setCurrentSite("");
          filterCases("");
        }}
      >
        All cases
      </button>
      {sites?.map((site) => (
        <button
          className={currentSite === site.id ? styles.active : ""}
          key={site.id}
          onClick={() => {
            setCurrentSite(site.id);
            setCurrentSiteName(site.name);
            filterCases(site.id);
            console.log(site.id);
          }}
        >
          {site?.name}
        </button>
      ))}
    </div>
  );
};

export default SiteList;
