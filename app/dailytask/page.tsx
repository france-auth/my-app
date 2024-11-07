"use client";

import { Box, Text, Flex, Image, Icon, Progress, 
  // useToast
 } from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";
import { useState, useEffect } from "react";
import { useUser } from "@/context/context";



interface TaskResponse {
  id: string;
  title: string;
  imagePath?: string | null;
  rewards: number;
  taskUrl?: string | null;
  claimed: boolean;
}

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

export default function DailyTask() {
  const { user, 
    // setUser 
  } = useUser();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const [levelIndex, setLevelIndex] = useState(0);
  const [points, setPoints] = useState(0);
  // const toast = useToast()

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

  async function fetchTasks(userId: string): Promise<TaskResponse[]> {
    const response = await fetch(`/api/getTasks?userId=${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return response.json();
  }

  useEffect(() => {
    
    // Fetch tasks and handle loading states
    const loadTasks = async () => {
      if(!user) return;
      try {
      
        const tasksData = await fetchTasks(user.id);
        console.log(tasksData)
        setTasks(tasksData);
      } catch (error) {
console.log(error)
    };
  }

    loadTasks();
  }, [user]);



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
        minHeight={"100vh"}
        bg={"rgba(29, 34, 46, .7)"}
        flexDirection={"column"}
        alignItems={"center"}
        pb={32}
        gap={5}
      >
        <Box width={"100%"} bg={"#12161E"} p={"20px"} pt={"30px"}>
          <Text
            color={"#93BAFF"}
            fontWeight={"700"}
            fontSize={"24px"}
            textAlign={"center"}
          >
            Daily Tasks
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
                border={"1px solid #f5f5f5"}
                borderRadius={"10px"}
                fontWeight={"600"}
                fontSize={"14px"}
                color={"#f5f5f5"}
                textAlign={"center"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Text>{user && user.coins}</Text>
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
          {tasks && tasks.length> 0 && tasks.map((task, id) => {
            return (
              <Link href={task.taskUrl!} target="_blank" key={id}>
                <Flex
                  h={"80px"}
                  bg={"#1D222E"}
                  borderRadius={"16px"}
                  padding={"18px 16px"}
                  borderBottom={"0.9px solid #4979D1"}
                  gap={4}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Flex alignItems={"center"} gap={4}>
                    <Image
                      src={task.imagePath!}
                      w={"48px"}
                      h={"48px"}
                      alt="task image"
                    />
                    <Flex direction={"column"}>
                      <Text
                        fontSize={"16px"}
                        fontWeight={500}
                        color={"#f5f5f5"}
                      >
                        {task.title}
                      </Text>
                      <Flex alignItems={"center"}>
                        <Image
                          src="/icons/BigCoin.png"
                          w={"14px"}
                          alt="big coin"
                        />
                        <Text
                          fontSize={"12px"}
                          fontWeight={500}
                          color={"#f5f5f5"}
                        >
                          + {task.rewards} XP
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
