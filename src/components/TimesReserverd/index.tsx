import React, { useEffect, useState } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Text,
  List,
  ListItem,
  HStack,
  Stack,
  VStack,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";

import { Title, Row } from "~/components";
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
  const { deleteSchedule, rooms } = useScheduleContext();
  const _date = `${date.slice(0, 2)}/${date.slice(2, 4)}`;
  const _hour = `${hour.slice(0, 2)}:${hour.slice(2, 4)}`;
  const toast = useToast();

  const _roomName = rooms?.filter((room: RoomType) => room.i_salas == roomId)[0]
    .sala;

  const _deleteSchedule = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const _result = await deleteSchedule?.(e);
    if (_result) {
      toast({
        title: "Cancelamento de Reserva",
        description: "Feito com sucesso",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <ListItem bg="white">
      <HStack px="0.3rem" align={"center"} justify={"space-between"}>
        <HStack>
          <Stack direction={"row"}>
            <Button
              h={["3rem", "4rem"]}
              w={["3rem", "4rem"]}
              borderRadius="50%"
              colorScheme="facebook"
              color={colors.noActive}
              bg={colors.primary}
              p={["0.6rem", "1.5rem"]}
              m="0.6rem"
              transition="0.3s ease"
              overflow="hidden"
              float="left"
            >
              {_hour}
            </Button>
          </Stack>
          <VStack
            h="100%"
            direction={"row"}
            align={["start", "space-between"]}
            justify={["center", "space-between"]}
            spacing={["1", "5"]}
          >
            <Text as="sub">{`${_date} ${_hour}`}</Text>
            <Text as="kbd">{`Local: ${_roomName}`}</Text>
          </VStack>
        </HStack>

        <Button
          h="3rem"
          w="3rem"
          variant="ghost"
          borderRadius="50%"
          p="1.5rem"
          m="0.6rem"
          transition="0.3s ease"
          overflow="hidden"
          float="left"
          value={scheduleKey}
          _focus={{ boxShadow: "red.300" }}
          onClick={_deleteSchedule}
        >
          <DeleteIcon w="6" h="6" color="red" />
        </Button>
      </HStack>
    </ListItem>
  );
};

const WithoutReserved = () => (
  <Row bg="facebook.100">
    <Text color={colors.primary}>Você não reservas para essa data 🕐 🍻</Text>
  </Row>
);

type WithReservedProps = {
  list: ScheduleDetail[];
};
const WithReserved = ({ list }: WithReservedProps) => (
  <List spacing={2} bg="transparent" mt="1rem">
    {list.map((schedule: ScheduleDetail) => (
      <ListReservedDetail
        key={schedule.key + schedule.hour + schedule.data}
        date={schedule.data}
        hour={schedule.hour}
        roomId={schedule.room}
        scheduleKey={schedule?.key}
      />
    ))}
  </List>
);

const ListReserved: React.FC<Props> = () => {
  const { hoursSelected, day, room, month, year, getUser } =
    useScheduleContext();
  const [schedulesReserved, setScheduleReserved] = useState<ScheduleDetail[]>(
    []
  );

  useEffect(() => {
    async function builScheduleFree() {
      const _month = `${month}`.length == 1 ? `0${month}` : month;
      const _day = `${day}`.length == 1 ? `0${day}` : day;
      const _key = `${_day}${_month}${year}`;
      const _blackList = await scheduleManager.blackList();

      const _listReservedForUserAndData = [..._blackList.values()].filter(
        (schedule: ScheduleDetail) => {
          return schedule.data === _key && schedule.idUser == `${getUser}`;
        }
      );
      setScheduleReserved([..._listReservedForUserAndData]);
    }

    builScheduleFree();
  }, [getUser, day, room, month, year, hoursSelected]);

  if (schedulesReserved.length <= 0) {
    return <WithoutReserved />;
  }

  return (
    <Box
      position="absolute"
      bg={colors.noActive}
      w="100%"
      h="100%"
      px={["0.1rem", "0.1rem"]}
      overflowY="auto"
    >
      <Row h="10%">
        <Title text="Suas reservas para essa data"></Title>
      </Row>
      <WithReserved list={[...schedulesReserved]} />
    </Box>
  );
};

export default ListReserved;

/*
 */
