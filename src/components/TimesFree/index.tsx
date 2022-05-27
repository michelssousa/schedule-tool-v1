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
    <Grid templateColumns="repeat(5, 1fr)" gap={2} w="100%">
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
  const { getUser, getSetup, day, room, month, year, hoursSelected } =
    useScheduleContext();
  const [schedulesFree, setScheduleFree] = useState<string[]>([]);
  const _minimumHours = 60;
  const _hourSelect = hoursSelected?.length ?? 0;
  const _getMimunHours = getSetup?.minimumHours ?? 1;
  const _timeSelected = _hourSelect / (_minimumHours / _getMimunHours);

  useEffect(() => {
    async function builScheduleFree() {
      setScheduleFree([]);
      const _result = await scheduleManager.whiteList(
        `${room}`,
        day,
        month,
        year,
        getUser
      );
      setScheduleFree([..._result.keys()]);
    }

    if (hoursSelected?.length == 0) {
      builScheduleFree();
    }
  }, [day, getUser, month, year, room, hoursSelected]);

  return (
    <>
      <Column align="flex-start" justify="flex-start">
        <Heading as="h5" size={["xs", "md"]}>
          Selecione o horário de inicio da reunião
        </Heading>

        <Heading as="h6" size="xs" mb={["0", "1rem"]}>
          Tempo Reservado : {`${_timeSelected} Hora(s)`}
        </Heading>

        {schedulesFree.length == 0 ? (
          <Loading />
        ) : (
          <MGrid list={schedulesFree} />
        )}
        {/* <div>{JSON.stringify(hoursSelected, true, 2)}</div> */}
      </Column>
    </>
  );
};

export default ListTimeFree;
