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

export default function Puzzle() {
  const [cardsArray, setCardsArray] = useState<CardType[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [stopFlip, setStopFlip] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  const { user } = useUser();
  const [levelIndex, setLevelIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const toast = useToast();

  // Start new game automatically on load/reload
  useEffect(() => {
    NewGame();
  }, []);

  // Handle game stop logic after win or loss
  useEffect(() => {
    if (moves >= 3 && matches < 2) {
      setGameOver(true); // Game over if no 2 matches within 3 moves
    }
    if (matches >= 2) {
      setWon(true); // Player wins after 2 matches
    }
  }, [moves, matches]);

  function NewGame(): void {
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

    // Reset indication boxes to initial color (light gray)
    resetIndicate();
  }

  function handleSelectedCards(item: CardType): void {
    if (stopFlip || gameOver || won) return; // Prevent further actions if game is over or won
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

  const calculateProgress = () => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1] || Infinity;
    const progress =
      ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    if (
      points >= levelMinPoints[levelIndex + 1] &&
      levelIndex < levelNames.length - 1
    ) {
      setLevelIndex(levelIndex + 1);
    }
  }, [points]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgGradient="linear-gradient(360deg, #00283A 0%, #12161E 88.17%)"
      width="100vw"
      height="100vh"
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
              <Flex justifyContent="space-between">
                <Text fontSize="12px" color="#F5F5F5">
                  {levelNames[levelIndex]}
                  <Icon as={ChevronRightIcon} />
                </Text>
                <Text fontSize="12px" color="#F5F5F5">
                  {levelIndex + 1} / {levelNames.length}
                </Text>
              </Flex>
              <Flex alignItems="center" bg="green">
                <Progress
                  value={calculateProgress()}
                  size="sm"
                  borderRadius="full"
                  bg="#1D222E"
                  border="1px solid #7585A7"
                  w="full"
                />
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Flex width="" gap={5}>
          <Box className="indicate" w="36px" h="36px" borderRadius="50%"></Box>
          <Box className="indicate" w="36px" h="36px" borderRadius="50%"></Box>
          <Box className="indicate" w="36px" h="36px" borderRadius="50%"></Box>
        </Flex>

        <Box width="90%" p="4px 16px" bg={'red'}>
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
          onClick={NewGame}
          mt={10}
          w="342px"
          h="49px"
          bg="#4979d1"
          fontSize="24px"
          _hover={{bg: "#4979d1"}}
        >
          Play Again
        </Button>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
