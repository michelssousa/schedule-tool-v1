import type { NextPage } from "next";

import { useScheduleContext } from "~/core/contexts";

const Home: NextPage = () => {
  const { data } = useScheduleContext();
  return (
    <>
      <div>Michel Testando</div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
};

export default Home;
