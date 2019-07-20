import React, {Component} from "react";
import Cell from './Cell';
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: false,
    }

    this.flipCellsAroundMe = this.flipCellsAroundMe.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];

    // TODO: create array-of-arrays of true/false values
    for (let row = 0; row < this.props.nRows; row++) {
      const currentRow = Array(this.props.nCols).fill(null).map(() => {
        return Math.random() < this.props.chanceLightStartsOn ?
          true
          :
          false;
      });

      board.push(currentRow);
    }

    return board;
  }

  renderBoard() {
    return (
      <>
        <table
          className={ `Board` }
        >
          <tbody>
          {
            this.state.board.map((row, rowIndex) => {
              return (
                <tr
                  key={ rowIndex }
                >
                {
                  row.map((isLit, colIndex) => {
                    return (
                      <Cell 
                        key={ `${rowIndex}-${colIndex}` }
                        flipCellsAroundMe={ () => this.flipCellsAroundMe(rowIndex, colIndex) }
                        isLit={ isLit }
                      /> 
                    );
                  })
                }
                </tr>
              );  
            })
          }
          </tbody>
        </table>
        { this.renderRestartButton() }
      </>
    );
  }

  renderRestartButton() {
    return (
      <button
        onClick={ this.handleRestart }
      >
        Restart
      </button>
    )
  }

  handleRestart() {
    this.setState({
      board: this.createBoard(),
      hasWon: false,
    });
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAroundMe(row, col) {
    // TODO: flip this cell and the cells around it
    const { nRows, nCols } = this.props;
    
    function validRow(row) {
      return row >= 0 && row < nRows;
    }
    
    function validCol(col) {
      return col >= 0 && col < nCols;
    }
    
    // if this cell is actually on board, flip it
    const board = this.state.board;
    function flipCell({ row, col }) {
      if (validRow(row) && validCol(col)) {
        board[row][col] = !board[row][col];
      }
    }
      
    const current = { row, col };
    flipCell(current);

    const above = { row: row - 1, col };
    flipCell(above);

    const below = { row: row + 1, col };
    flipCell(below);

    const left = { row, col: col - 1 };
    flipCell(left);

    const right = { row, col: col + 1 };
    flipCell(right);

    // TODO: determine is the game has been won
    // win when every cell is turned off
    const hasWon = board.every((row) => {
      return row.every((isLit) => {
        return !isLit;
      });
    });

    this.setState({
      board,
      hasWon,
    });
  }

  matchCoordinates(first, second) {
    return first.rowIndex === second.rowIndex &&
           first.colIndex === second.colIndex;
  }

  /** Render game board or winning message. */
  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return (
        <>

          <section
            className='container'
          >
            <span
              className='neon-win-orange'
            >
              You
            </span>
            <span
              className = 'neon-win-blue'
            >
              Win!
            </span>
          </section>
          { this.renderRestartButton() }
        </>
      );
    }

    // TODO

    // make table board

    // TODO
    return this.renderBoard();
  }
}

export default Board;