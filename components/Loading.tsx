
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      minH={"100vh"}
      bgImage={"/bgImage.png"}
      bgColor={"#12161F"}
      minW={"100vw"}
      bgSize={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={"white"}
      direction={'column'}
      gap={10}
      bgRepeat={'no-repeat'}
    >
      <Box pt={'35%'}>
        <Heading>
          SoftNote<sup>™</sup>
        </Heading>
        <Text color={"#4979D1"}>-Rush By TECTUM-</Text>
      </Box>

      <Box >
        <Image src="/Welcome.png" width={'300px'} alt="welcome img" />
      </Box>
    </Flex>
  );
}
