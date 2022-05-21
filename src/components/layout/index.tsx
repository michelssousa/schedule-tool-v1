import {
  Container,
  VStack,
  Flex,
  FlexProps,
  Box,
  Spinner,
} from "@chakra-ui/react";

import { Props } from "~/core";
import { colors } from "~/styles";

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
      bg={colors.body}
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
    <Container h="100vh" maxH="container.xl" maxW="container.sm" p="0">
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
      <VStack h="100%" w="100%" bg={color} {...rest}>
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
        gap="2"
        {...rest}
      >
        {children}
      </Flex>
    </>
  );
};

export const Loading = (props: Partial<Props>) => (
  <Column h="100%" bg="transparent" align="center" justify="center">
    <Spinner size="xl" />
  </Column>
);

//

//   <Text>Filter</Text>
// </Container>
// <Container bg="red" position="absolute" left="0" maxW="container.sm">
// export const Column = (props: StackProps) => (
//   <VStack
//     alignItems="center"
//     justifyContent="center"
//     w={"100%"}
//     h={"100%"}
//     {...props}
//   />
// );
