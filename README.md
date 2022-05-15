import React, { FC } from "react";

import { Props, ScheduleProvider } from "~/core";

export const Greeting: FC<Props> = ({ children }) => {
// name is string!
return <h1>Hello {name}</h1>;
};
