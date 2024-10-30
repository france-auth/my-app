"use client";

import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";

const PlayList = [
  {
    image: "/icons/Puzzle.png",
    name: "Daily Puzzle",
    path: "/puzzle",
  },
  {
    image: "/icons/badge.png",
    name: "Daily Reward",
    path: "/dailyreward",
  },
  {
    image: "/icons/list.png",
    name: "Daily Tasks",
    path: "/dailytask",
  },
  {
    image: "/icons/app.png",
    name: "Social Tasks",
    path: "/socialtask",
  },
];

export default function DailyChallenge() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgGradient={"linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"}
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
        <Text color={"#93B9FF"} fontWeight={"700"} fontSize={"24px"}>
          Daily Challenge
        </Text>
        <Box
          width={"100%"}
          px={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"30px"}
        >
          {PlayList.map((list, id) => {
            return (
              <Flex
                key={id}
                h={"110px"}
                bg={"#1D222EB2"}
                borderRadius={"16px"}
                padding={"18px 16px"}
                borderBottom={"0.9px solid #4979D1"}
                gap={4}
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
                  <Button
                    w={"60px"}
                    h={"25px"}
                    bg={"#4979d1"}
                    color={"#fff"}
                    fontSize={"10px"}
                    fontWeight={600}
                    _hover={{ bg: "#4979d1" }}
                    borderRadius={"20px"}
                  >
                    Go
                  </Button>
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
