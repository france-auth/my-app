"use client";

import {
  Box,
  Button,
  Flex,
  Text,
  useToast,
  Icon,
  Progress,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/context/context";

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

type UserData = {
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
  lastTriviaAttempt?: Date;
  lastJigsawAttempt? : Date;
  checkInStreak: number;
  createdAt: Date;
  updatedAt: Date;
};

type UpdateData = Partial<UserData>;

export default function Jigsaw() {
  const [isSolved, setIsSolved] = useState(false); // State to track if the puzzle is solved
  const toast = useToast(); // Chakra UI toast
  const { user, setUser } = useUser();

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

  const updateUserProfile = async (updatedFields: UpdateData) => {
    if (!user || !user.telegramId) {
      console.error("User data or telegramId is missing.");
      return;
    }

    try {
      const response = await fetch(
        `/api/updateprofile?userId=${user.telegramId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Read raw text to handle empty responses
        console.error(
          "Failed to update profile:",
          errorText || "Unknown error"
        );
        return null;
      }

      const updatedUser = await response.json();
      console.log("Profile updated successfully:", updatedUser);
      return updatedUser; // Return the updated user if needed
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSolved = async () => {
    setIsSolved(true); // Set the puzzle as solved
    toast({
      title: "You completed the jigsaw!",
      description: "Claim your reward.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handleClaimPoints = async () => {
    if(!user) return;
    const now = new Date()
    const newCoin = user.coins + 100
    try {
       const updatedUser = await updateUserProfile({
         coins: newCoin,
         lastJigsawAttempt: now,
       });
       setUser(updatedUser);
      toast({
        title: "Points claimed!",
        description: "You have successfully claimed 100 XP.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // Reset the puzzle state to restart the game
      setIsSolved(false);
    } catch (error) {
      console.log(error)
    }
  };

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
        gap={{ base: 5, sm: 14 }}
        pb={32}
      >
        <Box width={"100%"} px={"20px"}>
          <Text
            color={"#93BAFF"}
            fontWeight={"700"}
            fontSize={"24px"}
            textAlign={"center"}
          >
            SoftNote Bill Jigsaw
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

        {/* Puzzle Container */}
        <Box
          bgImage={"./jigsawImage.png"}
          bgPosition={"center"}
          bgRepeat={"no-repeat"}
          bgSize={"contain"}
          w={"100%"}
          p={4}
          maxW="600px"
          mx="auto"
        >
          {/* Jigsaw Puzzle Component */}
          <JigsawPuzzle
            imageSrc="./jigsawImage.png" // Image for the puzzle
            rows={4} // Set rows for the puzzle
            columns={6} // Set columns for the puzzle
            onSolved={handleSolved} // Trigger toast and enable button when solved
          />
        </Box>

        {/* Spin and Win Button */}
        <Button
          w={"342px"}
          h={"49px"}
          bg={"#4979d1"}
          boxShadow={"0px -2px 8px 0px #F8F9FD33 inset"}
          fontSize={"24px"}
          fontWeight={700}
          color={"#f5f5f5"}
          borderRadius={"20px"}
          onClick={handleClaimPoints}
          disabled={!isSolved} // Disable button until the puzzle is solved
          _disabled={{ bg: "gray.500" }} // Styling for the disabled state
        >
          Claim 100XP
        </Button>
      </Flex>

      <NavigationBar />
    </Box>
  );
}
