import {
  Box,
  Text,
  Flex,
  Image,
  Icon,
  Progress,
  useClipboard,
  Input,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { CheckIcon } from "@chakra-ui/icons";
import { FaShareAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import NavigationBar from "@/components/NavigationBar";


export default function Friends() {
  const placeholder = "http://example.com/aBcD1234EfGh5678IjKlMnOpQrStUvWxYz9876";
const { onCopy, value, setValue, hasCopied } = useClipboard("http://example.com/aBcD1234EfGh5678IjKlMnOpQrStUvWxYz9876");

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
        minHeight={"100vh"}
        flexDirection={"column"}
        alignItems={"center"}
        pb={32}
        gap={5}
      >
        <Box width={"100%"} p={"20px"} pt={"30px"}>
          <Text
            color={"#93BAFF"}
            fontWeight={"700"}
            fontSize={"24px"}
            textAlign={"center"}
          >
            Invite & Earn
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
          gap={5}
        >
          <Text
            fontSize={"25px"}
            w={"251px"}
            fontWeight={600}
            color={"#fff"}
            textAlign={"center"}
            mx={"auto"}
          >
            Invite <span className="text-[#93BAFF]"> your friends</span> & Earn{" "}
            <span className="text-[#93BAFF]">cool rewards</span>
          </Text>

          <Image src="/yellow-dude.png" w={"344px"} h={"295px"} mx={"auto"} alt="yellow dude" />

          <Flex
          w={'90%'}
          borderRadius={'10px'}
          mx={'auto'}
          bgGradient={
            "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
          }
          p={'2px'}
          alignItems={'center'}
          >

            <Box display={'flex'} w={'100%'} h={'100%'} bg={"#1d222e"} borderRadius={"10px"} alignItems={'center'}>
            <Input
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              mr={2}
              alignSelf={'center'}
              height={"41px"}
              outline="none"
              boxShadow="none"
              _focus={{ boxShadow: "none" }}
              border="none"
              color="white"
              fontSize="10px"
              _placeholder={{ color: "white", fontSize: "10px" }}
              alignItems={'center'}
            />
            <Button
              w={'41px'}
              height={"41px"}
              onClick={onCopy}
              bg={"#4979d1"}
              borderRadius={'0px'}
              mr={'0.5'}
              _hover={{ bg: "#4979d1", border: "none", outline: "none" }}
            >
              {hasCopied ? (
                <CheckIcon boxSize={5} color={'white'}/>
              ) : (
                <Icon as={MdContentCopy} boxSize={5} color={'white'}/>
              )}{" "}
              {/* Switches between icons */}
            </Button>
            <Button
              w={'41px'}
              height={"41px"}
              onClick={onCopy}
              bg={"#4979d1"}
              borderRadius={'0px 10px 10px 0px'}
              _hover={{ bg: "#4979d1", border: "none", outline: "none" }}
            >
                <Icon as={FaShareAlt} boxSize={5} color={'white'}/>
              {/* Switches between icons */}
            </Button>
            
            </Box>
          </Flex>

          <Flex flexDirection={"column"} gap={4} w={"90%"} mx={"auto"}>
            <Text fontSize={"12px"} fontWeight={500}>
              Friend List
            </Text>
            <Box
              bgGradient={
                "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
              }
              borderRadius={"10px"}
              h={"67px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p={"2px"}
            >
              <Box
                width={"100%"}
                h={"100%"}
                bg={"#1d222e"}
                borderRadius={"10px"}
                fontSize={"14px"}
                fontWeight={500}
                display={"flex"}
                mx={"auto"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"#f2f2f2"}
              >
                You haven’t invited anyone yet
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
