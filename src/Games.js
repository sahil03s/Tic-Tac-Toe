import './styles.css';
import {useState} from 'react';

function Square({value, onSquareClick})
{
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Games() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState('X');
    const [moves, setMoves] = useState(0);
    const [status, setStatus] = useState('Next Player : ' + turn);
    
    function checkWinner(board){
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
    
        for(let i=0; i<lines.length; i++)
        {
            const [a,b,c] = lines[i];
            if(board[a] === board[b] && board[a] === board[c])
                return board[a];
        }

        return null;
    }



    function handleClick(i){
        if(board[i] || checkWinner(board))
            return;
        
        let temp = [...board];
        temp[i] = turn;
        setMoves(moves+1);

        let winner = checkWinner(temp);
        
        if(winner === null)
        {
            if(moves === 8)
                setStatus("Match Draw");
            else
                setStatus('Next Player : ' + (turn==='X'?'O':'X'));
        }
        else
            setStatus('Winner : ' + winner);

        setBoard(temp);

        (turn === 'X')?setTurn('O'):setTurn('X');
        
    } 

    function reset()
    {
        setBoard(Array(9).fill(null));
        setMoves(0);
        setTurn('X');
        setStatus('Next Player : X');
    }

    
    
    return (
        <div className='App'>
        <h1 className='heading'>Tic Tac Toe</h1>
        <h2>{status}</h2>
        <div>
            <div>
            <Square value={board[0]} onSquareClick = {() => handleClick(0)} />
            <Square value={board[1]} onSquareClick = {() => handleClick(1)} />
            <Square value={board[2]} onSquareClick = {() => handleClick(2)} />
            </div>
            <div>
            <Square value={board[3]} onSquareClick = {() => handleClick(3)} />
            <Square value={board[4]} onSquareClick = {() => handleClick(4)} />
            <Square value={board[5]} onSquareClick = {() => handleClick(5)} />
            </div>
            <div>
            <Square value={board[6]} onSquareClick = {() => handleClick(6)} />
            <Square value={board[7]} onSquareClick = {() => handleClick(7)} />
            <Square value={board[8]} onSquareClick = {() => handleClick(8)} />
            </div>
        </div>
        <button className='button' onClick={reset}>Restart Game</button>
      </div>
    );
}

export default Games;