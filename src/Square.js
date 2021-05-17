function Square(props) {
  return (
    <td
      className={
        "Square " +
        (props.content.piece && props.content.color
          ? props.content.piece + "-" + props.content.color + " "
          : "") +
        props.color +
        " " +
        (props.possibleSquare?.type || "") +
        (props.target ? " target" : "")
      }
      onClick={() => {
        if (props.possibleSquare?.type) props.chooseDestination(props.coordinates);
        else
          props.choosePiece(
            props.content?.piece,
            props.coordinates,
            props.content?.color
          );
      }}
    ></td>
  );
}

export default Square;
