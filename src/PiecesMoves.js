const PiecesMoves = {};

function isCheck(boardContent, position, color) {
  let check = false;
  let checkMoves;
  checkMoves = PiecesMoves.knightMoves(boardContent, position, color);
  if (
    checkMoves.find(
      (checkMove) =>
        checkMove.type === "attack" &&
        boardContent[checkMove.y][checkMove.x].piece === "knight"
    )
  )
    check = true;

  checkMoves = PiecesMoves.bishopMoves(boardContent, position, color);
  if (
    !check &&
    checkMoves.find(
      (checkMove) =>
        checkMove.type === "attack" &&
        (boardContent[checkMove.y][checkMove.x].piece === "bishop" ||
          boardContent[checkMove.y][checkMove.x].piece === "queen")
    )
  )
    check = true;

  checkMoves = PiecesMoves.rookMoves(boardContent, position, color);
  if (
    !check &&
    checkMoves.find(
      (checkMove) =>
        checkMove.type === "attack" &&
        (boardContent[checkMove.y][checkMove.x].piece === "rook" ||
          boardContent[checkMove.y][checkMove.x].piece === "queen")
    )
  )
    check = true;

  checkMoves = PiecesMoves.pawnMoves(boardContent, position, color);
  if (
    !check &&
    checkMoves.find(
      (checkMove) =>
        checkMove.type === "attack" &&
        boardContent[checkMove.y][checkMove.x].piece === "pawn"
    )
  )
    check = true;

  checkMoves = PiecesMoves.kingMoves(boardContent, position, color, false);
  if (
    !check &&
    checkMoves.find(
      (checkMove) =>
        checkMove.type === "attack" &&
        boardContent[checkMove.y][checkMove.x].piece === "king"
    )
  )
    check = true;

  return check;
}

PiecesMoves.pawnMoves = (boardContent, position, color) => {
  let possibleMoves = [];
  if (color === "white") {
    if (!boardContent[position.y + 1][position.x].piece)
      possibleMoves.push({
        y: position.y + 1,
        x: position.x,
        type: "move",
      });

    if (
      position.y === 1 &&
      !boardContent[position.y + 1][position.x].piece &&
      !boardContent[position.y + 2][position.x].piece
    )
      possibleMoves.push({
        y: position.y + 2,
        x: position.x,
        type: "move",
      });

    if (boardContent[position.y + 1][position.x + 1]?.color === "black")
      possibleMoves.push({
        y: position.y + 1,
        x: position.x + 1,
        type: "attack",
      });

    if (boardContent[position.y + 1][position.x - 1]?.color === "black")
      possibleMoves.push({
        y: position.y + 1,
        x: position.x - 1,
        type: "attack",
      });

    if (
      boardContent[position.y][position.x - 1]?.color === "black" &&
      boardContent[position.y][position.x - 1]?.enPassant
    )
      possibleMoves.push({
        y: position.y + 1,
        x: position.x - 1,
        type: "attack",
      });

    if (
      boardContent[position.y][position.x + 1]?.color === "black" &&
      boardContent[position.y][position.x + 1]?.enPassant
    )
      possibleMoves.push({
        y: position.y + 1,
        x: position.x + 1,
        type: "attack",
      });
  } else {
    if (!boardContent[position.y - 1][position.x].piece)
      possibleMoves.push({
        y: position.y - 1,
        x: position.x,
        type: "move",
      });

    if (
      position.y === 6 &&
      !boardContent[position.y - 1][position.x].piece &&
      !boardContent[position.y - 2][position.x].piece
    )
      possibleMoves.push({
        y: position.y - 2,
        x: position.x,
        type: "move",
      });

    if (boardContent[position.y - 1][position.x + 1]?.color === "white")
      possibleMoves.push({
        y: position.y - 1,
        x: position.x + 1,
        type: "attack",
      });

    if (boardContent[position.y - 1][position.x - 1]?.color === "white")
      possibleMoves.push({
        y: position.y - 1,
        x: position.x - 1,
        type: "attack",
      });

    if (
      boardContent[position.y][position.x - 1]?.color === "white" &&
      boardContent[position.y][position.x - 1]?.enPassant
    )
      possibleMoves.push({
        y: position.y - 1,
        x: position.x - 1,
        type: "attack",
      });

    if (
      boardContent[position.y][position.x + 1]?.color === "white" &&
      boardContent[position.y][position.x + 1]?.enPassant
    )
      possibleMoves.push({
        y: position.y - 1,
        x: position.x + 1,
        type: "attack",
      });
  }

  return possibleMoves;
};

