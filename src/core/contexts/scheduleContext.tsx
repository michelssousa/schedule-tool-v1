import React, { createContext } from "react";
import { Props } from "~/core";

type ScheduleContextProps = Partial<{
  data: {};
  daySelected: number;
}>;

export const ScheduleContext = createContext<ScheduleContextProps>({});

const ScheduleProvider: React.FC<Props> = ({ children }) => {
  const _result: ScheduleContextProps = {
    data: {
      name: "michel",
    },
  };
  return (
    <ScheduleContext.Provider value={_result}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;
