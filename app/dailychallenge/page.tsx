"use client";

import { Box, Text, Flex, Image,  } from "@chakra-ui/react";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";

const PlayList = [
  {
    image: "/icons/Puzzle.png",
    name: "Daily Puzzle",
    path: "/puzzle",
  },
  {
    image: "/badge.svg",
    name: "Daily Reward",
    path: "/dailyreward",
  },
  {
    image: "/app.svg",
    name: "Social Tasks",
    path: "/socialtask",
  },
    {
        image: "/Roulette.svg",
        name: "Resource Roulette",
        path: "/roulette",
    },
    {
        image: "/puzzle.svg",
        name: "Crypto Trivia",
        path: "/trivia",
    },
];

export default function DailyChallenge() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"#06070A"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
    >
      <Flex
        width={"100%"}
        height={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={12}
        gap={10}
        pb={24}
      >
        <Text color={"#487BFF"} fontWeight={"700"} fontSize={"24px"}>
          Daily Rewards
        </Text>
        <Box
          width={"100%"}
          px={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          {PlayList.map((list, id) => {
            return (
              <Flex
                key={id}
                h={"70px"}
                bg={"#12161E"}
                borderRadius={"16px"}
                padding={"18px 16px"}
                gap={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Flex gap={4} alignItems={"center"}>
                  <Image src={list.image} w={"25px"} alt="list image" />
                  <Text fontSize={"20px"} fontWeight={500} color={"#f5f5f5"}>
                    {list.name}
                  </Text>
                </Flex>
                <Link href={list.path}>
                  <Image src="/arrow.svg" />
                </Link>
              </Flex>
            );
          })}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
