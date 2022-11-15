import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "./global.module.css";
import GlobalTable from "../components/GlobalTable/GlobalTable";
import { trpc } from "../utils/trpc";

const Global: NextPage = () => {
    const { data, isLoading } = trpc.categories.getAllCases.useQuery();
    console.log(data);

  return (
    <>
      <Head>
        <title>All cases</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="All cases">
        <div className={styles.content}>
            <GlobalTable cases={data} />
        </div>
      </Layout>
    </>
  );
};

export default Global;