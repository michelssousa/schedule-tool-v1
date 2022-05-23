import React, { createContext, useEffect, useState } from "react";

import { Props, scheduleManager } from "~/core";
import { Setup } from "~/core/schedule";

export type RoomType = {
  i_salas: string;
  sala: string;
};

type ScheduleContextProps = Partial<{
  room: number;
  day: number;
  month: number;
  year: number;
  hoursSelected: string[];
  setHoursSelected: any;
  getSetup: Setup;
  getUser: number;
  setUser: any;
  rooms: RoomType[];
  update: boolean;
  setUpdate: any;
  setRooms: any;
  saveSchedule: () => Promise<boolean>;
  deleteSchedule: (e: React.MouseEvent<HTMLButtonElement>) => Promise<boolean>;
  getRoomSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  getDaySelectOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getHoursFreeSelected: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>;

export const ScheduleContext = createContext<ScheduleContextProps>({});

const ScheduleProvider: React.FC<Props> = ({ children }) => {
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [room, setRoom] = useState<number>(1);
  const [hoursSelected, setHoursSelected] = useState<string[]>([]);
  const [getSetup, setSetup] = useState<Setup>();
  const [getUser, setUser] = useState(0);
  const [rooms, setRooms] = useState<RoomType[]>();
  const [update, setUpdate] = useState();

  const _result: ScheduleContextProps = {
    day,
    room,
    month,
    year,
    hoursSelected,
    setHoursSelected,
    getSetup,
    getUser,
    setUser,
    rooms,
    setRooms,
    update,
    setUpdate,
    saveSchedule: async () => {
      const _result = await scheduleManager.shedulePost(hoursSelected);
      if (_result) {
        setHoursSelected([]);
        return true;
      }
      return false;
    },
    deleteSchedule: async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const scheduleKeyDeleted = e.currentTarget.value;
      const _result = await scheduleManager.sheduleDelete(scheduleKeyDeleted);
      if (_result) {
        setHoursSelected((list) => [...list, "1"]);
        setHoursSelected([]);
        return _result;
      }
      return _result;
    },
    getHoursFreeSelected: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const _buttonSelected = e.currentTarget.value;

      if (hoursSelected.indexOf(_buttonSelected) === -1) {
        setHoursSelected((list) => [...list, _buttonSelected]);
      } else {
        setHoursSelected(
          hoursSelected.filter((item) => item !== _buttonSelected)
        );
      }
    },
    getRoomSelectOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      setHoursSelected([]);
      setRoom(parseInt(e.target.value));
    },

    getDaySelectOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value: string = e.target.value;
      setYear(parseInt(value.slice(0, 4)));
      setMonth(parseInt(value.slice(5, 7)));
      setDay(parseInt(value.slice(8)));
      setHoursSelected([]);
    },
  };

  useEffect(() => {
    async function getRoomsNames() {
      const _setup = await scheduleManager.getSetup();
      setSetup(_setup);
    }
    getRoomsNames();
  });

  return (
    <ScheduleContext.Provider value={_result}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;
