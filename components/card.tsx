import React from "react";
import { CardType } from "@/components/data"; // Import the CardType interface for type safety

// Define the type for the props passed to the Card component
interface CardProps {
  item: CardType;
  handleSelectedCards: (item: CardType) => void;
  toggled: boolean;
  stopflip: boolean;
}

// Functional Component with typed props
const Card: React.FC<CardProps> = ({
  item,
  handleSelectedCards,
  toggled,
  stopflip,
}) => {
  return (
    <div className="item">
      <div className={toggled ? "toggled" : ""}>
        <img className="face w-[4em] h-[3em] sm:w-[4em] sm:h-[4em] xl:w-[5em] xl:h-[5em]" src={item.img} alt="face" />
        <div
          className="back  w-[4em] h-[3em] sm:w-[4em] sm:h-[4em] xl:w-[5em] xl:h-[5em]"
          onClick={() => !stopflip && handleSelectedCards(item)}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Card;
