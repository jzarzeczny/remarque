interface RemarqueAddCardProps {
  addRemarque: () => void;
}

export const RemarqueAddCard = ({ addRemarque }: RemarqueAddCardProps) => {
  return (
    <button className="cardContainer" onClick={() => addRemarque()}>
      <span>+</span>
    </button>
  );
};
