import { type ReactElement } from "react";
import { Text, Divider, Flex } from "@mantine/core";
import { styled as p } from "@panda/jsx";

export default function Footer(): ReactElement {
  return (
    <p.div h={30}>
      <Divider size="sm" />
      <Flex align="center" justify="center">
        <Text>nasubi-dev</Text>
      </Flex>
    </p.div>
  );
}
