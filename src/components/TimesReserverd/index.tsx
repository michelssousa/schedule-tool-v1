import React, { useEffect, useState } from "react";

import { Heading, Grid, Text, Button } from "@chakra-ui/react";
import { Column, Row } from "~/components";

import { Props, scheduleManager } from "~/core";
import { useScheduleContext } from "~/core/contexts";
import { colors } from "~/styles";
import { ScheduleDetail } from "~/core/schedule";

const ListReserved: React.FC<Props> = () => {
  const { day, room, month, year } = useScheduleContext();
  const [schedulesReserved, setScheduleReserved] = useState<
    ScheduleDetail[] | []
  >([]);
  // const _label = scheduleManager.scheduleReduceToHourLabel(
  //   scheduleManager.format.toMakeScheduleDetail(value)
  // );

  useEffect(() => {
    async function builScheduleFree() {
      // const _result = await scheduleManager.blackListResumeForDayAndRoom();
      const _month = `${month}`.length == 1 ? `0${month}` : month;
      const blackList = await scheduleManager.blackList();
      const _schedules = [...blackList.values()];
      const key = `${day}${_month}${year}`;

      const _result: ScheduleDetail[] = _schedules.filter(
        ({ room }) => room === room
      );
      setScheduleReserved([..._result]);
    }

    builScheduleFree();
  }, [day, room, month, year]);

  return (
    <>
      <Column h="100%" bg="red" color={colors.body}>
        {schedulesReserved.map((schedule?) => (
          <Text key={schedule.idSchedule}>{schedule.data}</Text>
        ))}
      </Column>
    </>
  );
};

export default ListReserved;
