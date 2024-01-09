import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const initialBoard = Array(9).fill(null);

const Xcomp = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  useEffect(() => {
    if (isSinglePlayer && !isXNext) {
      setTimeout(computerMove, 500);
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || checkWinner() || checkDraw()) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const computerMove = () => {
    const emptySquares = board.reduce((acc, value, index) => {
      if (!value) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptySquares.length === 0) {
      return; // No available moves
    }

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const computerMoveIndex = emptySquares[randomIndex];

    handleClick(computerMoveIndex);
  };

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        Alert.alert(`${board[a]} wins!`, 'Restart the game?', [
          { text: 'Yes', onPress: resetGame },
        ]);
        return true;
      }
    }

    return false;
  };

  const checkDraw = () => {
    if (board.every((square) => square)) {
      Alert.alert("It's a draw!", 'Restart the game?', [
        { text: 'Yes', onPress: resetGame },
      ]);
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => {
        handleClick(index);
        if (isSinglePlayer) {
          setTimeout(computerMove, 500);
        }
      }}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.start}>
        <Text style={styles.startTxt}>Start Game vs Computer</Text>
      </View>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
  },
  start: {
    width: '100%',
    alignItems: 'center',
    marginBottom: '10%',
    paddingBottom: '10%',
  },
  startTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  board: {
    borderWidth: 1,
    width: '80%',
    backgroundColor: '#ddd111',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '70%',
  },
  squareText: {
    fontSize: 36,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'darkblue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Xcomp;
