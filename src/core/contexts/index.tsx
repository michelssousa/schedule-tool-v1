import { useContext } from "react";

import ScheduleProvider, { ScheduleContext } from "./scheduleContext";

const useScheduleContext = () => useContext(ScheduleContext);

export { ScheduleProvider, useScheduleContext };
