"use client";

import { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import NavigationBar from "@/components/NavigationBar";

export default function Trivia() {
  const Option = [
    {
      name: "Ethereum",
      value: "1",
    },
    {
      name: "Energy",
      value: "2",
    },
    {
      name: "Ethernet",
      value: "3",
    },
    {
      name: "Envelope",
      value: "4",
    },
  ];

  const [selectedValue, setSelectedValue] = useState(""); // For tracking the selected button

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
        gap={5}
        pb={32}
      >
        <Text color={"#93BAFF"} fontWeight={"700"} fontSize={"24px"}>
          Crypto Trivia
        </Text>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          mt={10}
        >
          <Text
            width={"100%"}
            px={10}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={"35px"}
            lineHeight={"42.36px"}
            fontWeight={700}
          >
            What does ETH stand for?
          </Text>

          <Box py={"15px"} mt={5} w={"90%"} mx={"auto"}>
            {Option.map((option, id) => (
              <Box
                key={id}
                p={"2px"}
                bgGradient={
                  "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
                }
                borderRadius={"10px"}
                mb={3}
              >
                <Button
                  key={option.value}
                  onClick={() => setSelectedValue(option.value)}
                  bg={
                    selectedValue === option.value
                      ? "linear-gradient(90deg, #4979D1 0%, #4979D1 52.17%, #ADC9FE 100%)"
                      : "#293042"
                  }
                  color="white"
                  _hover={{
                    bg: "linear-gradient(90deg, #4979D1 0%, #4979D1 52.17%, #ADC9FE 100%)",
                  }}
                  _focus={{
                    bg: "linear-gradient(90deg, #4979D1 0%, #4979D1 52.17%, #ADC9FE 100%)",
                  }}
                  w={"100%"}
                  h={"69px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  px={4}
                  borderRadius={"10px"}
                  fontSize={"25px"}
                  fontWeight={600}
                >
                  {option.name}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Submit button */}
          <Box
            p={"2px"}
            bgGradient={
              "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
            }
            borderRadius={"20px"}
            mx={"auto"}
            w={"80%"}
          >
            <Button
              w={"100%"}
              h={"49px"}
              mx={"auto"}
              fontSize={"24px"}
              color={"#f5f5f5"}
              fontWeight={700}
              borderRadius={"20px"}
              boxShadow={"0px -2px 8px 0px #F8F9FD33 inset"}
              bg={"#4979D1"}
              isDisabled={!selectedValue}
              _disabled={{ bg: "#293042" }} // Disabled until an option is selected
            >
              Let&apos;s Go
            </Button>
          </Box>
        </Box>
      </Flex>

      <NavigationBar />
    </Box>
  );
}
