import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  Avatar,
  Progress,
} from "@chakra-ui/react";

import Link from "next/link";
import React from "react";
import NavigationBar from "@/components/NavigationBar";

const SmallCardArray = [
  {
    image: "/icons/game-chat.png",
    text: "Mini Games",
    timer: "00:00",
    path: "/games",
  },
];
export interface UserData {
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
}



export default function Homepage({userData}: {userData: UserData}) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"#12161E"}
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
        pt={3}
        gap={5}
      >
        <Box w={"90%"}>
          <Flex alignItems={"center"} gap={2}>
            <Avatar
              size={"sm"}
              name="Howgart Louis"
              src="https://bit.ly/prosper-baba"
            />

            <Text fontWeight={"700"} fontSize={"20px"} color={"#F5F5F5"}>
              {userData && userData.username}
            </Text>
          </Flex>
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
                  1/4
                </Text>
              </Flex>
              <Flex alignItems={"center"} bg={"green"}>
                <Progress
                  value={40}
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

        <Flex
          width={"100%"}
          flexDirection={"column"}
          pt={1}
          borderTopRadius={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          bgGradient={'conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)'
          }
        > 
          <Flex flexDirection={'column'} bgGradient={'linear-gradient(360deg, #00283A 0%, #12161E 88.17%)'} w={'100%'} borderTopRadius={'15px'} h={'80vh'} pt={{base: 2, sm: 5}} alignItems={'center'} gap={{base:3, sm:3}}>
          <Flex w={"80%"} p={"3px"} gap={"4px"} bg={'red'} borderRadius={'10px'} mx={'auto'} bgGradient={'conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)'}>
            {SmallCardArray.map((card, id) => {
              return (
                <Link href={card.path} className="w-[100%]" key={id}>
                <Flex
                  width={"100%"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  height={"100px"}
                  justifyContent={"center"}
                  p={"22px"}
                  bgColor={"#1D222E"}
                  gap={"8px"}
                  borderRadius={'10px'}
                >
                  <Image alt="card img" src={card.image} w={"32px"} />
                  <Text
                    w={""}
                    textAlign={"center"}
                    fontSize={"12px"}
                    fontWeight={500}
                    color={"white"}
                  >
                    {card.text}
                  </Text>
                  <Text
                    fontSize={"9.33px"}
                    fontWeight={"500"}
                    color={"#7585A7"}
                  >
                    {card.timer}
                  </Text>
                </Flex>
                </Link>
              );
            })}
          </Flex>

          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"266px"}
            h={"66px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text
              fontSize={"12px"}
              fontWeight={600}
              color={"#7585A7"}
              lineHeight={"14.52px"}
            >
              {" "}
              + 5 600 per hour
            </Text>
            <Flex w={"201px"} h={"36px"} gap={3} alignItems={"center"}>
              <Image alt="coin img"  src="/icons/coin.png" />
              <Text fontSize={"29.33px"} fontWeight={600} color={"#DDE2E7"}>
                44 356 782
              </Text>
            </Flex>
            <Text
              fontSize={"12px"}
              fontWeight={600}
              color={"#7585A7"}
              lineHeight={"14.52px"}
            >
              Platinium XP
            </Text>
          </Box>

          <Box
            w={"100%"}
            h={{ base: "200px",sm: "341.73px"}}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              width={"100%"}
              h={"100%"}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              // overflow={'hidden'}
              mt={{base: 2, sm: 5}}

            >
                <Image alt="floating coin img"  src="/FloatingCoins.png" position={'relative'} zIndex={1} w={{base:'60%', sm: "90%"}}/>
                <Image alt="mascot img"  src="/Mascot.png" zIndex={0} position={'absolute'} w={{base:'50%', sm: "auto"}}/>
            </Box>
          </Box>

          <Box w={'100%'} h={'35.33px'} mt={{base: 2, sm:5}} px={'10.67px'} alignItems={'center'} justifyContent={'center'} display={'flex'}>
            <Flex width={'85%'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={'13px'} fontWeight={500} color={'#DDE2E7'}>
                125,000 / 125,000
            </Text>

            <Flex p={'6.67px'} gap={2}
            width={'103.33px'} height={'35.53px'} alignItems={'center'}>
                <Image alt="white booster img"  src="/icons/whiteBooster.png"/>
                <Text fontSize={'13px'} fontWeight={500} color={'#DDE2E7'}>
                    Explore
                </Text>
            </Flex>
            </Flex>
          </Box>
          </Flex>
        </Flex>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
