"use client";

import {
  Box,
  Flex,
  Text,
  Icon,
  Progress,
  Button,
  useToast,
} from "@chakra-ui/react";
import Data, { CardType } from "@/components/data";
import Card from "@/components/card";
import { useState, useEffect } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NavigationBar from "@/components/NavigationBar";
import { useUser } from "@/context/context";

const levelNames = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Epic",
  "Legendary",
  "Master",
  "GrandMaster",
  "Lord",
];

const levelMinPoints = [
  0, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 100000000,
  1000000000,
];

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Puzzle() {
  const [cardsArray, setCardsArray] = useState<CardType[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [stopFlip, setStopFlip] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false); // Track if the game is locked
  const [buttonText, setButtonText] = useState<string>("Play Again"); // Track button text
  const toast = useToast();

  const { user } = useUser();
  const [levelIndex, setLevelIndex] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    checkLastPlayTime(); // Check if the player is locked out on load
    NewGame();
  }, []);

  // Check if 24 hours have passed since the last play
  function checkLastPlayTime() {
    const lastPlay = localStorage.getItem("lastPlayTime");
    if (lastPlay) {
      const elapsed = Date.now() - parseInt(lastPlay);
      if (elapsed < TWENTY_FOUR_HOURS) {
        setDisabled(true); // Lock the game if within 24 hours
        setButtonText(won ? "Claim 100 XP" : "Try Again");
      } else {
        setDisabled(false); // Unlock if 24 hours have passed
        setButtonText("Play Again");
      }
    }
  }

  // Store the last play timestamp in localStorage
  function setLastPlayTime() {
    localStorage.setItem("lastPlayTime", Date.now().toString());
  }

  // Start a new game if not locked
  function NewGame(): void {
    if (disabled) return; // Prevent playing if locked

    const shuffledArray = Data.sort(() => 0.5 - Math.random()).map((card) => ({
      ...card,
      matched: false,
    }));
    setCardsArray(shuffledArray);
    setMoves(0);
    setMatches(0);
    setFirstCard(null);
    setSecondCard(null);
    setWon(false);
    setGameOver(false);
    resetIndicate();
  }

  // Handle card selection
  function handleSelectedCards(item: CardType): void {
    if (stopFlip || gameOver || won || disabled) return; // Prevent actions if locked or game over
    firstCard ? setSecondCard(item) : setFirstCard(item);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        handleMatchSuccess();
      } else {
        handleMatchFailure();
      }
    }
  }, [firstCard, secondCard]);

  function handleMatchSuccess() {
    setCardsArray((prevArray) =>
      prevArray.map((card) =>
        card.name === firstCard!.name ? { ...card, matched: true } : card
      )
    );
    setMatches((prevMatches) => prevMatches + 1);
    updateIndicate("green");
    resetSelection();
  }

  function handleMatchFailure() {
    updateIndicate("red");
    setTimeout(resetSelection, 1000);
  }

  function resetSelection(): void {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevMoves) => prevMoves + 1);
  }

  useEffect(() => {
    if (moves >= 3 && matches < 2) {
      setGameOver(true);
      setButtonText("Try Again");
      setLastPlayTime(); // Record last play time on loss
      setDisabled(true);
    }
    if (matches >= 2) {
      setWon(true);
      setButtonText("Claim 100 XP");
      setLastPlayTime(); // Record last play time on win
      setDisabled(true);
    }
  }, [moves, matches]);

  function updateIndicate(color: string) {
    const indicateBoxes = document.querySelectorAll(".indicate");
    indicateBoxes[moves]?.setAttribute("style", `background-color: ${color}`);
  }

  function resetIndicate() {
    const indicateBoxes = document.querySelectorAll(".indicate");
    indicateBoxes.forEach((box) =>
      box.setAttribute("style", "background-color: lightgray")
    );
  }

  const handleClaimXP = () => {
    toast({
      title: "100 XP Claimed!",
      description: "Come back in 24 hours to play again.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setDisabled(true); // Disable the game after claiming XP
    setButtonText("Play Again"); // Reset button text
  };

  const calculateProgress = () => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1] || Infinity;
    const progress =
      ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgGradient="linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"
      width="100vw"
      minHeight="100vh"
      alignItems="center"
      textColor="white"
      overflow="hidden"
    >
      <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt={12}
        gap={5}
        pb={32}
      >
        <Box width="100%" px="20px" pb={10}>
          <Text
            color="#93BAFF"
            fontWeight="700"
            fontSize="24px"
            textAlign="center"
          >
            Daily Puzzle
          </Text>

          <Flex
            w="100%"
            alignItems="center"
            mt={4}
            justifyContent="space-between"
          >
            <Box width="40%" display="flex" flexDirection="column" gap={1}>
              <Progress
                value={calculateProgress()}
                size="sm"
                borderRadius="full"
              />
            </Box>
          </Flex>
        </Box>

        <Flex gap={5}>
          <Box className="indicate" w="36px" h="36px" borderRadius="50%"></Box>
          <Box className="indicate" w="36px" h="36px" borderRadius="50%"></Box>
          <Box className="indicate" w="36px" h="36px" borderRadius="50%"></Box>
        </Flex>

        <Box width="90%" h="396px" p="4px 16px">
          <div className="board">
            {cardsArray.map((item) => (
              <Card
                key={item.id}
                item={item}
                handleSelectedCards={handleSelectedCards}
                toggled={
                  item === firstCard || item === secondCard || item.matched
                }
                stopflip={stopFlip}
              />
            ))}
          </div>

          {gameOver ? (
            <div className="comments">😢 Game Over! 😢</div>
          ) : won ? (
            <div className="comments">🎉 You won! 🎉</div>
          ) : (
            <div className="comments">Moves: {moves} / 3</div>
          )}
        </Box>

        <Button
          onClick={won ? handleClaimXP : NewGame}
          w="342px"
          h="49px"
          bg="#4979d1"
          fontSize="24px"
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
