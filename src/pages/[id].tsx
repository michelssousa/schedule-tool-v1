import { useEffect } from "react";

import { Grid, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
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
  const { setUpdate, update, setUser } = useScheduleContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setUser(id);
  });

  return (
    <>
      <Wrapper>
        <Grid
          gridTemplateRows={[`10vh 80vh 10vh`]}
          gridTemplateAreas={[`'header' 'main' 'footer'`]}
          gap={2}
        >
          <Box gridArea="header" bg={colors.body}>
            <Column h="70%" w="100%">
              <Row flex="1" w="100%" justifyContent="flex-start">
                <Header />
              </Row>
            </Column>
          </Box>
          <Box gridArea="main">
            <Row h="15vh" w="100%" bg={colors.body} mb="1rem">
              <Filter />
            </Row>
            <Box h="30vh" mb="0.5rem">
              <ListTimeFree />
            </Box>
            <Box h="40vh">
              <ListReserved />
            </Box>
          </Box>
          <Box zIndex="1000" h="15vh" gridArea="footer" bg={colors.body}>
            <Footer />
          </Box>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Home;
