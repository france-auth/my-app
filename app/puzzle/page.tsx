"use client";

import {
  Box,
  Flex,
  Text,
  Icon,
  Progress,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/context/context";
import { useEffect } from "react";

const Rectangle = [
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
  },
  {
    image: "./Rectangle.png",
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

export default function Puzzle() {
  const [isSolved, setIsSolved] = useState(false); // State to track if the puzzle is solved
  const toast = useToast(); // Chakra UI toast

  const handleClaimPoints = () => {
    toast({
      title: "Points claimed!",
      description: "You have successfully claimed 10 XP.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    // Reset the puzzle state to restart the game
    setIsSolved(false);
  };
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
        gap={{ base: 5, sm: 5 }}
        pb={32}
      >
        <Box width={"100%"} px={"20px"} pb={10}>
          <Text
            color={"#93BAFF"}
            fontWeight={"700"}
            fontSize={"24px"}
            textAlign={"center"}
          >
            Daily Puzzle
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
                <Text>400,345</Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Flex width={"146px"} justifyContent={"space-between"}>
          <Box w={"36px"} h={"36px"} bg={"#d9d9d9"} borderRadius={"50%"}></Box>
          <Box w={"36px"} h={"36px"} bg={"#d9d9d9"} borderRadius={"50%"}></Box>
          <Box w={"36px"} h={"36px"} bg={"#d9d9d9"} borderRadius={"50%"}></Box>
        </Flex>

        <Box width={"90%"} h={"396px"} p={"4px 16px"}>
          <Box
            w={"100%"}
            h={"388px"}
            bgImage={"./rock.png"}
            bgPosition={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"173%"}
            mx={"auto"}
            display={"grid"}
            gap={"8px"}
            gridTemplateColumns={"repeat(3, 1fr)"}
          >
            {Rectangle.map((box, id) => {
              return (
                <Image
                  src={box.image}
                  alt="box img"
                  w={"100%"}
                  h={"123px"}
                  key={id}
                  opacity={"0.9"}
                />
              );
            })}
          </Box>
        </Box>
        <Text color={"#f5f5f5"} fontWeight={700}>
          Score/Reward
        </Text>

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
          _disabled={{ bg: "#293042" }} // Styling for the disabled state
        >
          0.00
        </Button>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
