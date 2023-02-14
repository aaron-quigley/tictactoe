const gameBoard = (() => {
	let boardState = ["", "", "", "", "", "", "", "", ""];
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
	const updateBoard = (index, marker) => {
		if (index > 8 || index < 0) return;
		boardState[index] = marker;
	};
	const getBoard = () => {
		return boardState;
	};

	const resetBoard = () => {
		boardState = ["", "", "", "", "", "", "", "", ""];
	};

	return { updateBoard, getBoard, resetBoard, winPatterns };
})();

const Player = (marker) => {
	return { marker };
};

const displayController = (() => {
	const fields = document.querySelectorAll(".field");
	const message = document.querySelector(".turn");
	const restartButton = document.querySelector("#startOver");

	fields.forEach((field) => {
		field.addEventListener("click", (e) => {
			if (!gameBoard.getBoard()[e.target.getAttribute("data-index")] && gameController.isOver === false) {
				gameController.playRound(e.target.getAttribute("data-index"));
				updateBoard();
			}
		});
	});

	const updateBoard = () => {
		const boardState = gameBoard.getBoard();
		for (let i = 0; i < 9; i++) {
			fields[i].innerText = boardState[i];
		}
	};

	const resetBoard = () => {
		fields.forEach((field) => (field.innerText = ""));
		gameBoard.resetBoard();
		gameController.resetRounds();
        gameController.isOver = false;
	};

	restartButton.addEventListener("click", resetBoard);
})();

const gameController = (() => {
	const player1 = Player("X");
	const player2 = Player("O");
	let round = 1;
	let isOver = false;

	const playRound = (field) => {
		gameBoard.updateBoard(field, getCurrentPlayer());
		checkWinner();
		round++;
	};

	const getCurrentPlayer = () => {
		return round % 2 === 1 ? player1.marker : player2.marker;
	};

	const resetRounds = () => (round = 1);

	const checkWinner = () => {
		const gameState = gameBoard.getBoard();
		const winner = gameBoard.winPatterns.filter((combination) => {
			return combination.every((index) => {
				return gameState[index] === getCurrentPlayer();
			});
		});
		if (winner[0]) {
            gameController.isOver = true;
			console.log(`Winner = ${gameState[winner[0][0]]}`);
		}
	};

	return { playRound, resetRounds, checkWinner, isOver };
})();