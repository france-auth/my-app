"use client";

import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";
import NavigationBar from "@/components/NavigationBar";

const data = [
  { option: "100$" },
  { option: "200$" },
  { option: "300$" },
  { option: "400$" },
  { option: "500$" },
  { option: "600$" },
  { option: "700$" },
  { option: "800$" },
];

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
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
        <Text color={"#93BAFF"} fontWeight={"700"} fontSize={"24px"}>
          Resource Roulette
        </Text>
        <Box
          bg={
            "linear-gradient(225deg, #FEDC31 16%, #FDC448 22.31%, #FC8682 35.67%, #FA2CD7 53.31%, #987CDB 70.57%, #33D0E0 87.83%)"
          }
          mt={{ base: 0, sm: 14 }}
          display={"flex"}
          flexDirection={"column"}
          p={{ base: "4px", sm: "5px" }}
          borderRadius={"50%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            bg={
              "linear-gradient(225deg, #000604 16%, #303030 44.62%, #000604 87.83%)"
            }
            p={{ base: "10px", sm: "20px" }}
            borderRadius={"50%"}
            // border={"4px solid #F8F9FD"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              textColors={["white"]}
              fontSize={32}
              backgroundColors={[
                "#FE7A18",
                "#FC9612",
                "#1A95FF",
                "#E60C6A",
                "#6010F5",
                "#00766B",
                "#9D9D9D",
                "#FE3E0E",
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
          </Box>
        </Box>
        <Button
          onClick={handleSpinClick}
          w={"342px"}
          h={"49px"}
          bg={"#4979d1"}
          boxShadow={"0px -2px 8px 0px #F8F9FD33 inset"}
          fontSize={"24px"}
          fontWeight={700}
          color={"#f5f5f5"}
          borderRadius={"20px"}
          _hover={{ bg: "#4979d1", outline: "none" }}
        >
          Spin and Win!
        </Button>

        <Flex
          alignItems={"center"}
          gap={2}
          w={"292px"}
          h={"39px"}
          mt={{ base: 1, sm: -10 }}
          justifyContent={"center"}
        >
          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />
          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />

          <Text fontWeight={500} fontSize={"12px"} color={"#999999"}>
            You get one attempt per day, make it count
          </Text>

          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />
          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />
        </Flex>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
