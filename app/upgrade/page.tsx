"use client"

import { Box, Text, Flex, Image, Icon, Progress, Spinner } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";
import { useState, useEffect } from "react";
import { useUser } from "@/context/context";

const Upgrade = [
  {
    image: "/upgrade.png",
  },
  {
    image: "/upgrade.png",
  },
  {
    image: "/upgrade.png",
  },
];

interface Card {
  id: string;
  name: string;
  category: "SKILL" | "BUSINESS" | "SPECIAL";
  baseProfit: number;
  profitIncrease: number;
  maxLevel: number;
  baseCost: number;
  costIncrease: number;
  requires?: string;
  imagePath: string;
  coinIcon: string;
}
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


export default function Upgrades() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
      const { user } = useUser();
      // const toast = useToast();

      const [levelIndex, setLevelIndex] = useState(0);
      const [points, setPoints] = useState(0);
      

      useEffect(() => {
        if (user) {
          setPoints(user.coins);
          setLevelIndex(user.level);
        }
      }, [user]);

       useEffect(() => {
         const currentLevelMin = levelMinPoints[levelIndex];
         const nextLevelMin = levelMinPoints[levelIndex + 1];
         if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
           setLevelIndex(levelIndex + 1);
         } else if (points < currentLevelMin && levelIndex > 0) {
           setLevelIndex(levelIndex - 1);
         }
       }, [points, levelIndex, levelMinPoints, levelNames.length]);

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
  

  // Fetch cards from the backend API
  const fetchCards = async () => {
    try {
      const response = await fetch("/api/getCards", { method: "GET" });

      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }

      const data: Card[] = await response.json();
      setCards(data); // Set the fetched cards in state
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Use useEffect to fetch cards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"#12161F"}
      bgImage={"./background.png"}
      bgRepeat={"no-repeat"}
      bgSize={"auto"}
      bgPos={"center"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
    >
      <Flex
        width={"100%"}
        minHeight={"100vh"}
        bg={"#12161F"}
        flexDirection={"column"}
        alignItems={"center"}
        pb={32}
        gap={5}
      >
        <Box width={"100%"} p={"20px"} pt={"30px"}>
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
        <Box
          width={"100%"}
          px={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          justifyContent={"space-between"}
        >
          <Flex
            width={"100%"}
            height={"105px"}
            py={"8px"}
            gap={"19px"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            {Upgrade.map((upgrade, id) => {
              return (
                <Box
                  key={id}
                  width={"94px"}
                  height={"89px"}
                  borderRadius={"16px"}
                  border={"1px solid #4979D133"}
                  p={"20px 30px"}
                  gap={"10px"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Image
                    src={upgrade.image}
                    w={"44px"}
                    h={"59px"}
                    alt="upgrade img"
                  />
                </Box>
              );
            })}
          </Flex>
          <Box
            w={"100%"}
            display={"grid"}
            gridTemplateColumns={"repeat(2, 1fr)"}
            gap={"16px"}
            mt={5}
          >
            {cards && cards.map((card, index) => {
              return (
                <Box
                  key={index}
                  w={"100%"}
                  borderRadius={"16px"}
                  border={"0.67px solid #99999933"}
                  bg={"#1f2024"}
                  p={"16px 6px"}
                >
                  <Flex alignItems={"center"} gap={"10px"}>
                    <Image src={"/upgrade.png"} w={"48px"} alt="detail img" />
                    <Flex flexDirection={"column"} w={"99px"}>
                      <Text
                        fontSize={"14px"}
                        fontWeight={600}
                        lineHeight={"19.36px"}
                      >
                        {card.name}
                      </Text>
                      <Text
                        fontSize={"11px"}
                        fontWeight={500}
                        lineHeight={"14.52px"}
                      >
                        Profit per Hour
                      </Text>
                      <Flex alignItems={"center"}>
                        <Image
                          src="/icons/coin.png"
                          w={"16px"}
                          alt="coin img"
                        />
                        <Text fontSize={"14px"} fontWeight={500}>
                          {card.baseProfit}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex
                    justifyContent={"space-between"}
                    w={"147px"}
                    mt={3}
                    lineHeight={"10px"}
                  >
                    <Text fontSize={"12px"} fontWeight={500}>
                      Level 0
                    </Text>
                    <Flex alignItems={"center"}>
                      <Image src="/icons/coin.png" w={"16px"} alt="coin img" />
                      <Text fontSize={"14px"} fontWeight={500}>
                        {card.baseCost}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
