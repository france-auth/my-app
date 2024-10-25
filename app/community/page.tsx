import { Box, Text, Flex, Avatar, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";

const Communities = [
    {
        image: "https://bit.ly/prosper-baba",
        name: "Crypto meme",
        members: "356,782 Members",
        path: "/",
    },
    {
        image: "https://bit.ly/prosper-baba",
        name: "Shilo Dosy GM",
        members: "256,782 Members",
        path: "",
    },
    {
        image: "https://bit.ly/prosper-baba",    
        name: "PharmacyCrypto",
        members: "246,782 Members",
        path: "",
    },
    {
        image: "https://bit.ly/prosper-baba",
        name: "Scott Paymod",
        members: "236,782 Members",
        path: "",
    },
    {
        image: "https://bit.ly/prosper-baba",
        name: "Meme Girl",
        members: "56,782 Members",
        path: "",
    },
    {
        image: "https://bit.ly/prosper-baba",
        name: "Shark DAOs",
        members: "6,782 Members",
        path: "",
    },
]

export default function Community() {
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
        pt={12}
        pb={32}
        gap={5}
      >
        <Text color={'#93baff'} fontWeight={'700'} fontSize={'24px'}>
            Join Community
        </Text>
        <Box width={'100%'} px={'16px'} display={'flex'} flexDirection={'column'} gap={1}
        justifyContent={'space-between'}>   
        {Communities.map((community, id) => {
            return(
            <Flex 
            key={id}
            h={'100px'}
            padding={'18px 18px'}  
            bg={'#12161e'}
            gap={4}
            borderBottom={"0.9px solid #4979D1"} 
            alignItems={'center'}
            justifyContent={'space-between'}>
                <Flex alignItems={'center'} w={'163px'} gap={4}>
                <Avatar src={community.image} w={'40px'} h={'40px'} borderRadius={'100px'} border={'1px solid #f5f5f5'}/>
                <Flex direction={'column'}>
                <Text fontSize={'14px'} fontWeight={600} color={'#f5f5f5'}>
                    {community.name}
                </Text>
                <Text fontSize={'12px'} fontWeight={500} color={'#4979d1'}>
                    {community.members}
                </Text>
                </Flex>
                </Flex>
                <Link to={community.path}>  
                <Button w={'60px'} h={'25px'} bg={'#4979d1'} color={'#fff'} fontSize={'10px'} fontWeight={600} _hover={{bg: '#4979d1'}} borderRadius={'20px'}>
                  Join
                </Button>
            </Link>
            </Flex>
            )
        })}             
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
