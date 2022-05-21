import { Spacer, Grid, Text, Box } from "@chakra-ui/react";
import type { NextPage } from "next";

import {
  Header,
  Filter,
  Row,
  Column,
  Wrapper,
  ListTimeFree,
} from "~/components";
import ListReserved from "~/components/TimesReserverd";
import { colors } from "~/styles";

const Home: NextPage = () => {
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
            <Row h="15%" w="100%" bg={colors.body} mb="1rem">
              <Filter />
            </Row>
            <Box h="30%" mb="1rem">
              <ListTimeFree />
            </Box>
            <Box h="55%">
              <ListReserved />
            </Box>
          </Box>
          <Box gridArea="footer" bg={colors.body}>
            footer
          </Box>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Home;

/*

import { useScheduleContext } from "~/core/contexts";
  const { day, room, getSetup } = useScheduleContext();
            <Column>
              <div>Michel Testando</div>
              <div> room: {room}</div>
              <div> day: {day}</div>
              <div> setup: {getSetup?.minimumHours}</div>
            </Column>
*/
