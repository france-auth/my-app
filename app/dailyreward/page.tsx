
import { Flex, Box, Text, HStack, Progress, Heading, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";

type Props = Record<string, never>;
const cards = [
  { day: 1, reward: 100 },
  { day: 2, reward: 120 },
  { day: 3, reward: 150 },
  { day: 4, reward: 180 },
  { day: 5, reward: 200 },
  { day: 6, reward: 220 },
  { day: 7, reward: 250 },
  { day: 8, reward: 280 },
  { day: 9, reward: 300 },
  { day: 10, reward: 350 },
  { day: 11, reward: 380 },
  { day: 12, reward: 520 },
  { day: 13, reward: 550 },
  { day: 14, reward: 1000 },
  { day: 15, reward: 1100 },
  { day: 16, reward: 1500 },
  { day: 17, reward: 1800 },
  { day: 18, reward: 2500 },
  { day: 19, reward: 3000 },
  { day: 20, reward: 4000 },
];

function DailyReward({}: Props) {
  const activeDay = 1;

  return (
    <Flex

      minH={"100vh"}
      bgGradient={'linear-gradient(360deg, #00283A 0%, #12161E 88.17%)'}
      minW={"100vw"}
      color={"white"}
      direction={"column"}
      gap={6}
    >
      <Flex direction={"column"} gap={2} p={5}>
        <Flex gap={1} justifyContent={"center"}>
          <Heading fontSize={"24px"} color={'#93BAFF'}>Daily Reward</Heading>
        </Flex>

        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex direction={"column"}>
            <HStack spacing={10}>
              <Text fontSize={"small"}>
                Ambassador
                <ChevronRightIcon />
              </Text>
              <Text fontSize={"small"}>1/4</Text>
            </HStack>

            <Flex alignItems={"center"} borderRadius={"20px"} mt={2}>
              <Progress
                value={20}
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
          </Flex>

          <Flex direction={"column"}>
            <Text fontSize={"xs"} textAlign={"center"}>
              XP Reward
            </Text>
            <Box
              border={"1px solid white"}
              p={1}
              borderRadius={"20px"}
              w={"27vw"}
              h={"4vh"}
            >
              <Text textAlign={"center"} fontSize={"xs"}>
                400,035
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      {/* Cards displayed in a grid layout */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)" // Ensures 5 cards per row
        gap={2} // Space between the cards
        p={5}
        alignSelf={"center"}
        justifyContent={"center"}
        w="90%"
      >
        {cards.map((card) => (
          <Box
            key={card.day}
            mt={3}
            position="relative"
            border={
              activeDay === card.day ? "1px solid #00FF29" : "1px solid #4979D1"
            }
            p={2}
            borderRadius={"8px"}
            textAlign="center"
          >
            {/* Green dot for active day */}
            {activeDay === card.day && (
              <Box
                position="absolute"
                top="-5px"
                right="-5px"
                width="10px"
                height="10px"
                bg="#00FF29"
                borderRadius="full"
                boxShadow="0 0 8px rgba(0, 255, 41, 0.8)"
              />
            )}

            <Text fontSize={"xs"}>Day {card.day}</Text>
            <Text fontWeight={"900"} fontSize={"18px"} color={"#4979D1"}>
              {card.reward}
            </Text>
          </Box>
        ))}
      </Box>

      <Button alignSelf={"center"} bgColor={"#4979D1"} color={"#fff"} w={"85vw"}
      borderRadius={"20px"} fontWeight={"500"} fontSize={"20px"}>Claim Bonus</Button>

      <NavigationBar />
    </Flex>
  );
}

export default DailyReward;
