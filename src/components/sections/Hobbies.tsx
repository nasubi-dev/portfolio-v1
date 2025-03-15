import { type ReactElement, useState } from "react";
import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";
import {
  Text,
  Center,
  Flex,
  em,
  Group,
  ActionIcon,
  Card,
  Spoiler,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BarChart } from "@mantine/charts";
import { styled as p } from "@panda/jsx";
import boosted from "../../assets/data/boosted.json";
import { $colorScheme, $isMobile } from "../../stores/option";

type HobbyData = {
  name: string;
  icon: string;
  description: string;
};

// 仮置き
const hobbiesList: HobbyData[] = [
  {
    name: "Program",
    icon: "material-symbols:code-blocks-outline",
    description: `Webアプリケーションを作るのが好きです｡
      最近はReact + Vite + TypeScriptで開発しています｡
      このサイトもこの構成です｡`,
  },
  {
    name: "Read",
    icon: "material-symbols:book",
    description: `
    愛書は中村文則の｢遮光｣です｡"恋人だったもの"をいつも持ち歩いている虚言癖のある男の話なのですが､
    こんなあらすじだけでは伝わらない良さが詰まっているのでぜひ読んでください｡なんなら私が貸します｡`,
  },
  {
    name: "Anime",
    icon: "material-symbols:smart-display-outline",
    description: `90'sのアニメが好きです｡ARIAとか新世紀エヴァンゲリオンとかFLCLが好みド直球｡`,
  },
  {
    name: "Movie",
    icon: "material-symbols:movie",
    description: `デビッド・フィンチャー監督のFight ClubとかSevenなどのバイオレンス&サスペンスが好きです｡
    ノーラン監督のSF映画､TENETとかインターステラーもインセプションも全てが好きです｡ブレードランナーも勿論好き｡`,
  },
  {
    name: "Game",
    icon: "material-symbols:stadia-controller-sharp",
    description: `3DSを押し入れから発掘してとび森とルーンファクトリー4をやっています｡
      ノベルゲームも好きでGNOSIAもNEEDY GIRL OVERDOSEもダンガンロンパが好き｡`,
  },
  {
    name: "Moh-jong",
    icon: "fluent-emoji-high-contrast:mahjong-red-dragon",
    description: `麻雀が好きです｡雀魂ランクはもうそろそろ雀傑に上がりそうで上がらない｡
    実卓で打ってみたいけど､雀魂でしか打たないからルールを間違えそう｡`,
  },
  {
    name: "History",
    icon: "bi:sign-merge-left",
    description: `ヨーロッパ史が大好き｡
      特にウェストファリア体制～第一次世界大戦に至るまでの経緯は何度勉強してもおもしろい｡
      推し国家はロシア帝国です｡`,
  },
  {
    name: "Write",
    icon: "material-symbols:edit-document-outline",
    description: `obsidianというマークダウン記法で日記を書いています｡
    キャッチアップだけでなく､これからは外へ発信もしていきたい｡`,
  },
  {
    name: "Music",
    icon: "material-symbols:library-music-outline",
    description: `SoundCloudで音楽を聴いています｡
    House Techno Hi-Techが好きです｡
    J-popだとtele 笹川真生が好きです`,
  },
];

function Hobby({
  name,
  icon,
  description,
}: {
  name: string;
  icon: string;
  description: string;
}): ReactElement {
  $isMobile.set(useMediaQuery(`(max-width: ${em(750)})`) ?? false);
  const isMobile = $isMobile.value ?? false;
  return (
    <Card h="auto" radius="lg" shadow="xl" w={isMobile ? 370 : 400}>
      <Flex align="center" direction="column" gap={10}>
        <Flex align="center" direction="row" gap={5}>
          <Icon height={30} icon={icon} width={30} />
          <Text inherit>{name}</Text>
        </Flex>
        <p.div fontSize={16}>
          <Spoiler hideLabel="" maxHeight={200} showLabel="もっとみせる">
            <Text inherit>{description}</Text>
          </Spoiler>
        </p.div>
      </Flex>
    </Card>
  );
}

export default function Hobbies(): ReactElement {
  $isMobile.set(useMediaQuery(`(max-width: ${em(750)})`) ?? false);
  const isMobile = $isMobile.value ?? false;
  const colorScheme = useStore($colorScheme);
  const [isPercent, setIsPercent] = useState(false);

  return (
    <p.div
      fontFamily="sans"
      fontSize={30}
      pb={20}
      w="100%"
    >
      <Center>
        <Text ff="Noto serif jp" inherit my={20}>
          Hobbies
        </Text>
      </Center>
      <Center>
        <Flex align="center" direction="column" gap={20}>
          <p.div fontSize={10} position="relative">
            <BarChart
              data={boosted}
              dataKey="year_month"
              gridColor={colorScheme === "light" ? "gray.9" : "gray.3"}
              h={300}
              legendProps={{ verticalAlign: "bottom" }}
              mb={10}
              series={[
                { name: "Program", color: "red.6" },
                { name: "Read", color: "orange.6" },
                { name: "Study", color: "yellow.6" },
                { name: "Write", color: "lime.6" },
                { name: "anime", color: "cyan.6" },
                { name: "game", color: "indigo.6" },
                { name: "movie", color: "violet.6" },
              ]}
              textColor={colorScheme === "light" ? "gray.9" : "gray.3"}
              tooltipAnimationDuration={200}
              type={isPercent ? "percent" : "stacked"}
              valueFormatter={(value) => {
                const hours = Math.floor(value / 3600);
                const minutes = Math.floor((value % 3600) / 60);
                const seconds = value % 60;
                return `${hours}h ${minutes}m ${seconds}s`;
              }}
              w={isMobile ? 370 : 700}
              withLegend
            />
            <p.div position="absolute" right={0} top={-7}>
              <ActionIcon
                onClick={() => {
                  setIsPercent(!isPercent);
                }}
              >
                <Icon
                  height={24}
                  icon="mdi:swap-horizontal-circle-outline"
                  width={24}
                />
              </ActionIcon>
            </p.div>
          </p.div>
          <Group align="start" gap={40} justify="center" m={3} wrap="wrap">
            {hobbiesList.map((hobby) => (
              <Hobby key={hobby.name} {...hobby} />
            ))}
          </Group>
        </Flex>
      </Center>
    </p.div>
  );
}
