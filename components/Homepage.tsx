"use client";

import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  Avatar,
  Progress,
} from "@chakra-ui/react";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import { useState, useEffect } from "react";
import { useUser } from "@/context/context";

const SmallCardArray = [
  {
    image: "/icons/game-chat.png",
    text: "Mini Games",
    timer: "00:00",
    path: "/play2earn",
  },
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
  lastEarningsUpdate: Date;
  lastCheckIn?: Date; // Optional field
  checkInStreak: number;
  createdAt: Date;
  updatedAt: Date;
};

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

type UpdateData = Partial<UserData>;

export default function Homepage() {
  const {user} = useUser()
  const [userData, setUserData] = useState<UserData | null>()
  const [levelIndex, setLevelIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
   const [isFirstImage, setIsFirstImage] = useState(true);

  const [points, setPoints] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [profitPerHour, setProfitPerHour] = useState(0);
  const [floatingEnergy, setFloatingEnergy] = useState(0);

  useEffect(()=>{
    if(user){
    setUserData(user);
    }
    
  }, [user])

  const updateUserProfile = async (updatedFields: UpdateData) => {
    if (!userData || !userData.telegramId) {
      console.error("User data or telegramId is missing.");
      return;
    }

    try {
      const response = await fetch(
        `/api/updateprofile?userId=${userData.telegramId}`,
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

  useEffect(() => {
    const refillTaps = async () => {
      try {
        const response = await fetch("/api/refillTaps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userData?.telegramId }),
        });

        if (response.ok) {
          const data = await response.json();
          setFloatingEnergy(data.user.taps); // Update taps with the latest value
        } else {
          console.error("Failed to refill taps");
        }
      } catch (error) {
        console.error("Error refilling taps:", error);
      }
    };
    console.log(coins)

    // Set an interval to refill taps every 5 seconds
    const intervalId = setInterval(refillTaps, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [userData?.telegramId]);

  const handleCardClick = async (e: React.TouchEvent<HTMLDivElement>) => {
    setIsFirstImage((prev) => !prev);

    if (floatingEnergy <= 0) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
 const touches = Array.from(e.touches);
  touches.forEach((touch) => {
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;

    // Apply transform for each touch
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;

    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    const newPoints = points + pointsToAdd;

    setPoints(newPoints);
    const newFLoat = floatingEnergy - 1;
    setFloatingEnergy(newFLoat);

    setClicks((prevClicks) => [
      ...prevClicks,
      { id: Date.now(), x: touch.pageX, y: touch.pageY },
    ]);
  });
   const updatedUser = await updateUserProfile({
     coins: points + pointsToAdd * touches.length,
     taps: floatingEnergy - touches.length,
   });
    if (updatedUser) {
      console.log("User updated:", updatedUser);
    }
  };


  useEffect(()=>{
       const flickerTimer = setTimeout(() => {
         setIsFirstImage(true);
       }, 100);


       return () => clearTimeout(flickerTimer);

  },[isFirstImage])

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

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

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };



  useEffect(() => {
    if (userData) {
      setCoins(userData.coins);
      setPoints(userData.coins);
      setPointsToAdd(userData.multitap);
      setProfitPerHour(userData.profitPerHour);
      setLevelIndex(userData.level);
      setFloatingEnergy(userData.taps);
    }
  }, [userData]);

   useEffect(() => {
    const handlePPh = async ()=>{
         if (user) {
       const now = new Date();
       const lastUpdate = user.lastEarningsUpdate
         ? new Date(user.lastEarningsUpdate)
         : now; // If null, set to now
       const elapsedSeconds = Math.floor(
         (now.getTime() - lastUpdate.getTime()) / 1000
       );

       // Calculate the earned coins since the last update
       const earnedCoins = (user.profitPerHour / 3600) * elapsedSeconds;

       // Update the points and sync with backend
       const newPoints = user.coins + earnedCoins;
       

       // Update the backend with new coins and the latest earnings update time
       await updateUserProfile({ coins: newPoints, lastEarningsUpdate: now });
    
       setPoints(newPoints);
       
     }
    }

    if(user){
      handlePPh();
    }
   }, [user]);

useEffect(() => {
  if (profitPerHour > 0) {
  
    const interval = setInterval(() => {
      const pointsToAdd = profitPerHour / 3600; // Fractional points per second
      

      setPoints((prevPoints) => prevPoints + pointsToAdd); // Add fractional points
      
    }, 1000); // Every second

    return () => clearInterval(interval); // Cleanup on unmount
  }
}, [profitPerHour]);


  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"#12161E"}
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
        pt={3}
        gap={3}
      >
        <Box w={"90%"}>
          <Flex alignItems={"center"} gap={2}>
            {userData && (
              <Avatar
                size={"sm"}
                name={userData.username}
                src={userData.photoUrl}
              />
            )}

            <Text fontWeight={"700"} fontSize={"20px"} color={"#F5F5F5"}>
              {userData && userData.username}
            </Text>
          </Flex>
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
                <Text>{points.toFixed(0)}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Flex
          width={"100%"}
          flexDirection={"column"}
          pt={1}
          borderTopRadius={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          bgGradient={
            "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
          }
        >
          <Flex
            flexDirection={"column"}
            bgGradient={"linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"}
            w={"100%"}
            borderTopRadius={"15px"}
            h={"77vh"}
            // bg={'yellow'}
            className="gap-0 pt-2 sm:pt-2 xl:pt-3"
            alignItems={"center"}
          >
            <Flex
              w={"80%"}
              p={"3px"}
              gap={"4px"}
              borderRadius={"10px"}
              mx={"auto"}
              bgGradient={
                "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
              }
            >
              {SmallCardArray.map((card, id) => {
                return (
                  <Link href={card.path} className="w-[100%]" key={id}>
                    <Flex
                      width={"100%"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      height={"100px"}
                      justifyContent={"center"}
                      p={"22px"}
                      bgColor={"#1D222E"}
                      gap={"8px"}
                      borderRadius={"10px"}
                    >
                      <Image alt="card img" src={card.image} w={"32px"} />
                      <Text
                        w={""}
                        textAlign={"center"}
                        fontSize={"12px"}
                        fontWeight={500}
                        color={"white"}
                      >
                        {card.text}
                      </Text>
                    </Flex>
                  </Link>
                );
              })}
            </Flex>

            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"266px"}
              h={"100px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                fontSize={"12px"}
                fontWeight={600}
                color={"#7585A7"}
                lineHeight={"14.52px"}
              >
                {" "}
                {userData && formatProfitPerHour(profitPerHour)} per hour
              </Text>
              <Flex h={"36px"} gap={3} alignItems={"center"}>
                <Image alt="coin img" src="/icons/coin.png" />
                <Text fontSize={"29.33px"} fontWeight={600} color={"#DDE2E7"}>
                  {points.toFixed(0)}
                </Text>
              </Flex>
            </Box>

            <Box
              w={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              className="circle-outer h-[30vh] sm:h-[35vh]"
              onTouchStart={handleCardClick}
            >
              <Box
                width={"100%"}
                h={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                // overflow={'hidden'}
                mt={2}
                className="circle-inner"
              >
                <Image
                  alt="floating coin img"
                  src="/FloatingCoins.png"
                  position={"relative"}
                  zIndex={1}
                  className="w-[70%] sm:w-[100%]"
                />
                <Box
                  className="spin w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]"
                  bgGradient={
                    "conic-gradient(from 180deg at 50% 50%, #19388A 0deg, #1A59FF 25.2deg, #D9D9D9 117deg, #1948C1 212.4deg, #F5F5F5 284.4deg, #19388A 360deg)"
                  }
                  // w={"200px"}
                  // h={"200÷px"}
                  borderRadius={"50%"}
                  position={"absolute"}
                  p={"5px"}
                  display={"flex"}
                >
                  <Box
                    bgGradient={
                      "linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"
                    }
                    borderRadius={"50%"}
                    overflow={"hidden"}
                    className="spin-reverse"
                  >
                    <Image
                      src={
                        isFirstImage
                          ? "/MASCOT NORMAL.png"
                          : "/MASCOT HAPPY.png"
                      }
                      w={{ base: "80%", sm: "auto" }}
                      mx={"auto"}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              w={"100%"}
              h={"35.33px"}
              mt={5}
              px={"10.67px"}
              alignItems={"center"}
              justifyContent={"center"}
              display={"flex"}
            >
              <Flex width={"85%"} alignItems={"center"}>
                <Image src="/icons/thunder.png" width={"20px"} />
                <Text fontSize={"13px"} fontWeight={500} color={"#DDE2E7"}>
                  {`${floatingEnergy} / ${userData && userData.maxTaps}`}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <NavigationBar />
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </Box>
  );
}
