import { type ReactElement } from "react";
import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";
import {
  Text,
  Center,
  Group,
  Flex,
  em,
  Card,
  Spoiler,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { styled as p } from "@panda/jsx";
import { $colorScheme, $isMobile } from "../../stores/option";

import fookeys from "@/assets/fookeys.mp4";
import m3 from "@/assets/my-monthly-mix.mp4";
import wakaba from "@/assets/wakaba.mp4";
import fookeysMini from "@/assets/fookeys-mini.mp4";

type ProductsData = {
  name: string;
  image: string;
  url?: string;
  github?: string;
  youtube?: string;
  description: string;
};

const products: ProductsData[] = [
  {
    name: "fookeys-mini",
    image: "",
    url: "https://fookeys-mini.vercel.app/",
    github: "https://github.com/nasubi916/fookeys-mini",
    youtube: "https://youtube.com/shorts/KTu7BrZidKM",
    description: `スマホに対応したfookeysです｡
    ただスマホに対応しただけではなく､いただいたフィードバックを参考にルールを簡易版として改良しました｡
    私はイラスト､音楽以外の実装を担当しました｡
    `,
  },
  {
    name: "wakaba",
    image: "",
    github: "https://github.com/wappon28dev/wakaba",
    description: `高校の友人たちと参加しました｡
    株式会社KDDIアジャイル開発センター様のお題｢住みやすいスマートシティと従業員の働き方｣の解決方法として制作しました｡
    Hack Aichi 2024 にて最優秀賞(愛知県知事賞)を頂きました｡また技育展2025 に決勝進出しました｡
    私はフロントエンドの半分を担当しました｡`,
  },
  {
    name: "fookeys",
    image: "https://fookeys.com/images/logo.png",
    url: "https://fookeys.vercel.app/",
    youtube: "https://youtu.be/-RsJv_yJDFc",
    github: "https://github.com/nasubi916/fookeys",
    description: `fookeysはブラウザで動作する1対1の対戦型カードゲームです｡
      Vue + firebaseで作成しました｡
      技育博 2024 vol.4 にてCARTA,DeNA,YUMEMI賞を頂きました｡
      私はイラスト､音楽以外の実装を担当しました｡`,
  },
  {
    name: "my-monthly-mix",
    image: "https://my-monthly-mix.vercel.app/logo.png",
    github: "https://github.com/wappon28dev/my-monthly-mix",
    description: `my-monthly-mixは｡はサークル内ハッカソンにて友人と二人で､約2週間の短期開発を行いました｡
      私はフロントエンドを担当し､vite + Reactで制作しました｡
      my-monthly-mixは今月聴いた曲で共有したい3曲を選び､投稿するサービスです｡
      YouTubeとSpotifyに対応しています｡
      私はフロントエンドの実装をすべて担当しました｡`,
  },
];

function Product({
  name,
  icon,
  description,
  youtube,
  url,
  github,
}: {
  name: string;
  icon: string;
  description: string;
  url: string;
  youtube?: string;
  github?: string;
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
        <video
          controls
          src={(function getVideoSrc() {
            if (name === "fookeys") return fookeys;
            if (name === "my-monthly-mix") return m3;
            if (name === "wakaba") return wakaba;
            if (name === "fookeys-mini") return fookeysMini;
            return wakaba;
          })()}
        >
          <track kind="captions" />
        </video>

        <p.div fontSize={16}>
          <Spoiler hideLabel="" maxHeight={200} showLabel="もっとみせる">
            <Text inherit>{description}</Text>
          </Spoiler>
        </p.div>
        <p.div w={isMobile ? 300 : 350}>
          {url !== "" && (
            <Button
              component="a"
              href={url}
              size="xs"
              target="_blank"
              variant="outline"
            >
              demo : {url}
            </Button>
          )}
          {youtube !== "" && (
            <div>
              <Button
                component="a"
                href={youtube}
                size="xs"
                target="_blank"
                variant="outline"
              >
                YouTube : {youtube}
              </Button>
            </div>
          )}
          {github !== "" && (
            <div>
              <Button
                component="a"
                href={github}
                size="xs"
                target="_blank"
                variant="outline"
              >
                GitHub : {github}
              </Button>
            </div>
          )}
        </p.div>
      </Flex>
    </Card>
  );
}

export default function Products(): ReactElement {
  $isMobile.set(useMediaQuery(`(max-width: ${em(750)})`) ?? false);
  const colorScheme = useStore($colorScheme);

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
          Products
        </Text>
      </Center>
      <Center>
        <Group align="start" gap={40} justify="center" m={3} wrap="wrap">
          {products.map((product) => (
            <Product
              key={product.name}
              description={product.description}
              github={product.github ?? ""}
              icon={product.image}
              name={product.name}
              url={product.url ?? ""}
              youtube={product.youtube ?? ""}
            />
          ))}
        </Group>
      </Center>
    </p.div>
  );
}
