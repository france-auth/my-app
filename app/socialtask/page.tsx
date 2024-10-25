import { Box, Text, Flex, Image, Icon, Progress } from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";

const socialTask = [
    {
        image: "/icons/invite.png",
        name: "Invite & Earn",
        reward: "100,000",
        path: "/",
    },
    {
        image: "/icons/telegram.png",
        name: "Invite via Telegram Premium",
        reward: "100,000",
        path: "/",
    },
    {
        image: "/icons/people-add.png",
        name: "Join Softnote Channel",
        reward: "100,000",
        path: "/",
    },
    {
        image: "/icons/peers.png",
        name: "Join Softnote Community",
        reward: "100,000",
        path: "/",
    },
]


export default function SocialTask() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgGradient={'linear-gradient(360deg, #00283A 0%, #12161E 88.17%)'}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
    >
      <Flex
        width={"100%"}
        minHeight={"100vh"}   
        flexDirection={"column"}
        alignItems={"center"}
        pb={32}
        gap={5}
      >
        <Box width={'100%'} p={'20px'} pt={'30px'}>
        <Text color={'#93BAFF'} fontWeight={'700'} fontSize={'24px'} textAlign={'center'}>
            Social Tasks
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
        <Box
          width={"100%"}
          px={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          justifyContent={"space-between"}
        >
          <Text fontSize={"16px"} fontWeight={500} color={"#fff"}>
            Task List
          </Text>
          {socialTask.map((task, id) => {
            return(
          <Link href={""}
          key={id}>
            <Flex
              h={"80px"}
              bg={"#1D222E"}
              borderRadius={"16px"}
              padding={"18px 16px"}
              borderBottom={"0.9px solid #4979D1"}
              gap={4}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"} gap={4}>
                <Image src={task.image} w={"48px"} h={"48px"} alt="task img" />
                <Flex direction={"column"}>
                  <Text fontSize={"16px"} fontWeight={500} color={"#f5f5f5"}>
                    {task.name}
                  </Text>
                  <Flex alignItems={"center"}>
                    <Image src="/icons/BigCoin.png" w={"14px"} alt="big coin" />
                    <Text fontSize={"12px"} fontWeight={500} color={"#f5f5f5"}>
                      + {task.reward} XP
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Box w={"12px"} h={"12px"} bg={"#f5f5f5"} borderRadius={"50%"} />
            </Flex>
          </Link>

            )
          })}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
