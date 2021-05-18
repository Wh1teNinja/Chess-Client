import Square from "./Square";
import PiecesMoves from "./PiecesMoves";
import { useState, useEffect } from "react";

function ChessBoard(props) {
  const [target, setTarget] = useState({});
  const [possibleMoves, setPossibleMoves] = useState([]);

  useEffect(() => {
    setPossibleMoves([]);
    setTarget({});
  }, [props.board.content]);

  const chooseDestination = (destination) => {
    props.sendMove(target, destination);
    setPossibleMoves([]);
    setTarget({});
  };

  const choosePiece = (piece, position, color) => {
    if (props.board.winner || props.userData.role === "spectator") return;
    setPossibleMoves([]);

    if (!piece || color !== props.board.currentColor || color !== props.userData.color) {
      setTarget({});
      return;
    }

    if (position.y === target.y && position.x === target.x) {
      setTarget({});
      return;
    }

    setTarget(position);

    calculatePossibleMoves(piece, position, color);
  };

  const calculatePossibleMoves = (piece, position, color) => {
    let possibleMovesTemp = [];
    switch (piece) {
      case "pawn":
        possibleMovesTemp = PiecesMoves.pawnMoves(
          props.board.content,
          position,
          color
        );
        break;
      case "knight":
        possibleMovesTemp = PiecesMoves.knightMoves(
          props.board.content,
          position,
          color
        );
        break;
      case "bishop":
        possibleMovesTemp = PiecesMoves.bishopMoves(
          props.board.content,
          position,
          color
        );
        break;
      case "rook":
        possibleMovesTemp = PiecesMoves.rookMoves(
          props.board.content,
          position,
          color
        );
        break;
      case "queen":
        possibleMovesTemp = PiecesMoves.queenMoves(
          props.board.content,
          position,
          color
        );
        break;
      case "king":
        possibleMovesTemp = PiecesMoves.kingMoves(
          props.board.content,
          position,
          color,
        );
        break;
      default:
        break;
    }
    setPossibleMoves(possibleMovesTemp);
  };

  const generateLetterNotations = () => {
    let tableHeaderContent = [];
    for (let i = 0; i < 9; i++) {
      tableHeaderContent.push(
        <th key={i} className='board-notation'>
          {(i && String.fromCharCode(64 + i)) || ""}
        </th>
      );
    }
    return <tr key={9}>{tableHeaderContent}</tr>;
  };

  const generateRow = (rowIndex, mirrored) => {
    let rowContent = [
      <td key={rowIndex * 9} className='board-notation'>
        {rowIndex + 1}
      </td>,
    ];

    for (let i = 0; i < 8; i++) {
      const color = (i + rowIndex) % 2 ? "dark" : "bright";
      const possibleSquare = possibleMoves.find((square) => {
        if (square.y === rowIndex && square.x === i) return true;

        return false;
      });
      rowContent.push(
        <Square
          key={i + 1 + rowIndex * 9}
          color={color}
          content={props.board.content[rowIndex][i]}
          coordinates={{ y: rowIndex, x: i }}
          choosePiece={choosePiece}
          target={target.y === rowIndex && target.x === i}
          possibleSquare={possibleSquare || ""}
          chooseDestination={chooseDestination}
        />
      );
    }

    rowContent.push(
      <td key={rowIndex * 9 + 9} className='board-notation'>
        {rowIndex + 1}
      </td>
    );

    if (mirrored) rowContent = rowContent.reverse();

    return <tr key={rowIndex}>{rowContent}</tr>;
  };

  const generateTable = () => {
    let boardBody = [];
    if (props.userData.color === "black")
      for (let i = 0; i < 8; i++)
        boardBody.push(generateRow(i));
    else 
      for (let i = 7; i >= 0; i--)
        boardBody.push(generateRow(i));
    return (
      <table>
        <thead>{generateLetterNotations()}</thead>
        <tbody>{boardBody}</tbody>
        <tfoot>{generateLetterNotations()}</tfoot>
      </table>
    );
  };

  return <div className='Board'>{generateTable()}</div>;
}

export default ChessBoard;
