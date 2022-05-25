import React, { useEffect } from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Input,
  Box,
  BoxProps,
  Menu,
  MenuButton,
  Portal,
  MenuItem,
  MenuList,
  MenuProps,
  IconButton,
  FormControl,
  FormLabel,
  Select,
  Heading,
  HStack,
} from "@chakra-ui/react";
import moment from "moment";

import { Column, Row } from "~/components";
import { Props, scheduleManager } from "~/core";
import { useScheduleContext, RoomType } from "~/core/contexts";
import { colors } from "~/styles";

const Logo = (props: BoxProps) => (
  <Box {...props}>
    <Heading as="h4" size="md" color={colors.primary}>
      ToolBusiness - Reserva de Salas
    </Heading>
  </Box>
);

const MenuSetup = (props: Partial<MenuProps>) => (
  <Menu {...props}>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon w="6" h="6" />}
      variant="gosth"
      _focus={{ boxShadow: "none" }}
    />
    <Portal>
      <MenuList bg={colors.noActive} color="black">
        <MenuItem>Configurações</MenuItem>
        <MenuItem>Sobre</MenuItem>
      </MenuList>
    </Portal>
  </Menu>
);

export const Header: React.FC<BoxProps> = () => {
  return (
    <Box p="0" m="0" h="100%">
      <Column>
        <Row justifyContent="flex-start">
          <MenuSetup />
          <Logo />
        </Row>
      </Column>
    </Box>
  );
};

export const Filter: React.FC<Props> = () => {
  // const [rooms, setRooms] = useState<RoomType[]>();
  const _startDay = moment(new Date()).format("YYYY-MM-DD");
  const {
    update,
    rooms,
    setRooms,
    getRoomSelectOnChange,
    getDaySelectOnChange,
  } = useScheduleContext();

  useEffect(() => {
    async function getRoomsNames() {
      const _rooms = await scheduleManager.getRoomsForName();
      setRooms(_rooms.data);
    }
    getRoomsNames();
  }, [setRooms, update]);

  return (
    <Row w="100%">
      <HStack spacing="0.5" w="100%">
        <FormControl size={["xs", "md"]}>
          <FormLabel htmlFor="sala reuniao">Sala</FormLabel>
          <Select onChange={getRoomSelectOnChange} defaultValue={rooms?.length}>
            {rooms?.map((room: RoomType) => (
              <option key={room.i_salas} value={room.i_salas}>
                {room.sala}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel htmlFor="schedule">Data</FormLabel>
          <Input
            // w={["90%", "100%"]}
            px="0.5rem"
            type="date"
            // defaultValue={_startDay}
            min={_startDay}
            onChange={getDaySelectOnChange}
          />
        </FormControl>
      </HStack>
    </Row>
  );
};
