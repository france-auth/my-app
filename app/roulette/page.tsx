"use client";


import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/context/context";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  {
    ssr: false,
  }
);

const data = [
  { option: "100$" },
  { option: "200$" },
  { option: "300$" },
  { option: "400$" },
  { option: "500$" },
  { option: "600$" },
  { option: "700$" },
  { option: "800$" },
];

type UserData = {
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
  lastEarningsUpdate?: Date;
  lastSpinTime?: Date;
  lastCheckIn?: Date; // Optional field
  checkInStreak: number;
  createdAt: Date;
  updatedAt: Date;
};

type UpdateData = Partial<UserData>;



export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const {user, setUser} = useUser()
    const [canSpin, setCanSpin] = useState(false);
     const [timeRemaining, setTimeRemaining] = useState("");
    const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
    const toast = useToast();


      const updateUserProfile = async (updatedFields: UpdateData) => {
        if (!user || !user.telegramId) {
          console.error("User data or telegramId is missing.");
          return;
        }

        try {
          const response = await fetch(
            `/api/updateprofile?userId=${user.telegramId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedFields),
            }
          );

          if (!response.ok) {
            const errorText = await response.text(); // Read raw text to handle empty responses
            console.error(
              "Failed to update profile:",
              errorText || "Unknown error"
            );
            return null;
          }

          const updatedUser = await response.json();
          console.log("Profile updated successfully:", updatedUser);
          return updatedUser; // Return the updated user if needed
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };

      const updateCountdown = () => {
        if (nextSpinTime) {
          const now = new Date();
          const difference = nextSpinTime.getTime() - now.getTime();

          if (difference <= 0) {
            setCanSpin(true);
            setTimeRemaining("Spin Now!");
            return;
          }

          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
      };




  const handleSpinClick = async () => {
    const now = new Date()
       if (!canSpin) {
         const countdown = nextSpinTime
           ? `Next spin available at: ${nextSpinTime.toLocaleTimeString()}`
           : "Please wait until tomorrow for your next spin.";
         toast({
           title: "Spin Unavailable",
           description: countdown,
           status: "warning",
           duration: 5000,
           isClosable: true,
         });
         return;
       }
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      try {
      await new Promise((resolve) => setTimeout(resolve, 12000)); // Ensure the wheel starts
      const updatedUser = await updateUserProfile({ lastSpinTime: now });
      setUser(updatedUser);
    } catch (error) {
      console.log("Error updating user profile:", error);
    }
    }
  };

   useEffect(() => {
     const fetchSpinStatus = async () => {
       if (user) {
         try {
           const response = await fetch(`/api/spinStatus?userId=${user.id}`);
           if (!response.ok) {
             throw new Error("Failed to fetch spin status");
           }
           const result = await response.json();

           if (result.canSpin) {
             setCanSpin(true);
           } else {
             setCanSpin(false);
             setNextSpinTime(new Date(result.nextSpinTime));
           }
         } catch (error) {
           console.error("Error fetching spin status:", error);
         }
       }
     };

     fetchSpinStatus();
   }, [user]);


     useEffect(() => {
       const interval = setInterval(updateCountdown, 1000);
       return () => clearInterval(interval);
     }, [nextSpinTime]);

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
        height={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={12}
        gap={{ base: 5, sm: 14 }}
        pb={32}
      >
        <Text color={"#93BAFF"} fontWeight={"700"} fontSize={"24px"}>
          Resource Roulette
        </Text>
        <Box
          bg={
            "linear-gradient(225deg, #FEDC31 16%, #FDC448 22.31%, #FC8682 35.67%, #FA2CD7 53.31%, #987CDB 70.57%, #33D0E0 87.83%)"
          }
          mt={{ base: 0, sm: 14 }}
          display={"flex"}
          flexDirection={"column"}
          p={{ base: "4px", sm: "5px" }}
          borderRadius={"50%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            bg={
              "linear-gradient(225deg, #000604 16%, #303030 44.62%, #000604 87.83%)"
            }
            p={{ base: "10px", sm: "20px" }}
            borderRadius={"50%"}
            // border={"4px solid #F8F9FD"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              textColors={["white"]}
              fontSize={32}
              backgroundColors={[
                "#FE7A18",
                "#FC9612",
                "#1A95FF",
                "#E60C6A",
                "#6010F5",
                "#00766B",
                "#9D9D9D",
                "#FE3E0E",
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
          </Box>
        </Box>
        <Button
          onClick={handleSpinClick}
          w={"342px"}
          h={"49px"}
          bg={"#4979d1"}
          boxShadow={"0px -2px 8px 0px #F8F9FD33 inset"}
          fontSize={"24px"}
          fontWeight={700}
          color={"#f5f5f5"}
          borderRadius={"20px"}
          _hover={{ bg: "#4979d1", outline: "none" }}
          isDisabled={!canSpin}
        >
          {canSpin ? "Spin and Win!" : timeRemaining}
        </Button>

        <Flex
          alignItems={"center"}
          gap={2}
          w={"292px"}
          h={"39px"}
          mt={{ base: 1, sm: -10 }}
          justifyContent={"center"}
        >
          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />
          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />

          <Text fontWeight={500} fontSize={"12px"} color={"#999999"}>
            You get one attempt per day, make it count
          </Text>

          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />
          <Box w={"6px"} h={"6px"} bg={"#8D9094"} borderRadius={"50%"} />
        </Flex>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
