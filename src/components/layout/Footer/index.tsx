import { Button } from "@chakra-ui/react";

import { Row } from "~/components";
import { Props } from "~/core";

export const Footer: React.FC<Props> = () => {
  return (
    <>
      <Row p="2">
        <Button w="100%" colorScheme={"facebook"}>
          Reservar
        </Button>
      </Row>
    </>
  );
};
