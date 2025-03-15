import { useMemo, useReducer, type ReactElement } from "react";
import { Text, Center, Group, Flex, em, Divider } from "@mantine/core";
import { useMediaQuery, useInViewport } from "@mantine/hooks";
import { styled as p } from "@panda/jsx";
import { $isMobile } from "../../stores/option";

type ExperienceData = {
  name: string;
  date: string;
  description?: string;
  state: "done" | "doing" | "future";
  middle?: string;
};

// 仮置き
const ExperiencesList: ExperienceData[] = [
  {
    name: "誕生",
    date: "2005年9月",
    state: "done",
  },
  {
    name: "愛知工業大学名電高等学校 - 情報科学科 - コンピュータシステム",
    date: "2021年4月 - 2024年3月",
    state: "done",
    description: "入学",
  },
  {
    name: "情報システム部",
    date: "2021年4月 - 2024年3月",
    state: "done",
    description: "入部",
  },
  {
    name: "ITパスポート合格",
    date: "2021年5月",
    state: "done",
  },
  {
    name: "基本情報技術者試験合格",
    date: "2024年3月",
    state: "done",
  },
  {
    name: "愛知工業大学 - 情報科学部 - 情報科学科 - コンピュータシステム専攻",
    date: "2024年4月 - 現在",
    state: "doing",
    description: "入学",
  },
  {
    name: "システム工学研究会",
    date: "2024年4月 - 現在",
    state: "doing",
    description: "入サークル",
  },
  {
    name: "NxTEND",
    date: "2024年12月 - 現在",
    state: "doing",
    description: "28Techのために所属"
  }
];

function Experience({
  experience,
  index,
}: {
  experience: ExperienceData;
  index: number;
}): ReactElement {
  const { ref, inViewport } = useInViewport();
  const [finished, updateFinished] = useReducer(() => true, false);

  useMemo(() => {
    if (inViewport) {
      updateFinished();
    }
    return () => {};
  }, [inViewport, experience.name]);

  return (
    <p.div position="relative">
      <p.div
        animation={inViewport || finished ? "moveYbt 1s" : ""}
        display={inViewport || finished ? "" : "none"}
      >
        {index !== 0 && (
          <Group h={100} my={10}>
            <div />
            <Divider
              color="gray"
              orientation="vertical"
              size="xl"
              variant={experience.state === "done" ? "solid" : "dashed"}
            />
            <Text>{experience?.middle}</Text>
          </Group>
        )}
        <Flex align="center" direction="row">
          <p.div
            aspectRatio="square"
            bg={experience.state === "done" ? "gray.400" : ""}
            border={experience.state === "doing" ? "4px solid" : ""}
            borderColor="gray.400"
            borderRadius={100}
            h={10}
            w="auto"
          />
          <Flex direction="column" ml={10}>
            <Text lineClamp={3} size="xl">
              {experience.name}
            </Text>
            <Text size="sm">{experience.date}</Text>
            <Text size="md">{experience.description}</Text>
          </Flex>
        </Flex>
      </p.div>
      <p.div ref={ref} bottom={-300} position="absolute" />
    </p.div>
  );
}

export default function Experiences(): ReactElement {
  $isMobile.set(useMediaQuery(`(max-width: ${em(750)})`) ?? false);
  const isMobile = $isMobile.value ?? false;
  return (
    <p.div fontFamily="sans" fontSize={30} position="relative" w="100%">
      <Center>
        <Text ff="Noto serif jp" inherit my={20}>
          Experiences
        </Text>
      </Center>
      <Center>
        <p.div h={1400} m={3} mb={20} w={isMobile ? 500 : 700}>
          {ExperiencesList.map((experience, index) => (
            <Experience
              key={experience.name}
              experience={experience}
              index={index}
            />
          ))}
        </p.div>
      </Center>
    </p.div>
  );
}
