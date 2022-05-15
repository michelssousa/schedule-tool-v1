import { useContext } from "react";
import ScheduleProvider, { ScheduleContext } from "./scheduleContext";

const useSchedule = () => useContext(ScheduleContext);

export { ScheduleProvider, useSchedule };