PiecesMoves.bishopMoves = (boardContent, position, color) => {
  let possibleMoves = [];
  for (let i = 0; i < 4; i++) {
    let flag;
    switch (i) {
      case 0:
        flag = true;
        for (
          let j = { y: position.y + 1, x: position.x + 1 };
          j.x < 8 && j.y < 8 && flag;
          j = { y: j.y + 1, x: j.x + 1 }
        ) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      case 1:
        flag = true;
        for (
          let j = { y: position.y + 1, x: position.x - 1 };
          j.x > -1 && j.y < 8 && flag;
          j = { y: j.y + 1, x: j.x - 1 }
        ) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      case 2:
        flag = true;
        for (
          let j = { y: position.y - 1, x: position.x - 1 };
          j.x > -1 && j.y > -1 && flag;
          j = { y: j.y - 1, x: j.x - 1 }
        ) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      case 3:
        flag = true;
        for (
          let j = { y: position.y - 1, x: position.x + 1 };
          j.x < 8 && j.y > -1 && flag;
          j = { y: j.y - 1, x: j.x + 1 }
        ) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      default:
    }
  }
  return possibleMoves;
};

PiecesMoves.knightMoves = (boardContent, position, color) => {
  let possibleMoves = [];
  let offsets = [
    { y: 2, x: 1 },
    { y: 2, x: -1 },
    { y: 1, x: 2 },
    { y: -1, x: 2 },
    { y: -2, x: 1 },
    { y: -2, x: -1 },
    { y: -1, x: -2 },
    { y: 1, x: -2 },
  ];
  possibleMoves = offsets.map((offset) => {
    let moveY = position.y + offset.y,
      moveX = position.x + offset.x;
    if (moveY < 8 && moveY > -1 && moveX < 8 && moveX > -1) {
      if (!boardContent[moveY][moveX].piece)
        return { y: moveY, x: moveX, type: "move" };
      else if (boardContent[moveY][moveX].color !== color)
        return { y: moveY, x: moveX, type: "attack" };
    }
    return null;
  });
  return possibleMoves.filter((move) => move);
};

PiecesMoves.rookMoves = (boardContent, position, color) => {
  let possibleMoves = [];
  for (let i = 0; i < 4; i++) {
    let flag;
    switch (i) {
      case 0:
        flag = true;
        for (let j = { y: position.y + 1, x: position.x }; j.y < 8 && flag; j.y++) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      case 1:
        flag = true;
        for (let j = { y: position.y - 1, x: position.x }; j.y > -1 && flag; j.y--) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      case 2:
        flag = true;
        for (let j = { y: position.y, x: position.x + 1 }; j.x < 8 && flag; j.x++) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      case 3:
        flag = true;
        for (let j = { y: position.y, x: position.x - 1 }; j.x > -1 && flag; j.x--) {
          if (!boardContent[j.y][j.x].piece)
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "move",
            });
          else if (boardContent[j.y][j.x].color !== color) {
            possibleMoves.push({
              y: j.y,
              x: j.x,
              type: "attack",
            });

            flag = false;
          } else flag = false;
        }
        break;
      default:
    }
  }
  return possibleMoves;
};

PiecesMoves.queenMoves = (boardContent, position, color) => {
  return PiecesMoves.bishopMoves(boardContent, position, color).concat(
    PiecesMoves.rookMoves(boardContent, position, color)
  );
};

PiecesMoves.kingMoves = (boardContent, position, color, castling) => {
  let possibleMoves = [];
  let offsets = [
    { y: 1, x: -1 },
    { y: 1, x: 0 },
    { y: 1, x: 1 },
    { y: -1, x: 1 },
    { y: -1, x: 0 },
    { y: -1, x: -1 },
    { y: 0, x: -1 },
    { y: 0, x: 1 },
  ];
  possibleMoves = offsets.map((offset) => {
    let moveY = position.y + offset.y,
      moveX = position.x + offset.x;
    if (moveY < 8 && moveY > -1 && moveX < 8 && moveX > -1) {
      if (!boardContent[moveY][moveX].piece)
        return { y: moveY, x: moveX, type: "move" };
      else if (boardContent[moveY][moveX].color !== color)
        return { y: moveY, x: moveX, type: "attack" };
    }
    return null;
  });

  // Castling checks
  if (
    castling &&
    !isCheck(boardContent, position, color)
  ) {
    if (boardContent[position.y][0].castling) {
      let squaresClear = true;
      for (let x = position.x - 1; x > 0 && squaresClear; x--)
        squaresClear = !boardContent[position.y][x].piece;

      if (
        squaresClear &&
        !isCheck(boardContent, { y: position.y, x: position.x - 1 }, color) &&
        !isCheck(boardContent, { y: position.y, x: position.x - 2 }, color)
      )
        possibleMoves.push({
          y: position.y,
          x: position.x - 2,
          rookX: 0,
          rookNewX: position.x - 1,
          type: "move",
          castling: true,
        });
    }

    if (boardContent[position.y][7].castling) {
      let squaresClear = true;
      for (let x = position.x + 1; x < 7 && squaresClear; x++)
        squaresClear = !boardContent[position.y][x].piece;

      if (
        squaresClear &&
        !isCheck(boardContent, { y: position.y, x: position.x + 1 }, color) &&
        !isCheck(boardContent, { y: position.y, x: position.x + 2 }, color)
      )
        possibleMoves.push({
          y: position.y,
          x: position.x + 2,
          rookX: 7,
          rookNewX: position.x + 1,
          type: "move",
          castling: true,
        });
    }
  }

  return possibleMoves.filter((move) => move);
};

export default PiecesMoves;
