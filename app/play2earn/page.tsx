"use client"

import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";

const PlayList = [
    {
        image: "/icons/Puzzle.png",
        name: "SoftNote Bill Jigsaw",
        path: "/jigsaw",
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
]

export default function Play2Earn() {
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
        gap={5}
      >
        <Text color={"#487BFF"} fontWeight={"700"} fontSize={"24px"}>
          Select, Play & Earn
        </Text>
        <Box
          width={"100%"}
          px={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          {PlayList.map((list, id) => {
            return (
              <Flex
                key={id}
                h={"80px"}
                bg={"#12161E"}
                borderRadius={"16px"}
                padding={"18px 16px"}
                gap={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Flex alignItems={"center"} gap={4}>
                  <Image src={list.image} w={"32px"} alt="list img" />
                  <Text fontSize={"20px"} fontWeight={500} color={"#f5f5f5"}>
                    {list.name}
                  </Text>
                </Flex>
                <Link href={list.path}>
                  <Button
                    w={"60px"}
                    h={"25px"}
                    bg={"#487BFF"}
                    color={"#fff"}
                    fontSize={"10px"}
                    fontWeight={600}
                    _hover={{ bg: "#4979d1" }}
                    borderRadius={"20px"}
                  >
                    Play
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
