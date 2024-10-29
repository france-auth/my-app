
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      minH={"100vh"}
      bgGradient="linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"
      minW={"100vw"}
      bgSize={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={"white"}
      direction={"column"}
      gap={10}
    >
      <Box pt={"35%"}>
        <Heading fontSize={'36px'}>
          SoftNote Rush
        </Heading>
        <Text color={"#4979D1"} textAlign={'center'} fontSize={'20px'}> By TECTUM</Text>
      </Box>

      <Box>
        <Image src="/Welcome.png" width={"300px"} alt="welcome img" />
      </Box>
    </Flex>
  );
}
