import React, { useEffect, useState } from "react";

import {
  Heading,
  Text,
  List,
  ListItem,
  Box,
  HStack,
  Stack,
  VStack,
  Avatar,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Column, Row, Loading } from "~/components";
import { Props, scheduleManager } from "~/core";
import { useScheduleContext, RoomType } from "~/core/contexts";
import { ScheduleDetail } from "~/core/schedule";
import { colors } from "~/styles";

type ListReservedDetailProps = Props & {
  date: string;
  hour: string;
  roomId: string;
  scheduleKey?: string;
};

const ListReservedDetail: React.FC<ListReservedDetailProps> = ({
  date,
  hour,
  roomId,
  scheduleKey,
}) => {
  const { rooms } = useScheduleContext();
  const _date = `${date.slice(0, 2)}/${date.slice(2, 4)}`;
  const _hour = `${hour.slice(0, 2)}:${hour.slice(2, 4)}`;

  const _roomName = rooms?.filter((room: RoomType) => room.i_salas == roomId)[0]
    .sala;

  return (
    <ListItem bg="white">
      <HStack px="0.3rem" align={"center"} justify={"space-between"}>
        <HStack>
          <Stack direction={"row"}>
            <Button
              h="4rem"
              w="4rem"
              borderRadius="50%"
              colorScheme="facebook"
              color={colors.noActive}
              bg={colors.primary}
              p="1.5rem"
              m="0.6rem"
              transition="0.3s ease"
              overflow="hidden"
              float="left"
            >
              {_hour}
            </Button>
          </Stack>
          <VStack h="100%" direction={"row"} align={"start"} justify={"center"}>
            <Text as="sub">{`${_date} ${_hour}`}</Text>
            <Spacer />
            <Text as="kbd">{`Local: ${_roomName}`}</Text>
          </VStack>
        </HStack>

        <Button
          h="5rem"
          w="5rem"
          variant="ghost"
          borderRadius="50%"
          p="1.5rem"
          m="0.6rem"
          transition="0.3s ease"
          overflow="hidden"
          float="left"
          value={scheduleKey}
          _focus={{ boxShadow: "red.300" }}
        >
          <DeleteIcon w="8" h="8" color="red" />
        </Button>
      </HStack>
    </ListItem>
  );
};

const WithoutReserved = () => (
  <Column h="100" alignItems="center" justify="center">
    <Text as="i" color={colors.primary}>
      {" "}
      Você não reservas para essa data
    </Text>
  </Column>
);

type WithReservedProps = {
  list: ScheduleDetail[];
};
const WithReserved = ({ list }: WithReservedProps) => (
  <List spacing={2} w="100%" h="100%">
    {list.map((schedule: ScheduleDetail) => (
      <ListReservedDetail
        key={schedule.key + schedule.hour}
        date={schedule.data}
        hour={schedule.hour}
        roomId={schedule.room}
        scheduleKey={schedule?.key}
      />
    ))}
  </List>
);

const ListReserved: React.FC<Props> = () => {
  const { day, room, month, year, getUser } = useScheduleContext();
  const [schedulesReserved, setScheduleReserved] = useState<ScheduleDetail[]>(
    []
  );
  useEffect(() => {
    async function builScheduleFree() {
      const _month = `${month}`.length == 1 ? `0${month}` : month;
      const _key = `${day}${_month}${year}`;
      const _blackList = await scheduleManager.blackList();

      const _listReservedForUserAndData = [..._blackList.values()].filter(
        (schedule: ScheduleDetail) => {
          return schedule.data === _key && schedule.idUser == `${getUser}`;
        }
      );
      setScheduleReserved([..._listReservedForUserAndData]);
    }

    builScheduleFree();
  }, [getUser, day, room, month, year]);

  return (
    <>
      <Column h="100%" alignItems="flex-start" justifyContent="flex-start">
        <Row justifyContent="flex-start" w="100%">
          <Heading as="h6" size="md">
            {`Suas Reservas para: ${day}/${month}/${year}`}
          </Heading>
        </Row>
        <Column w="100%" mt="1rem" px={["none", "5rem"]}>
          {schedulesReserved.length <= 0 ? (
            <WithoutReserved />
          ) : (
            <WithReserved list={[...schedulesReserved]} />
          )}
        </Column>
      </Column>
    </>
  );
};

export default ListReserved;

/*
 */
