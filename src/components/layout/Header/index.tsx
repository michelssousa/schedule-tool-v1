import React, { useEffect, useState } from "react";

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
} from "@chakra-ui/react";
import moment from "moment";

import { Column, Row } from "~/components";
import { Props, scheduleManager } from "~/core";
import { useScheduleContext, RoomType } from "~/core/contexts";
import { colors, themeGlobal } from "~/styles";

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
    <Box>
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
    <Row w="100%" p={themeGlobal.padding}>
      <Box w="60%" minWidth="max-content">
        <FormControl>
          <FormLabel htmlFor="sala reuniao">Sala</FormLabel>
          <Select
            // placeholder="Selecione uma sala"
            onChange={getRoomSelectOnChange}
            defaultValue={rooms?.length}
          >
            {rooms?.map((room: RoomType) => (
              <option key={room.i_salas} value={room.i_salas}>
                {room.sala}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box w="40%">
        <FormControl>
          <FormLabel htmlFor="schedule">Data</FormLabel>
          <Input
            type="date"
            // defaultValue={_startDay}
            min={_startDay}
            onChange={getDaySelectOnChange}
          />
        </FormControl>
      </Box>
    </Row>
  );
};
