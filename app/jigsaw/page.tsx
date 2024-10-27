"use client"

import { Box, Button, Flex, Text, useToast, Icon, Progress } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import NavigationBar from "@/components/NavigationBar";

export default function Jigsaw() {
  const [isSolved, setIsSolved] = useState(false); // State to track if the puzzle is solved
  const toast = useToast(); // Chakra UI toast

  const handleSolved = () => {
    setIsSolved(true); // Set the puzzle as solved
    toast({
      title: "You completed the jigsaw!",
      description: "Claim your reward.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

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
                  Ambassador
                  <Icon as={ChevronRightIcon} />
                </Text>
                <Text fontSize={"12px"} color={"#F5F5F5"}>
                  2/4
                </Text>
              </Flex>
              <Flex alignItems={"center"} bg={"green"}>
                <Progress
                  value={80}
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

        {/* Puzzle Container */}
        <Box 
          bgImage={"./jigsawImage.png"} 
          bgPosition={'center'}
          bgRepeat={'no-repeat'}
          bgSize={'contain'}
          w={"100%"}
          p={4} 
          maxW="600px"
          mx="auto"
        >
          {/* Jigsaw Puzzle Component */}
          <JigsawPuzzle
            imageSrc="./jigsawImage.png" // Image for the puzzle
            rows={4}                     // Set rows for the puzzle
            columns={6}                  // Set columns for the puzzle
            onSolved={handleSolved}       // Trigger toast and enable button when solved
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
          Claim 10XP
        </Button>
      </Flex>

      <NavigationBar />
    </Box>
  );
}
