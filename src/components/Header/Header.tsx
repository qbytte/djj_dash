import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Cases, Site, Customer } from "@prisma/client";
import styles from "./Header.module.css";

interface Props {
  title: string | undefined;
  isLoading: boolean;
  enableSearch: boolean;
  handleSearch?: (searchValue: string) => void;
}

const Header = ({ title, isLoading, enableSearch, handleSearch }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <div className={styles.container}>
      {isLoading ? (
        <span className={styles.title}>Loading...</span>
      ) : (
        <span className={styles.title}>{title}</span>
      )}
      {enableSearch && (
        <div className={styles.search}>
          <input type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={(e) => setSearchValue("")}
            value={searchValue}
            placeholder="Search by case number"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch && handleSearch(searchValue);
              }
            }}
          />
          <button
            onClick={() => handleSearch && handleSearch(searchValue)}
          >
            <AiOutlineSearch color="#22181C" size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
