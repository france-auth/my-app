"use client"
import {
  Flex,
  Text,
  Heading,
  Card,
  CardBody,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import NavigationBar from "@/components/NavigationBar";
import { useEffect, useState } from "react";
import { useUser } from "@/context/context";

type Props = Record<string, never>;


type User = {
  id: string;
  telegramId: string;
  username: string;
  photoUrl?: string; // Optional field
  level: number;
  coins: number;
  taps: number;
  maxTaps: number;
  refillRate: number;
  lastRefillTime: Date;
  slots: number;
  referralCount: number;
  referredBy?: string; // Optional field
  freeSpins: number;
  multitap: number;
  tapLimitBoost: number;
  tappingGuruUses: number;
  profitPerHour: number;
  lastEarningsUpdate: Date;
  lastCheckIn?: Date; // Optional field
  checkInStreak: number;
  createdAt: Date;
  updatedAt: Date;
};

function Achievements({}: Props) {
  const [topThreeUsers, setTopThreeUsers] = useState<User[]>([]);
  const [remainingUsers, setRemainingUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>()
  const [currentUserIndex, setCurrentUserindex] = useState<number>()
  const {user} = useUser()

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/getUsers");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users: User[] = await response.json();

      // Sort all users by coins in descending order
      const sortedUsers = users.sort((a, b) => b.coins - a.coins);
       const currentUserIndex = sortedUsers.findIndex((u) => u.id === user?.id);
       const currentUser =currentUserIndex !== -1 ? sortedUsers[currentUserIndex] : null;

      // Split top 3 users and remaining users
      const topThree = sortedUsers.slice(0, 3);
      const remaining = sortedUsers.slice(3);

      setTopThreeUsers(topThree);
      setRemainingUsers(remaining);
      setCurrentUser(currentUser)
      setCurrentUserindex(currentUserIndex)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      bgGradient={"linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"}
      width={"100vw"}
      minHeight={"100vh"}
      // alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
    >
      <Flex direction={"column"} gap={2} p={5} bg={"#12161e"}>
        <Flex gap={1} justifyContent={"center"}>
          <Heading fontSize={"25px"} color={"#93baff"} mt={2}>
            {" "}
            Leaderboard
          </Heading>
        </Flex>
        <Flex direction={"column"}>
          <Text color={"#C4C4C4"} fontSize={"xs"}>
            Click Picture to see Badges
          </Text>
          <Card bg={"#12161E"} boxShadow={"0px 2px 2px 2px #19388A99"} mt={1}>
            <CardBody>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"50%"}>
                    <WrapItem>
                      
                        <Avatar
                          size="sm"
                          name={currentUser?.username}
                          src={currentUser?.photoUrl}
                        />
                     
                    </WrapItem>
                  </Wrap>
                  <Flex direction={"column"} lineHeight={"14px"}>
                    <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                      {currentUser?.username}
                    </Text>
                    <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                      {currentUser?.coins} XP
                    </Text>
                  </Flex>
                </Flex>

                <Text color={"white"}>#{currentUserIndex && currentUserIndex + 1}</Text>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
        <Heading
          color={"white"}
          fontSize={"16px"}
          fontWeight={700}
          mt={5}
          mb={-2}
        >
          TOP 22
        </Heading>
      </Flex>

      <Flex direction={"column"} p={5} gap={4} pb={32}>
        <Flex minH={"60vh"} direction={"column"} align={"center"} w={"100%"}>
          {topThreeUsers.length > 0 && (
            <Flex
              justifyContent={"space-around"}
              p={5}
              w={"100%"}
              alignItems={"center"}
              textAlign={"center"}
              borderWidth={"1px"}
              sx={{
                borderImageSource:
                  "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)",
                borderImageSlice: 1,
              }}
            >
              <Flex>
                <Flex direction={"column"} alignItems={"center"} p={2} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"50%"}>
                    <WrapItem>
                      <Avatar
                        w={"71px"}
                        h={"71px"}
                        name={topThreeUsers[1]?.username}
                        src={topThreeUsers[1]?.photoUrl}
                      />
                    </WrapItem>
                  </Wrap>
                  <Flex direction={"column"} lineHeight={"14px"}>
                    <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                      {topThreeUsers[1]?.username}
                    </Text>
                    <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                      {topThreeUsers[1]?.coins} XP
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex direction={"column"} alignItems={"center"} p={2} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"50%"}>
                    <WrapItem>
                      <Avatar
                        w={"79px"}
                        h={"79px"}
                        name={topThreeUsers[0]?.username}
                        src={ topThreeUsers[0]?.photoUrl}
                      />
                    </WrapItem>
                  </Wrap>
                  <Flex direction={"column"} lineHeight={"14px"}>
                    <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                      {topThreeUsers[0].username}
                    </Text>
                    <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                      {topThreeUsers[0].coins} XP
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex direction={"column"} alignItems={"center"} p={2} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"50%"}>
                    <WrapItem>
                      <Avatar
                        w={"55.25px"}
                        h={"55.25px"}
                        name={topThreeUsers[2]?.username}
                        src={topThreeUsers[2]?.photoUrl}
                      />
                    </WrapItem>
                  </Wrap>
                  <Flex direction={"column"} lineHeight={"14px"}>
                    <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                      {topThreeUsers[2]?.username}
                    </Text>
                    <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                      {topThreeUsers[2]?.coins} XP
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}

          {remainingUsers.map((user: User, index: number) => {
            return (
              <Flex
              key={index}
                mt={4}
                h={"10vh"}
                w={"95%"}
                borderWidth={"1px"}
                sx={{
                  borderImageSource:
                    "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)",
                  borderImageSlice: 1,
                }}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Flex alignItems={"center"} p={2} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"50%"}>
                    <WrapItem>
                      <Avatar
                        size="sm"
                        name={user.username}
                        src={user.photoUrl}
                      />
                    </WrapItem>
                  </Wrap>
                  <Flex direction={"column"} lineHeight={"14px"}>
                    <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                      {user.username}
                    </Text>
                    <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                      {user.coins} XP
                    </Text>
                  </Flex>
                </Flex>
                <Text p={2}>#{topThreeUsers.length + index + 1}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <NavigationBar />
    </Flex>
  );
}

export default Achievements;
