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
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";

type Props = Record<string, never>;

function Achievements({}: Props) {
  return (
    <Flex
      flexDirection={"column"}
      bgGradient={"linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"}
      width={"100vw"}
      minHeight={"100vh"}
      // alignItems={"center"}
      textColor={"white"}
      overflow={"hidden"}
    >
      <Flex direction={"column"} gap={2} p={5} bg={"#12161e"}>
        <Flex gap={1} justifyContent={"center"}>
          <Heading fontSize={"25px"} color={"#93baff"} mt={2}>
            {" "}
            Leaderboard
          </Heading>
        </Flex>
        <Flex direction={"column"}>
          <Text color={"#C4C4C4"} fontSize={"xs"}>
            Click Picture to see Badges
          </Text>
          <Card bg={"#12161E"} boxShadow={"0px 2px 2px 2px #19388A99"} mt={1}>
            <CardBody>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={2}>
                  <Wrap border={"1px solid white"} borderRadius={"50%"}>
                    <WrapItem>
                      <Link href={"/badges"}>
                        <Avatar
                          size="sm"
                          name="Prosper Otemuyiwa"
                          src="https://bit.ly/prosper-baba"
                        />
                      </Link>
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
        <Heading
          color={"white"}
          fontSize={"16px"}
          fontWeight={700}
          mt={5}
          mb={-2}
        >
          TOP 22
        </Heading>
      </Flex>

      <Flex direction={"column"} p={5} gap={4} pb={32}>
        <Flex minH={"60vh"} direction={"column"}  align={'center'} w={'100%'}>
          <Flex
            justifyContent={"space-around"}
            p={5}
            w={'100%'}
            alignItems={"center"}
            textAlign={"center"}
            borderWidth={"1px"}
            sx={{
              borderImageSource:
                "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)",
              borderImageSlice: 1,
            }}
          >
            <Flex>
              <Flex direction={"column"} alignItems={"center"} p={2} gap={2}>
                <Wrap border={"1px solid white"} borderRadius={"50%"}>
                  <WrapItem>
                    <Avatar
                      w={"71px"}
                      h={"71px"}
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
            </Flex>

            <Flex>
              <Flex direction={"column"} alignItems={"center"} p={2} gap={2}>
                <Wrap border={"1px solid white"} borderRadius={"50%"}>
                  <WrapItem>
                    <Avatar
                      w={"79px"}
                      h={"79px"}
                      name="Dan Abramov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </Wrap>
                <Flex direction={"column"} lineHeight={"14px"}>
                  <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                    Dan Abramov
                  </Text>
                  <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                    817,356,782 XP
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex>
              <Flex direction={"column"} alignItems={"center"} p={2} gap={2}>
                <Wrap border={"1px solid white"} borderRadius={"50%"}>
                  <WrapItem>
                    <Avatar
                      w={"55.25px"}
                      h={"55.25px"}
                      name="Kent Dodds"
                      src="https://bit.ly/kent-c-dodds"
                    />
                  </WrapItem>
                </Wrap>
                <Flex direction={"column"} lineHeight={"14px"}>
                  <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                    Kent Dodds
                  </Text>
                  <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                    817,356,782 XP
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            mt={4}
            h={"10vh"}
            w={'95%'}
            borderWidth={"1px"}
            sx={{
              borderImageSource:
                "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)",
              borderImageSlice: 1,
            }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"} p={2} gap={2}>
              <Wrap border={"1px solid white"} borderRadius={"50%"}>
                <WrapItem>
                  <Avatar
                    size="sm"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                </WrapItem>
              </Wrap>
              <Flex direction={"column"} lineHeight={"14px"}>
                <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                  Ryan Florence
                </Text>
                <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                  817,356,782 XP
                </Text>
              </Flex>
            </Flex>
            <Text p={2}>#4</Text>
          </Flex>
          <Flex
            h={"10vh"}
            w={'95%'}
            borderWidth={"1px"}
            sx={{
              borderImageSource:
                "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)",
              borderImageSlice: 1,
            }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"} p={2} gap={2}>
              <Wrap border={"1px solid white"} borderRadius={"50%"}>
                <WrapItem>
                  <Avatar
                    size="sm"
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                </WrapItem>
              </Wrap>
              <Flex direction={"column"} lineHeight={"14px"}>
                <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                  Christian Nwamba
                </Text>
                <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                  817,356,782 XP
                </Text>
              </Flex>
            </Flex>

            <Text p={2}>#5</Text>
          </Flex>
          <Flex
            h={"10vh"}
            w={'95%'}
            borderWidth={"1px"}
            sx={{
              borderImageSource:
                "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)",
              borderImageSlice: 1,
            }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"} p={2} gap={2}>
              <Wrap border={"1px solid white"} borderRadius={"50%"}>
                <WrapItem>
                  <Avatar
                    size="sm"
                    name="Segun Tayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                </WrapItem>
              </Wrap>
              <Flex direction={"column"} lineHeight={"14px"}>
                <Text color={"white"} fontSize={"small"} fontWeight={"700"}>
                  Sadam Tayo
                </Text>
                <Text color={"#4979D1"} fontSize={"2xs"} fontWeight={"700"}>
                  817,356,782 XP
                </Text>
              </Flex>
            </Flex>
            <Text p={2}>#6</Text>
          </Flex>
        </Flex>
      </Flex>

      <NavigationBar />
    </Flex>
  );
}

export default Achievements;
