import { Box, Text, Flex, Image, Icon, Progress } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";

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

const Details = [
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "1k",
    cost: "24k",
    level: "2",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "2k",
    cost: "48k",
    level: "2",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "3k",
    cost: "64k",
    level: "3",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "4k",
    cost: "86k",
    level: "4",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "5k",
    cost: "98k",
    level: "5",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "6k",
    cost: "120k",
    level: "6",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "7k",
    cost: "148k",
    level: "7",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "8k",
    cost: "156k",
    level: "8",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "9k",
    cost: "198k",
    level: "9",
  },
  {
    name: "CEO",
    image: "/Bot.png",
    pph: "10k",
    cost: "215k",
    level: "10",
  },
];

export default function Upgrades() {
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
                  <Image src={upgrade.image} w={"44px"} h={"59px"} alt="upgrade img" />
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
            {Details.map((detail, id) => {
              return (
                <Box
                  key={id}
                  w={"100%"}
                  borderRadius={"16px"}
                  border={"0.67px solid #99999933"}
                  bg={"#1f2024"}
                  p={"16px 6px"}
                >
                  <Flex alignItems={"center"} gap={"10px"}>
                    <Image src={detail.image} w={"48px"} alt="detail img" />
                    <Flex flexDirection={"column"} w={"99px"}>
                      <Text
                        fontSize={"16px"}
                        fontWeight={600}
                        lineHeight={"19.36px"}
                      >
                        {detail.name}
                      </Text>
                      <Text
                        fontSize={"12px"}
                        fontWeight={500}
                        lineHeight={"14.52px"}
                      >
                        Profit per Hour
                      </Text>
                      <Flex alignItems={"center"}>
                        <Image src="/icons/coin.png" w={"16px"} alt="coin img" />
                        <Text fontSize={"14px"} fontWeight={500}>
                          {detail.pph}
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
                      Level {detail.level}
                    </Text>
                    <Flex alignItems={"center"}>
                      <Image src="/icons/coin.png" w={"16px"} alt="coin img" />
                      <Text fontSize={"14px"} fontWeight={500}>
                        {detail.cost}
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
