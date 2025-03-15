import { type ReactElement } from "react";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
  Text,
  Flex,
} from "@mantine/core";
import { styled as p } from "@panda/jsx";
import { $colorScheme } from "../stores/option";

export default function Header(): ReactElement {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  $colorScheme.set(colorScheme);
  const selected = colorScheme === "light" ? "dark" : "light";

  return (
    <p.div h="50" mt={3} mx={3}>
      <Flex align="center" direction="row">
      <Text size="xl">nasubi.dev   🚧改修予定🚧</Text>
        <Flex gap={10} ml="auto">
          <ActionIcon
            aria-label="Twitter Account"
            color="indigo.8"
            component="a"
            href="https://twitter.com/nasubi_dev"
            size="lg"
            target="_blank"
            variant="outline"
          >
            <Icon height={24} icon="mdi:twitter" width={24} />
          </ActionIcon>
          <ActionIcon
            aria-label="Github Account"
            color={colorScheme === "light" ? "black" : "white"}
            component="a"
            href="https://github.com/nasubi-dev"
            size="lg"
            target="_blank"
            variant="outline"
          >
            <Icon height={24} icon="mdi:github" width={24} />
          </ActionIcon>
          <ActionIcon
            aria-label="Toggle color scheme"
            color={colorScheme === "light" ? "violet.8" : "white"}
            onClick={() => {
              setColorScheme(selected);
              $colorScheme.set(selected);
            }}
            size="lg"
            variant="outline"
          >
            <Icon
              height={24}
              icon={
                colorScheme === "light"
                  ? "material-symbols:dark-mode-outline"
                  : "material-symbols-light:light-mode-outline"
              }
              width={24}
            />
          </ActionIcon>
        </Flex>
      </Flex>
    </p.div>
  );
}
