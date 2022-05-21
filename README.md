import React, { FC } from "react";

import { Props, ScheduleProvider } from "~/core";

export const Greeting: FC<Props> = ({ children }) => {
// name is string!
return <h1>Hello {name}</h1>;
};

import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const TimeButton = (props) => {
const [show, setShow] = useBoolean() //useState(false);

const handleClick = (value) => {
setShow(!show);
props.ddd(value);
};

return (
<Button
variant={show ? "solid" : "outline"}
colorScheme="facebook"
h="1.8rem"
size="lg"
w="100%"
value={props.name}
onClick={(e) => handleClick(e.target.value)}
isActive
{...props} >
{props.name}
</Button>
);
};

export default TimeButton;

import React, { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import TimeButton from "./timeButton";
import useSWR from "swr";
import fetcher from "./fetcher";

const ListTimesFree = (props) => {
const [schedules, setSchedule] = useState([]);
const url = "https://toolbusiness.com.br/salas/api.php?entidade=reserva/M";
const { data } = useSWR(url, fetcher, { refreshInterval: 1000 });
const [hoursSelected, setHoursSelected] = useState([]);

const ddd = (e) => {
if (hoursSelected.indexOf(e) === -1) {
setHoursSelected((list) => [...list, e]);
} else {
setHoursSelected(hoursSelected.filter((item) => item !== e));
}
};

useEffect(() => {
let schedules = [];
for (let shc = 0; shc < props.day; shc++) {
schedules.push(`${shc}:00`);
}
setSchedule(schedules);
}, [props.day]);

return (
<>
<Grid w="100%" p={1} templateColumns="repeat(5, 1fr)" gap={2}>
{schedules.map((d) => (
<TimeButton key={d} name={d} ddd={ddd} />
))}
</Grid>
<pre>{JSON.stringify(hoursSelected, null, 2)}</pre>
</>
);
};

export default ListTimesFree;

import {
List,
ListItem,
Box,
HStack,
Stack,
VStack,
Text,
Avatar,
Button
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import styled from "styled-components";

// #ID + 09:30 + Fulano de Tal + iconeDeletar
const ListScheduleReserverd = (props) => {
return (
<List spacing={2} w="100%" h="100%">
<ScheduleList date="25/12" hour="19:00" owner="Fulano de Tal" />
<ScheduleList date="25/12" hour="19:00" owner="Fulano de Tal" />
<ScheduleList date="25/12" hour="19:00" owner="Fulano de Tal" />
<ScheduleList date="25/12" hour="19:00" owner="Fulano de Tal" />
</List>
);
};

export default ListScheduleReserverd;

const ScheduleList = (props) => {
return (
<ListItem bg="white">
<HStack px="0.3rem" align={"center"} justify={"space-between"}>
<HStack>
<Stack direction={"row"}>
<Button
              h="3rem"
              w="3rem"
              borderRadius="50%"
              colorScheme="facebook"
              color="#fff"
              bg="#3b5998"
              p="1.5rem"
              m="0.6rem"
              transition="0.3s ease"
              overflow="hidden"
              float="left"
            >
19:30
</Button>
</Stack>
<VStack direction={"row"} align={"start"} justify={"center"}>
<Text as="sub">
{props.date} {props.hour}{" "}
</Text>
<Text as="kbd">{props.owner} - Sala1</Text>
</VStack>
</HStack>

        <Button
          aria-label="Edit Schedule"
          variant="ghost"
          colorScheme="facebook"
          _focus={{ boxShadow: "none" }}
          w="fit-content"
          {...props}
        >
          <DeleteIcon />
        </Button>
      </HStack>
    </ListItem>

);
};

final---
function App() {
//const day = Math.floor(Math.random() \* 20);
const [day, setDay] = useState(new Date().getDate());
const startDate = moment(new Date()).format("YYYY-MM-DD");

const getValue = (e) => {
const dateSelected = `${e.target.value}`.slice(8);
setDay(dateSelected);
};

useEffect(() => {
window.addEventListener("scroll", () => {});
}, []);

return (
<ChakraProvider>
<StickTop h="5rem">
<VStack>
<Header getValue={getValue} startDate={startDate} />
</VStack>
</StickTop>
<Wrapper>
<Text>Horarios disponíveis</Text>
<Text>{day}</Text>
<ListTimeFree day={day} />
<Text>Horarios Reservados</Text>
<ListScheduleReserved />
</Wrapper>
<StickBottom>
<HStack py="1" align="center" justifyContent="center">
<Button w="15rem" colorScheme="facebook">
Reservar
</Button>
</HStack>
</StickBottom>
</ChakraProvider>
);
}
