import axios from "axios";
import moment from "moment";

export type Schedule = {
  i_reserva: string;
  reserva: string;
};

export type ScheduleDetail = {
  room: string;
  data: string;
  hour: string;
  idUser: string;
  idSchedule: string;
  key?: string;
};

export type Setup = {
  i_setup: string;
  minimumHours: number;
  rooms: [];
  days: number;
  hourOpen: number;
  hourOff: number;
  minutesOpen: number;
};

const fetcher = (url: string) => axios.get(url).then((res: any) => res.data);

const post = (data: any) =>
  axios
    .post(scheduleManager.endpoints.schedulePost, data)
    .then((res: any) => res.data)
    .catch(() => []);

export const scheduleManager = {
  hello: function () {
    return "";
  },
  endpoints: {
    scheduleActual:
      "https://toolbusiness.com.br/salas/api.php?entidade=reserva/C",
    setup: "https://toolbusiness.com.br/salas/api.php?entidade=setup",
    scheduleAll: "https://toolbusiness.com.br/salas/api.php?entidade=reserva/C",
    schedulePost:
      "https://toolbusiness.com.br/salas/api.php?entidade=reserva/M",
    rooms: "https://toolbusiness.com.br/salas/api.php?entidade=salas",
  },
  getRoomsForName: async () => {
    const _getRooms = await fetcher(scheduleManager.endpoints.rooms);
    return _getRooms;
  },
  shedulePost: async (data: string[]) => {
    try {
      const json = JSON.stringify({ reserva: data });
      const _result = await post(json);

      if (_result) {
        // console.log(_result); verificar
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  sheduleDelete: async (data: string) => {
    try {
      const _data: string[] = [data];
      const json = JSON.stringify({ cancelar: _data });
      const _result = await post(json);
      if (_result) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
  format: {
    data: "DDMMYYYY-HHmmss",
    toScheduleDetail: (schedule: Schedule) => {
      const detail = schedule.reserva.split("-");
      const _result: ScheduleDetail = {
        room: detail[0],
        data: detail[1],
        hour: detail[2],
        idUser: detail[3],
        idSchedule: schedule.i_reserva,
        key: schedule.reserva,
      };
      return _result;
    },
    toMakeScheduleDetail: (schedule: string) => {
      const detail = schedule.split("-");
      const _result: Partial<ScheduleDetail> = {
        room: detail[0],
        data: detail[1],
        hour: detail[2],
        idUser: detail[3],
        key: schedule,
      };
      return _result;
    },
    key: (room: string, date: string, user: number): string =>
      `${room}-${date}-${user}`,
  },
  getSetup: async () => {
    const getSetup = await fetcher(scheduleManager.endpoints.setup);
    const _resut: Setup = {
      i_setup: getSetup.data[0].i_setup,
      minimumHours: parseInt(getSetup.data[0].minimumHours),
      rooms: getSetup.data[0].rooms,
      days: parseInt(getSetup.data[0].days),
      hourOpen: parseInt(getSetup.data[0].hourOpen),
      hourOff: parseInt(getSetup.data[0].hourOff),
      minutesOpen: parseInt(getSetup.data[0].minutesOpen),
    };
    return _resut;
  },
  blackList: async () => {
    const _result = new Map<string, ScheduleDetail>();
    try {
      const getHoursReserved = await fetcher(
        scheduleManager.endpoints.scheduleAll
      );
      const getHoursReservedTemp: Schedule[] = [...getHoursReserved.data];
      getHoursReservedTemp.map((reserved) =>
        _result.set(
          reserved.reserva,
          scheduleManager.format.toScheduleDetail(reserved)
        )
      );
      return _result;
    } catch (error) {
      return _result;
    }
  },
  isReserved: (
    list: ScheduleDetail[],
    reservedData: string,
    reservedHour: string,
    reservedRoom: string
  ) => {
    const _result = list.find(
      ({ data, hour, room }) =>
        data === reservedData && hour === reservedHour && room === reservedRoom
    );
    if (typeof _result != "undefined") {
      return true;
    }
    return false;
  },

  blackListResumeForDayAndRoom: async (
    reservedData: string,
    reservedHour: string,
    reservedRoom: string
  ) => {
    const blackList = await scheduleManager.blackList();
    const _schedules = [...blackList.values()];

    const _result = _schedules.find(
      ({ data, hour, room }) =>
        data === reservedData && hour === reservedHour && room === reservedRoom
    );
    if (typeof _result != "undefined") {
      return _result;
    }
    return [];
  },

  scheduleReduceToHourLabel(schedule: Partial<ScheduleDetail>) {
    const _scheduleHour = schedule.hour?.slice(0, 2);
    const _scheduleMinute = schedule.hour?.slice(2, 4);
    return `${_scheduleHour}:${_scheduleMinute}`;
  },

  scheduleReduceToDateLabel(schedule: Partial<ScheduleDetail>) {
    const _scheduleDay = schedule.data?.slice(0, 2);
    const _scheduleMonth = schedule.data?.slice(2, 4);
    return `${_scheduleDay}/${_scheduleMonth}`;
  },
  whiteList: async (
    room: string,
    day = 0,
    month = 0,
    year = 0,
    user = 0
  ): Promise<Map<string, Partial<ScheduleDetail>>> => {
    const setup = await scheduleManager.getSetup();
    const blackList = await scheduleManager.blackList();
    const _result = new Map<string, Partial<ScheduleDetail>>();
    const _oneHourInMinutes = 60;
    const _minimumHours: number = setup.minimumHours;
    const _days: number = day === 0 ? setup.days : 1;
    const _startDay: number = day === 0 ? new Date().getDate() : day;
    const _startMonth: number = month === 0 ? new Date().getMonth() : month - 1;
    const _startYear: number = year === 0 ? new Date().getFullYear() : year;
    const _cutOffTime = day === new Date().getDate() ? 1 : 1;
    const _hourSelectedUser =
      day === new Date().getDate() && new Date().getHours() >= setup.hourOpen
        ? new Date().getHours()
        : setup.hourOpen;

    const _minuteSelectedUser =
      day !== new Date().getDate()
        ? setup.minutesOpen
        : setup.minimumHours *
          Math.floor(new Date().getMinutes() / setup.minimumHours);

    const _numberOfHoursWorked: number =
      (setup.hourOff - _hourSelectedUser) * (_oneHourInMinutes / _minimumHours);

    const _reservedList = blackList.size > 0 ? [...blackList.values()] : [];

    let _baseScheduleKey = "";
    const _startHour = moment({
      day: _startDay,
      month: _startMonth,
      year: _startYear,
      hours: setup.hourOpen,
      minutes: setup.minutesOpen,
    });

    for (let day = 0; day < _days; day++) {
      _startHour.add(day, "day");
      _startHour.set("hours", _hourSelectedUser);
      _startHour.set("minute", _minuteSelectedUser);
      _baseScheduleKey = scheduleManager.format.key(
        room,
        _startHour.format(scheduleManager.format.data),
        user
      );

      if (
        !scheduleManager.isReserved(
          _reservedList,
          _startHour.format("DDMMYYYY"),
          _startHour.format("HHmmss"),
          room
        )
      ) {
        _result.set(
          _baseScheduleKey,
          scheduleManager.format.toMakeScheduleDetail(_baseScheduleKey)
        );
      }

      for (let hour = 0; hour < _numberOfHoursWorked - _cutOffTime; hour++) {
        _startHour.add(_minimumHours, "minutes");
        _baseScheduleKey = scheduleManager.format.key(
          room,
          _startHour.format(scheduleManager.format.data),
          user
        );

        if (
          !scheduleManager.isReserved(
            _reservedList,
            _startHour.format("DDMMYYYY"),
            _startHour.format("HHmmss"),
            room
          )
        ) {
          _result.set(
            _baseScheduleKey,
            scheduleManager.format.toMakeScheduleDetail(_baseScheduleKey)
          );
        }
      }
    }
    return _result;
  },
};
