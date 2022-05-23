import React, { useEffect, useState } from "react";

import { Heading, Grid, Button } from "@chakra-ui/react";

import { Column, Row, Loading } from "~/components";
import { Props, scheduleManager } from "~/core";
import { useScheduleContext } from "~/core/contexts";

type ButtonTimeProps = Props & {
  value: string;
};

type MGridProps = Props & {
  list: string[];
};

const MGrid: React.FC<MGridProps> = ({ list }) => {
  return (
    <Grid w="100%" p={1} templateColumns="repeat(4, 1fr)" gap={2}>
      {list.map((key) => (
        <TimeButton key={key} value={key} />
      ))}
    </Grid>
  );
};

const TimeButton: React.FC<ButtonTimeProps> = ({ value, ...rest }) => {
  const [show, setShow] = useState(false);

  const { getHoursFreeSelected } = useScheduleContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShow(!show);
    getHoursFreeSelected?.(e);
  };

  const _label = scheduleManager.scheduleReduceToHourLabel(
    scheduleManager.format.toMakeScheduleDetail(value)
  );

  return (
    <Button
      {...rest}
      variant={show ? "solid" : "outline"}
      colorScheme="facebook"
      h="2rem"
      size="sm"
      padding="0.7rem"
      value={value}
      onClick={(e) => handleClick(e)}
      isActive
    >
      {_label}
    </Button>
  );
};

const ListTimeFree: React.FC<Props> = () => {
  const {
    getUser,
    getSetup,
    day,
    room,
    month,
    year,
    hoursSelected,
    setHoursSelected,
  } = useScheduleContext();
  const [schedulesFree, setScheduleFree] = useState<string[]>([]);
  const _minimumHours = 60;
  const _timeSelected =
    hoursSelected?.length / (_minimumHours / getSetup?.minimumHours);

  useEffect(() => {
    async function builScheduleFree() {
      setHoursSelected([]);
      const _result = await scheduleManager.whiteList(
        `${room}`,
        day,
        month,
        year,
        getUser
      );
      setScheduleFree([..._result.keys()]);
    }

    builScheduleFree();
  }, [day, getUser, month, year, setHoursSelected, room]);

  return (
    <>
      <Column h="100%">
        <Row justifyContent="flex-start" w="100%">
          <Heading as="h2" size="md">
            Selecione o horário de inicio da reunião
          </Heading>
        </Row>
        <Row justifyContent="flex-start" w="100%">
          <Heading as="h6" size="xs">
            Tempo Reservado :{`${_timeSelected} Hora(s)`}
          </Heading>
        </Row>
        {schedulesFree.length <= 0 ? (
          <Loading />
        ) : (
          <MGrid list={schedulesFree} />
        )}
        <div>{JSON.stringify(hoursSelected, true, 2)}</div>
      </Column>
    </>
  );
};

export default ListTimeFree;
