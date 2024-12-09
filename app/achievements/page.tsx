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

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

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
      bgColor={"#06070A"}
      width={"100vw"}
      minHeight={"100vh"}
      // alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
    >
      <Flex direction={"column"} gap={2} p={5} bg={"#12161e"}>
        <Flex gap={1} justifyContent={"center"}>
          <Heading fontSize={"25px"} color={"#487BFF"} mt={2}>
            {" "}
            Leaderboard
          </Heading>
        </Flex>
        <Flex direction={"column"}>
          <Text color={"#C4C4C4"} fontSize={"xs"} mt={2}>
            Click Picture to see Badges
          </Text>
          <Card
            mt={1}
            sx={{
              position: "relative",
              borderRadius: "15px", // Ensures the card itself is curved
              background: "#12161E", // Background for the main card
              boxShadow: "0px 4px 40px 0px #1656FF80", // Outer shadow
              overflow: "hidden", // Clips pseudo-element content to fit border-radius
              zIndex: 1, // Ensure the card content is above the pseudo-element
              "::before": {
                content: '""', // Required for pseudo-elements
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit", // Matches the card's border radius
                padding: "1px", // Creates space for the gradient border
                background:
                  "linear-gradient(86.78deg, #477BFF 5.33%, #1A59FF 94.67%)", // Border gradient
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", // Masks the inside
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude", // Ensures only the border is visible
                zIndex: -1, // Places it behind the card content
              },
            }}
          >
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

                <Text color={"white"}>
                  #
                  {currentUserIndex &&
                    new Intl.NumberFormat().format(currentUserIndex! + 1)}
                </Text>
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

      <Flex direction={"column"} p={5} gap={2} pb={32}>
        <Flex minH={"60vh"} direction={"column"} align={"center"} w={"100%"}>
          {topThreeUsers.length > 0 && (
            <Flex
              justifyContent="space-around"
              alignItems="center"
              p={4}
              w="100%"
              textAlign="center"
              bg="#12161E"
              borderRadius="15px"
              gap={2}
              position="relative"
            >
              {/* Second place */}
              <Flex direction="column" alignItems="center" position="relative">
                <Wrap
                  borderRadius="50%"
                  p={0.5} // Reduced padding for a thinner border
                  bg="linear-gradient(86.78deg, #D4D4D4 5.33%, #748398 94.67%)"
                >
                  <WrapItem>
                    <Avatar
                      w="65px"
                      h="65px"
                      name={topThreeUsers[1]?.username}
                      src={topThreeUsers[1]?.photoUrl}
                    />
                  </WrapItem>
                </Wrap>
                <Text
                  color="white"
                  fontSize="xs"
                  fontWeight="700"
                  position="absolute"
                  top="40%" // Fixed position above the avatar
                  left="50%"
                  transform="translateX(-50%)" // Centers the rank text
                  bg="linear-gradient(86.78deg, #D4D4D4 5.33%, #748398 94.67%)"
                  borderRadius="full"
                  px={2}
                  py={1}
                  w="30px"
                  h="30px"
                  lineHeight="30px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={1} // Ensure it's above other content
                >
                  2
                </Text>
                <Text color="white" fontSize="sm" fontWeight="600" mt={"10px"}>
                  {topThreeUsers[1]?.username}
                </Text>
                <Text color="white" fontSize="sm" fontWeight="600">
                  {formatNumber(topThreeUsers[1]?.coins)}
                </Text>
              </Flex>

              {/* First place */}
              <Flex direction="column" alignItems="center" position="relative">
                <Wrap
                  borderRadius="50%"
                  p={0.5} // Reduced padding for a thinner border
                  bg="linear-gradient(86.78deg, #FDE26C 5.33%, #C88800 94.67%)"
                >
                  <WrapItem>
                    <Avatar
                      w="84px"
                      h="84px"
                      name={topThreeUsers[0]?.username}
                      src={topThreeUsers[0]?.photoUrl}
                    />
                  </WrapItem>
                </Wrap>
                <Text
                  color="white"
                  fontSize="xs"
                  fontWeight="700"
                  position="absolute"
                  top="50%" // Fixed position above the avatar
                  left="50%"
                  transform="translateX(-50%)" // Centers the rank text
                  bg="linear-gradient(86.78deg, #FDE26C 5.33%, #C88800 94.67%)"
                  borderRadius="full"
                  px={2}
                  py={1}
                  w="30px"
                  h="30px"
                  lineHeight="30px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={1} // Ensure it's above other content
                >
                  1
                </Text>
                <Text color="white" fontSize="sm" fontWeight="600" mt="10px">
                  {topThreeUsers[0]?.username}
                </Text>
                <Text color="white" fontSize="sm" fontWeight="600">
                  {formatNumber(topThreeUsers[0]?.coins)}
                </Text>
              </Flex>

              {/* Third place */}
              <Flex direction="column" alignItems="center" position="relative">
                <Wrap
                  borderRadius="50%"
                  p={0.5} // Reduced padding for a thinner border
                  bg="linear-gradient(86.78deg, #FA9339 5.33%, #C86400 94.67%)"
                >
                  <WrapItem>
                    <Avatar
                      w="65px"
                      h="65px"
                      name={topThreeUsers[2]?.username}
                      src={topThreeUsers[2]?.photoUrl}
                    />
                  </WrapItem>
                </Wrap>
                <Text
                  color="white"
                  fontSize="xs"
                  fontWeight="700"
                  position="absolute"
                  top="40%" // Fixed position above the avatar
                  left="50%"
                  transform="translateX(-50%)" // Centers the rank text
                  bg="linear-gradient(86.78deg, #FA9339 5.33%, #C86400 94.67%)"
                  borderRadius="full"
                  px={2}
                  py={1}
                  w="30px"
                  h="30px"
                  lineHeight="30px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={1} // Ensure it's above other content
                >
                  3
                </Text>
                <Text color="white" fontSize="sm" fontWeight="600" mt="10px">
                  {topThreeUsers[2]?.username}
                </Text>
                <Text color="white" fontSize="sm" fontWeight="600">
                  {formatNumber(topThreeUsers[2]?.coins)}
                </Text>
              </Flex>
            </Flex>
          )}

          {remainingUsers.map((user: User, index: number) => {
            return (
              <Flex
                key={index}
                mt={4}
                h={"8vh"}
                w={"100%"}
                px={2}
                borderRadius={"15px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"#12161E"}
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
                    <Text color={"#487BFF"} fontSize={"2xs"} fontWeight={"700"}>
                      {user.coins} XP
                    </Text>
                  </Flex>
                </Flex>
                <Text p={2} color={"#487BFF"}>
                  {topThreeUsers.length + index + 1}
                </Text>
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
