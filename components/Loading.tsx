"use client";

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Loading() {
  const [isFirstImage, setIsFirstImage] = useState(true);

  useEffect(() => {
    // Create an interval to toggle the image every 500ms (adjust timing as needed)
    const flickerInterval = setInterval(() => {
      setIsFirstImage((prev) => !prev);
    }, 100); // Adjust the flicker interval time as desired

    // Cleanup the interval on component unmount
    return () => clearInterval(flickerInterval);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Flex
      minH={"100vh"}
      bgGradient="linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"
      minW={"100vw"}
      bgSize={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={"white"}
      direction={"column"}
      gap={10}
    >
      <Box pt={"35%"}>
        <Heading fontSize={"36px"}>SoftNote Rush</Heading>
        <Text color={"#4979D1"} textAlign={"center"} fontSize={"20px"}>
          By TECTUM
        </Text>
      </Box>

      <Box>
        <Image
          src={isFirstImage ? "/Welcome.png" : "/MASCOT HAPPY.png"}
          width={"300px"}
          alt="welcome img"
        />
      </Box>
    </Flex>
  );
}
