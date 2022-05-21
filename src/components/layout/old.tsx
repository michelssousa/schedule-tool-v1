import React, { FC, useEffect, useState } from "react";

import { CalendarIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Container,
  Stack,
  Heading,
  Flex,
  StackProps,
  Button,
  Text,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  SelectProps,
  VStack,
} from "@chakra-ui/react";

import { Props, scheduleManager } from "~/core";
import { useScheduleContext } from "~/core/contexts";

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <Container
      position={"absolute"}
      left="-50%"
      right="-50%"
      maxW="container.sm"
      p={0}
      bg="red"
    >
      {children}
    </Container>
  );
};
export const Content = (props: StackProps) => (
  <Stack w={"100%"} h={"100%"} bg="body" color="black" {...props} />
);

export const Header: FC<Props> = () => {
  return (
    <Wrapper>
      <VStack w="100%" h="4">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={2}
          bg="blue.500"
          color="white"
          w="100%"
          zIndex="dropdown"
        >
          <Flex align="center">
            <Heading as="h2" letterSpacing={"tighter"}>
              Tool - Reserva de Salas
            </Heading>
          </Flex>

          <Stack direction={"row"} spacing={3}>
            <Button variant={"ghost"} size="lg" colorScheme={"white"}>
              <CalendarIcon w={["5", "6"]} h={["5", "6"]} />
            </Button>
            <Button variant={"ghost"} size="lg" colorScheme={"white"}>
              <SettingsIcon w={["5", "6"]} h={["5", "6"]} />
            </Button>
          </Stack>
        </Flex>
        <Content p="2">
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
              />
              <Input type="tel" placeholder="Phone number" />
            </InputGroup>
          </Stack>
        </Content>
      </VStack>
    </Wrapper>
  );
};

export const SelectRoom: FC<SelectProps> = () => {
  const [getRoom, setRoom] = useState<string[]>();
  const { getRoomSelectOnChange } = useScheduleContext();

  useEffect(() => {
    const getRoomFromApi = async () => {
      const data = await scheduleManager.getSetup();
      setRoom(data.rooms);
    };
    getRoomFromApi();
  }, []);

  return (
    <Select placeholder="Sala" onChange={getRoomSelectOnChange}>
      {getRoom?.map((room) => (
        <option key={room} value={room.toString()}>
          {room.toString()}
        </option>
      ))}
    </Select>
  );
};

export const SelectData = () => (
  <DatePicker name="date" onChange={(date: string) => console.log(date)} />
);

type FreeTimeButtonProps = {
  name: string;
};
export const FreeTimeButton: FC<FreeTimeButtonProps> = ({ name }) => {
  const [show, setShow] = useState(false);

  const handleClick = (value: any) => {
    setShow(!show);
  };

  return (
    <Button
      variant={show ? "solid" : "outline"}
      colorScheme="facebook"
      h="1.8rem"
      size="lg"
      w="100%"
      value={name}
      onClick={(e) => handleClick(e)}
      isActive
    >
      {name}
    </Button>
  );
};

type FreeListTimeProps = {
  day: string;
};

export const FreeListTime: FC<FreeListTimeProps> = ({ day }) => {
  return <Text>im list</Text>;
};

type ListReservedDetailProps = {
  day: string;
  hour: string;
  owner: string;
  room: string;
};

export const ListReservedDetail: FC<ListReservedDetailProps> = ({
  day,
  hours,
  owner,
  room,
}) => {
  return <Text>im list</Text>;
};
