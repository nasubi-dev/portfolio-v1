import { useEffect, useState, type ReactElement } from "react";
import { useStore } from "@nanostores/react";
import { Icon } from "@iconify/react";
import {
  Text,
  Center,
  Group,
  Card,
  Flex,
  ActionIcon,
  Transition,
  Anchor,
} from "@mantine/core";
import { styled as p } from "@panda/jsx";
import { $colorScheme } from "../../stores/option";

type SkillData = {
  name: string;
  icon: string;
  description: string;
  link?: string;
};

// 仮置き
const skillList: SkillData[] = [
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    link: "https://www.typescriptlang.org",
    description: `型がないと不安｡
    サバイバルTypescriptさんいつもお世話になってます｡`,
  },
  {
    name: "Vue",
    icon: "logos:vue",
    link: "https://v3.vuejs.org",
    description:
      "Vue3のComposition API + script setupが好き｡Reactに触れてから感じるVueの良さ｡双方向バインディングのコードの書きやすさは異常｡",
  },
  {
    name: "Nuxt",
    link: "https://nuxt.com",
    icon: "vscode-icons:file-type-nuxt",
    description: "Vueの上位互換フレームワーク｡正直持て余してる｡",
  },
  {
    name: "React",
    icon: "logos:react",
    link: "https://reactjs.org",
    description:
      "大学に入ってから始めました｡趣味､個人制作､インターンなどの場面で使用しています｡",
  },
  {
    name: "Next",
    icon: "logos:nextjs-icon",
    link: "https://nextjs.org",
    description: "SSGしてみたいけど､プロジェクトスケールがデカすぎる｡",
  },
  {
    name: "C",
    icon: "logos:c",
    description: "授業でやるくらいでそこまで得意ではない｡",
  },
  {
    name: "Monaca",
    icon: "material-symbols:code-blocks-outline",
    link: "https://ja.monaca.io",
    description:
      "初めて触ったフレームワーク｡私のエンジニア人生はここから始まった｡",
  },
  {
    name: "Firebase",
    icon: "logos:firebase",
    link: "https://firebase.google.com",
    description: "NoSQLはもう使いたくないです",
  },
  {
    name: "supabase",
    icon: "logos:supabase-icon",
    link: "https://supabase.io",
    description:
      "postgreSQLが使えるのが良き｡型を自動出力してくれるのが嬉しい｡Dashboardのモダン具合がすごい｡",
  },
  {
    name: "CloudFlare",
    icon: "logos:cloudflare-icon",
    link: "https://www.cloudflare.com",
    description: `これから勉強します｡このサイトはCloudFlare Pagesでホストしています｡
    他にもObsidianのRemotely SaveでR2を使ってデバイス間同期をしてます｡
    Workersも使いたい｡
    `,
  },
  {
    name: "VSCode",
    icon: "vscode-icons:file-type-vscode",
    link: "https://code.visualstudio.com",
    description:
      "エディターはこれ一択｡拡張機能が豊富で使いやすい｡(これ以外使ったこと無いだけ)",
  },
  {
    name: "GitHub",
    icon: "mdi:github",
    link: "https://github.com",
    description: `CLIは使わない｡
      GUIで十分｡
      コミット､マージ､プルリク､スタッシュなど一通り扱える｡
      GitHub Actionsは使いたいけど使いこなせてない｡`,
  },
  {
    name: "python",
    icon: "logos:python",
    link: "https://www.python.org",
    description:
      "このサイトの下部にあるグラフを作るのに使いました｡pandasとお友達になりたい｡",
  },
  {
    name: "obsidian",
    icon: "logos:obsidian-icon",
    link: "https://obsidian.md",
    description: `markdown記法で書けるメモアプリ｡
      開発に直接活きることはなくとも､アイデアや思考をまとめるのに便利｡
      これもVScodeと同じで拡張機能が秘伝のタレの如く煮詰まりがち｡
      QoL爆上がり｡`,
  },
];

function Skill({
  skill,
  selected,
}: {
  skill: SkillData;
  selected: number;
}): ReactElement {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(false);
    setTimeout(() => {
      setOpened(true);
    }, 200);
  }, [selected]);

  return (
    <Transition
      duration={200}
      keepMounted
      mounted={opened}
      timingFunction="ease"
      transition={{
        in: { opacity: 1, transform: "translateY(0)" },
        out: { opacity: 0, transform: "translateY(20px)" },
        common: { transformOrigin: "top" },
        transitionProperty: "transform, opacity",
      }}
    >
      {(transitionStyle) => (
        <p.div fontFamily="sans" fontSize={25}>
          <Card
            key={skill.name}
            h="auto"
            mx={30}
            padding="md"
            radius="xl"
            shadow="xl"
            style={{ ...transitionStyle }}
            w="auto"
          >
            <Flex align="center" direction="row" gap="5">
              <Icon height={30} icon={skill.icon} width={30} />
              <Text inherit>{skill.name}</Text>
            </Flex>
            <Anchor
              c="dimmed"
              href={skill.link}
              mb={15}
              pl={40}
              size="xs"
              style={{ lineHeight: 1 }}
              target="_blank"
            >
              {skill.link}
            </Anchor>
            <p.div fontSize={16}>
              <Text inherit>{skill.description}</Text>
            </p.div>
          </Card>
        </p.div>
      )}
    </Transition>
  );
}

export default function Skills(): ReactElement {
  const colorScheme = useStore($colorScheme);
  const [selected, setSelected] = useState(0);

  return (
    <p.div
      bg={colorScheme === "light" ? "gray.400" : "gray.800"}
      fontFamily="sans"
      fontSize={30}
      pb={20}
      w="100%"
    >
      <Center my={20}>
        <Text ff="Noto serif jp" inherit mx={20}>
          Skills
        </Text>
      </Center>
      <Center my={20}>
        <p.div mx={10} my={5} rounded="full">
          <Card h="auto" radius="xl" shadow="xl">
            <Group align="center" gap={5} justify="center" py={10}>
              {skillList.map((skill) => (
                <p.div key={skill.name}>
                  <ActionIcon
                    onClick={() => {
                      setSelected(skillList.indexOf(skill));
                    }}
                    size="xl"
                    variant="transparent"
                  >
                    <Icon
                      key={skill.name}
                      height={40}
                      icon={skill.icon}
                      width={40}
                    />
                  </ActionIcon>
                </p.div>
              ))}
            </Group>
          </Card>
        </p.div>
      </Center>
      <Center>
        <p.div maxW="600">
          <Skill selected={selected} skill={skillList[selected]} />
        </p.div>
      </Center>
    </p.div>
  );
}
