import { useEffect } from "react";

import { Grid, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Header,
  Filter,
  Row,
  Column,
  Wrapper,
  ListTimeFree,
  Footer,
} from "~/components";
import ListReserved from "~/components/TimesReserverd";
import { useScheduleContext } from "~/core/contexts";
import { colors } from "~/styles";

const Home: NextPage = () => {
  const { setUser } = useScheduleContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setUser(id);
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Toolbusiness</title>
      </Head>
      <Wrapper>
        <Grid
          gridTemplateRows={[`10% 80vh 10%`]}
          gridTemplateAreas={[`'header' 'main' 'footer'`]}
          gap={2}
        >
          <Box gridArea="header" bg={colors.body}>
            <Column h="100%" w="100%">
              <Row flex="1" w="100%" justifyContent="flex-start">
                <Header />
              </Row>
            </Column>
          </Box>
          <Box gridArea="main" h="100%">
            <Row h="" w="100%" bg={colors.body} mb="2rem">
              <Filter />
            </Row>
            <Box h="" mb="2rem" pr={["0.6rem", "0"]}>
              <ListTimeFree />
            </Box>
            <Box h="">
              <ListReserved />
            </Box>
          </Box>
          <Box h="" gridArea="footer" bg={colors.body} zIndex="modal">
            <Footer />
          </Box>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Home;
