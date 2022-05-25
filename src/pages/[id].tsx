import { useEffect } from "react";

import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Header, Filter, Wrapper, ListTimeFree, Footer } from "~/components";
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
        <Box
          position="absolute"
          bg={colors.body}
          left="0"
          top="0"
          w="100%"
          h="8vh"
          zIndex="modal"
        >
          <Header />
        </Box>
        <Box position="relative" left="0" top="9vh" h="80vh">
          <Box h="15%" bg={colors.body}>
            <Filter />
          </Box>
          <Box h={["40%", "35%"]} bg={colors.body} mt="1.5%">
            <ListTimeFree />
          </Box>
          <Box h={["42%", "50%"]} bg="transparent" mt="1.5%">
            <ListReserved />
          </Box>
        </Box>
        <Box
          position="absolute"
          bg={colors.body}
          left="0"
          bottom="0"
          w="100%"
          h="8vh"
          zIndex="modal"
        >
          <Footer />
        </Box>
      </Wrapper>
    </>
  );
};

export default Home;

/*


        <Grid
          gridTemplateRows={`10vh 80vh 10vh`}
          gridTemplateAreas={[`'header' 'main' 'footer'`]}
          gap={2}
        >
          <Box gridArea="header" bg={colors.body}>
            <Column>
              <Row justifyContent="flex-start">
                <Header />
              </Row>
            </Column>
          </Box>
          <Box gridArea="main" h="100%">
            <Row bg={colors.body} mb="2rem">
              <Filter />
            </Row>
            <Box pr={["0.8rem", "0"]}>
              <ListTimeFree />
            </Box>
            <Box>
              <ListReserved />
            </Box>
          </Box>
          <Box gridArea="footer" bg={colors.body}>
            <Footer />
          </Box>
        </Grid>
*/
