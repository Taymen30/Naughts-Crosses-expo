import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
interface Score {
  X: number;
  O: number;
  draw: number;
}

export default function Grid({ playerType }) {
  const [selectedXIds, setSelectedXIds] = useState([]);
  const [selectedOIds, setSelectedOIds] = useState([]);
  const [moveCount, setMoveCount] = useState(1);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draw: 0 });
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([]);

  function handleComputerMove(xMoves: Number[]) {
    let randomMove = Math.floor(Math.random() * 9) + 1;
    while (xMoves.includes(randomMove) || selectedOIds.includes(randomMove)) {
      randomMove = Math.floor(Math.random() * 9) + 1;
    }
    const newOIds = [...selectedOIds, randomMove];
    setSelectedOIds(newOIds);
    determineWinner(newOIds, "O");
    setMoveCount((prev) => prev + 1);
  }

  function handlePress(id: Number) {
    if (playerType === "player") {
      if (moveCount % 2 === 0) {
        const newXIds = [...selectedXIds, id];
        setSelectedXIds(newXIds);
        determineWinner(newXIds, "X");
      } else {
        const newOIds = [...selectedOIds, id];
        setSelectedOIds(newOIds);
        determineWinner(newOIds, "O");
      }
      setMoveCount((prev) => prev + 1);
    } else if (playerType === "computer") {
      if (moveCount % 2 === 1) {
        const newXIds = [...selectedXIds, id];
        setSelectedXIds(newXIds);
        determineWinner(newXIds, "X");

        if (determineWinner(newXIds, "X")) return;
        setMoveCount((prev) => prev + 1);

        if (moveCount !== 9) {
          setIsComputerThinking(true);
          setTimeout(() => {
            handleComputerMove(newXIds);
            setIsComputerThinking(false);
          }, 1500);
        }
      }
    }
  }

  function determineWinner(moves: Number[], player: "X" | "O" | "Draw") {
    const winningCombinations = [
      [1, 3, 5, 7, 9],
      [1, 2, 3, 6, 9],
      [2, 3, 5, 7, 8],
      [1, 4, 5, 6, 9],
      [3, 5, 6, 8, 9],
      [1, 2, 5, 6, 9],
      [1, 2, 5, 8, 9],
      [3, 4, 5, 6, 7],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (let combo of winningCombinations) {
      if (combo.every((position) => moves.includes(position))) {
        setWinner(player);
        setScore((prevScore) => ({
          ...prevScore,
          [player]: prevScore[player] + 1,
        }));
        setWinningNumbers(combo);
        return player;
      }
    }

    if (moveCount === 9 && !winner) {
      setScore((prevScore) => ({
        ...prevScore,
        draw: prevScore.draw + 1,
      }));
      setWinner("Draw");
      return "Draw";
    }
    return null;
  }

  function handleReset() {
    setSelectedOIds([]);
    setSelectedXIds([]);
    setWinningNumbers([]);
    setMoveCount(1);
    setWinner(null);
  }

  return (
    <View style={styles.gridContainer}>
      {[...Array(9).keys()].map((i) => {
        const id = i + 1;
        const isXSelected = selectedXIds.includes(id);
        const isOSelected = selectedOIds.includes(id);
        const isWinningNumber = winningNumbers.includes(id);

        return (
          <TouchableOpacity
            key={id}
            style={[
              styles.square,
              isXSelected && styles.selectedXSquare,
              isOSelected && styles.selectedOSquare,
              isWinningNumber && styles.winningSquare,
            ]}
            onPress={() => handlePress(id)}
            disabled={
              isXSelected ||
              isOSelected ||
              winner !== null ||
              isComputerThinking
            }
          >
            {isXSelected && (
              <Image
                style={styles.selectorImage}
                source={require("../assets/X.png")}
              />
            )}
            {isOSelected && (
              <Image
                style={styles.selectorImage}
                source={require("../assets/O.png")}
              />
            )}
          </TouchableOpacity>
        );
      })}
      <View>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text>Reset Board</Text>
        </TouchableOpacity>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Scores</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>X:</Text>
            <Text style={styles.scoreValue}>{score.X}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>O:</Text>
            <Text style={styles.scoreValue}>{score.O}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Draws:</Text>
            <Text style={styles.scoreValue}>{score.draw}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  square: {
    width: "30%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#e6e6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedXSquare: {
    backgroundColor: "lightblue",
  },
  selectedOSquare: {
    backgroundColor: "lightcoral",
  },
  selectorImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    alignItems: "center",
  },
  winningSquare: {
    backgroundColor: "gold",
    borderColor: "yellow",
  },
  bottomSection: {
    flexDirection: "row",
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  scoreValue: {
    fontSize: 16,
  },
});
