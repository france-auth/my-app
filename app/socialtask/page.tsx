"use client";

import { Box, Text, Flex, Image, Icon, Progress} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/context/context";
import { useState, useEffect } from "react";


const socialTask = [
  {
    image: "/invite.svg",
    name: "Invite & Earn",
    reward: "100,000",
    path: "/",
  },
  {
    image: "/telegram.svg",
    name: "Invite via Telegram Premium",
    reward: "100,000",
    path: "/",
  },
  {
    image: "/people-add.svg",
    name: "Join Softnote Channel",
    reward: "100,000",
    path: "/",
  },
  {
    image: "/group.svg",
    name: "Join Softnote Community",
    reward: "100,000",
    path: "/",
  },
];
const levelNames = [
  "Bronze", // From 0 to 4999 coins
  "Silver", // From 5000 coins to 24,999 coins
  "Gold", // From 25,000 coins to 99,999 coins
  "Platinum", // From 100,000 coins to 999,999 coins
  "Diamond", // From 1,000,000 coins to 2,000,000 coins
  "Epic", // From 2,000,000 coins to 10,000,000 coins
  "Legendary", // From 10,000,000 coins to 50,000,000 coins
  "Master", // From 50,000,000 coins to 100,000,000 coins
  "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
  "Lord", // From 1,000,000,000 coins to ∞
];

const levelMinPoints = [
  0, // Bronze
  5000, // Silver
  25000, // Gold
  100000, // Platinum
  1000000, // Diamond
  2000000, // Epic
  10000000, // Legendary
  50000000, // Master
  100000000, // GrandMaster
  1000000000, // Lord
];

export default function SocialTask() {
    const { user } = useUser();

    const [levelIndex, setLevelIndex] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
      if (user) {
        setPoints(user.coins);
        setLevelIndex(user.level);
      }
    }, [user]);

    const calculateProgress = () => {
      if (levelIndex >= levelNames.length - 1) {
        return 100;
      }
      const currentLevelMin = levelMinPoints[levelIndex];
      const nextLevelMin = levelMinPoints[levelIndex + 1];
      const progress =
        ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
      return Math.min(progress, 100);
    };

    useEffect(() => {
      const currentLevelMin = levelMinPoints[levelIndex];
      const nextLevelMin = levelMinPoints[levelIndex + 1];
      if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
        setLevelIndex(levelIndex + 1);
      } else if (points < currentLevelMin && levelIndex > 0) {
        setLevelIndex(levelIndex - 1);
      }
    }, [points, levelIndex, levelMinPoints, levelNames.length]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"#06070A"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      color={"white"}
      overflow={"hidden"}
    >
      <Flex
        width={"100%"}
        minHeight={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        pb={32}
        gap={5}
      >
        <Box width={"100%"} p={"20px"} pt={"30px"}>
          <Text
            color={"#487BFF"}
            fontWeight={"700"}
            fontSize={"24px"}
            textAlign={"center"}
          >
            Social Tasks
          </Text>
          <Flex
            w={"100%"}
            alignItems={"center"}
            mt={4}
            justifyContent={"space-between"}
          >
            <Box
              width={"40%"}
              display={"flex"}
              flexDirection={"column"}
              gap={1}
            >
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"12px"} color={"#F5F5F5"}>
                  {levelNames[levelIndex]}
                  <Icon as={ChevronRightIcon} />
                </Text>
                <Text fontSize={"12px"} color={"#F5F5F5"}>
                  {levelIndex + 1} / {levelNames.length}
                </Text>
              </Flex>
              <Flex alignItems={"center"} bg={"green"}>
                <Progress
                  value={calculateProgress()}
                  size="sm"
                  borderRadius={"full"}
                  bg={"#1D222E"}
                  border={"1px solid #7585A7"}
                  w={"full"}
                  sx={{
                    "& > div": {
                      background:
                        "linear-gradient(90deg, #4979D1 0%, #4979D1 48.17%, #B5CFFE 100%)",
                    },
                  }}
                />
              </Flex>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text fontWeight={500} fontSize={"12px"} color={"#f5f5f5"}>
                XP Reward
              </Text>
              <Box
                width={"80px"}
                height={"21px"}
                padding={"2px 12px"}
                fontWeight={"600"}
                fontSize={"14px"}
                color={"#f5f5f5"}
                textAlign={"center"}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
                gap={1}
              >
                <Image src="/Vector.svg" />
                <Text>
                  {new Intl.NumberFormat().format(parseInt(points.toFixed(0)))}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box
          width={"100%"}
          px={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          justifyContent={"space-between"}
        >
          <Text fontSize={"16px"} fontWeight={500} color={"#fff"}>
            Task List
          </Text>
          {socialTask.map((task, id) => {
            return (
              <Link href={""} key={id}>
                <Flex
                  h={"70px"}
                  bg={"#12161E"}
                  borderRadius={"16px"}
                  padding={"18px 16px"}
                  gap={4}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Flex alignItems={"center"} gap={4}>
                    <Image
                      src={task.image}
                      w={"48px"}
                      h={"48px"}
                      alt="task img"
                    />
                    <Flex direction={"column"}>
                      <Text
                        fontSize={"16px"}
                        fontWeight={500}
                        color={"#f5f5f5"}
                      >
                        {task.name}
                      </Text>
                      <Flex alignItems={"center"}>
                        <Image
                          src="/Coin.svg"
                          w={"14px"}
                          alt="big coin"
                        />
                        <Text
                          fontSize={"12px"}
                          fontWeight={500}
                          color={"#f5f5f5"}
                        >
                          + {task.reward} XP
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Box
                    w={"12px"}
                    h={"12px"}
                    bg={"#f5f5f5"}
                    borderRadius={"50%"}
                  />
                </Flex>
              </Link>
            );
          })}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
