"use client";

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

type Props = Record<string, never>;

function Badges({}: Props) {
  return (
    <Flex
      minH={"100vh"}
      bgImage={"/bgImage.png"}
      bgColor={"#12161F"}
      minW={"100vw"}
      bgSize={"auto"}
      color={"white"}
      direction={"column"}
      bgRepeat={"no-repeat"}
      gap={1}
      pb={"20%"}
    >
      <Flex direction={"column"} gap={2} p={5}>
        <Flex gap={1} justifyContent={"center"}>
          <Heading fontSize={"xl"}>Achievements & Leaderboard</Heading>
        </Flex>
        <Flex direction={"column"}>
          <Text color={"#C4C4C4"} fontSize={"xs"}>
            Click Picture to see Badges
          </Text>
          <Card bg={"#12161E"} boxShadow={"0px 2px 2px 2px #19388A99"} mt={2}>
            <CardBody>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"15px"}>
                    <WrapItem>
                      <Avatar
                        size="sm"
                        name="Prosper Otemuyiwa"
                        src="https://bit.ly/prosper-baba"
                      />
                    </WrapItem>
                  </Wrap>
                  <Flex direction={"column"} lineHeight={"14px"}>
                    <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                      Emmay Weldort
                    </Text>
                    <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                      817,356,782 XP
                    </Text>
                  </Flex>
                </Flex>

                <Text color={"white"}>#2354</Text>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        p={5}
        height={"70vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          fontSize={"24px"}
          fontWeight={700}
          color={"#f5f5f5"}
          width={"228px"}
          textAlign={"center"}
        >
          ZERO ACHIEVEMENT & BADGES
        </Text>
      </Flex>

      <NavigationBar />
    </Flex>
  );
}

export default Badges;
