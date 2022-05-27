import {
  Container,
  VStack,
  Flex,
  FlexProps,
  Box,
  Spinner,
} from "@chakra-ui/react";

import { Props } from "~/core";
import { colors, themeGlobal } from "~/styles";

export const StickTop: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Box
        bg={colors.body}
        left="0"
        position="fixed"
        width="100%"
        z-index="2"
        top="0"
        h="5rem"
      >
        <Content>{children}</Content>
      </Box>
    </>
  );
};

export const StickBottom: React.FC<Props> = ({ children }) => {
  return (
    <Box
      bg={colors.noActive}
      w="100%"
      left="0"
      position="fixed"
      bottom="0"
      h="4rem"
    >
      <Content>{children}</Content>
    </Box>
  );
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <Container
      w="full"
      h="100vh"
      position="relative"
      // bg="gray.600"
      bg={colors.noActive}
      maxW="container.md"
      overflow="hidden"
      px={["0.5rem"]}
    >
      {children}
    </Container>
  );
};

type ContentProps = Props & {
  color: string;
};

export const Content: React.FC<Partial<ContentProps>> = ({
  color,
  children,
  ...rest
}) => {
  return (
    <>
      <VStack h="100vh" w="100wh" bg={color} {...rest} m="0" p="0">
        {children}
      </VStack>
    </>
  );
};

export const Row: React.FC<Partial<FlexProps>> = ({ children, ...rest }) => {
  return (
    <>
      <Flex
        minWidth="max-content"
        justifyContent="center"
        alignItems="center"
        flexDir="row"
        h={"full"}
        w="full"
        gap="2"
        {...rest}
      >
        {children}
      </Flex>
    </>
  );
};

export const Column: React.FC<Partial<FlexProps>> = ({ children, ...rest }) => {
  return (
    <>
      <Flex
        minWidth="max-content"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        h={"full"}
        w="full"
        gap="2"
        {...rest}
      >
        {children}
      </Flex>
    </>
  );
};

export const Loading = () => <Spinner size="xl" />;
