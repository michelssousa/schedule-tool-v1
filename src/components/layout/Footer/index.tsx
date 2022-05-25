import { Button, useToast } from "@chakra-ui/react";

import { Row } from "~/components";
import { Props } from "~/core";
import { useScheduleContext } from "~/core/contexts";
import { colors } from "~/styles";

export const Footer: React.FC<Props> = () => {
  const { saveSchedule, hoursSelected } = useScheduleContext();
  const verifySelectedHours = hoursSelected?.length ?? 0;
  const toast = useToast();

  const scheduleRegister = async () => {
    const _result = await saveSchedule?.();

    if (_result) {
      toast({
        title: "Reserva",
        description: "Feita com sucesso! ",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Reserva",
        description: "Falha em reservar seu horario",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Row>
        <Button
          size="lg"
          colorScheme={"facebook"}
          color={colors.noActive}
          onClick={scheduleRegister}
          isDisabled={verifySelectedHours <= 0 ? true : false}
        >
          Reservar Horario(s)
        </Button>
      </Row>
    </>
  );
};
