import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import CatCard from "../components/CatCard/CatCard";
import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
          <CatCard />
        </div>
        <div className={styles.header}>
          <Header title="Cats" />
        </div>
        <div className={styles.nav}>
          <NavBar />
        </div>
      </div>
    </>
  );
};

export default Home;
