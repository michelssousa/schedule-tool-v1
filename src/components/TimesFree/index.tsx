import React, { useEffect, useState } from "react";

import { Grid, Button } from "@chakra-ui/react";

import { Column, Loading } from "~/components";
import { Props, scheduleManager } from "~/core";
import { useScheduleContext } from "~/core/contexts";

import { Title } from "../layout";

type ButtonTimeProps = Props & {
  value: string;
};

type MGridProps = Props & {
  list: string[];
};

const MGrid: React.FC<MGridProps> = ({ list }) => {
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={["0.5", "2"]} w="100%">
        {list.map((key) => (
          <TimeButton key={key} value={key} />
        ))}
      </Grid>
    </>
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
      h="1rem"
      size={["xs", "xs"]}
      padding={["0", "0.7rem"]}
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
      <Column align="flex-start" justify="flex-start" position="relative">
        <Column w="100" h="20%" position="absolute" top="0">
          <Title text="Selecione o horário de inicio da reserva" />
          <Title text={`Tempo Reservado : ${_timeSelected} Hora(s)`} />
        </Column>

        <Column
          w="100%"
          h="80%"
          position="absolute"
          bottom="0"
          align="center"
          justifyContent="center"
        >
          {schedulesFree.length == 0 ? (
            <Loading />
          ) : (
            <MGrid list={schedulesFree} />
          )}
        </Column>
        {/* <div>{JSON.stringify(hoursSelected, true, 2)}</div> */}
      </Column>
    </>
  );
};

export default ListTimeFree;
