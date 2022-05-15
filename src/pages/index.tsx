import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { useSchedule } from "~/core/contexts";

const Home: NextPage = () => {
  const { data } = useSchedule();
  return (
    <>
      <div>Michel Testando</div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
};

export default Home;
