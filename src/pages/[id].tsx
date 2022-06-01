import { useEffect, useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Header,
  Filter,
  Wrapper,
  ListTimeFree,
  Footer,
  Row,
} from "~/components";
import ListReserved from "~/components/TimesReserverd";
import { useScheduleContext } from "~/core/contexts";
import { colors } from "~/styles";

const Home: NextPage = () => {
  const USER_ID = 1;
  const SYSTEM_PASS = 0;
  const { setUser, getSetup } = useScheduleContext();
  const [useIsValid, setUseIsValid] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    try {
      const _result: string[] = atob(`${id}`).toString().split(".");
      if (_result[SYSTEM_PASS] === getSetup?.chaveToken) {
        setUseIsValid(true);
        setUser(parseInt(_result[USER_ID]));
      }
    } catch {
      setUseIsValid(false);
    }
  }, [getSetup?.chaveToken, setUser, id]);

  if (useIsValid == false) {
    return (
      <>
        <Wrapper>
          <Row>
            <Text color={colors.primary} fontSize={["sm", "md"]}>
              🍺 🍺: OPS! Você nao tem acesso para reservar salas 🍺
            </Text>
          </Row>
        </Wrapper>
      </>
    );
  }

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
          <Box
            h={["40%", "35%"]}
            bg={colors.body}
            mt="1.5%"
            position="relative"
          >
            <ListTimeFree />
          </Box>
          <Box
            w="100%"
            h={["46%", "50%"]}
            bg={colors.body}
            mt="1.5%"
            position="relative"
            overflow="hidden"
          >
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
