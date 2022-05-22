import { useContext } from "react";

import ScheduleProvider, { RoomType, ScheduleContext } from "./scheduleContext";

const useScheduleContext = () => useContext(ScheduleContext);

export { ScheduleProvider, useScheduleContext };

export type { RoomType };
