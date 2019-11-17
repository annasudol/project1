
import React, { Component } from 'react';
import Column from './Column';
const MAX_X = 10;
const MAX_Y = 10;
const COLOURS = ['red', 'green', 'blue', 'yellow'];


class Grid extends Component {
  state={
    grid: [],
    blocksToDelete: [],
    i: 0,
  }

  componentDidMount() {
    let col =[]

    for (let y = 0; y < MAX_Y; y++) {
      const row =[]
      col.push(row);
      for (let x = 0; x < MAX_X; x++) {
        const color = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        const id =`${x},${y}`;
        row.push({id, color})
      }
  }
    this.setState({ grid: col})
  }
  deleteArr=()=>{
    console.log("filteredDuplicates");
  }

  filterDuplicates=(block)=>{
    const { blocksToDelete } = this.state;
    blocksToDelete.filter(item=> item.x !== block.x && item.y!== block.y)
  }
  checkNearestBlocks=(id)=>{
    const { grid } = this.state;
    let indexRow;
    let indexCol;
    for(let i = 0; i < grid.length; i++){
      const col = grid[i];
      for(let j = 0; j < col.length; j++){
        const row = col[j];
        if(row.id === id) {
          indexRow = j
          indexCol= i;
        }
      }
    }
    let blocks = this.findBlocks({x: indexRow, y: indexCol})
    while( blocks.length > 0 ) {
      for(let i = 0; i < blocks.length; i++){
        const x = blocks[i].x;
        const y = blocks[i].y;
        blocks = this.findBlocks({x, y});
        this.findBlocks({x, y});
      }
    }
  }

 findBlocks=({x, y})=> {
  const { grid, blocksToDelete } = this.state;

    let sameColorBlocks = []
    const color = grid[y][x].color;
    const rightBlockColor = y + 1 < MAX_Y && grid[y + 1][x].color;
    const leftBlockColor= y - 1 >= 0 && grid[y - 1][x].color;
    const bottomBlockColor = x + 1 < MAX_X && grid[y][x + 1].color;
    const upBlockColor = x - 1 >= 0 && grid[y][x - 1].color;
    sameColorBlocks.push({x, y})

    color === rightBlockColor && !sameColorBlocks.includes({x, y: y + 1}) && sameColorBlocks.push({x, y: y + 1});
    color === leftBlockColor && !sameColorBlocks.includes({x, y: y - 1}) && sameColorBlocks.push({x, y: y - 1});
    color === bottomBlockColor && !sameColorBlocks.includes({x: x + 1, y}) && sameColorBlocks.push({x: x + 1, y});
    color === upBlockColor && !sameColorBlocks.includes({x: x - 1, y}) && sameColorBlocks.push({x: x - 1, y});

    const newBlocks = sameColorBlocks.filter(block =>!blocksToDelete.includes(block));
    this.setState({blocksToDelete: [...this.state.blocksToDelete, ...newBlocks]});
    this.setState({i: this.state.i + 1});
    // eslint-disable-next-line no-unused-expressions
    // newBlocks.length > 0 && newBlocks.forEach(block=> this.findBlocks({x: block.x, y: block.y}));

    return newBlocks;
  }

  render() {
    const { grid, blocksToDelete, i } = this.state;
    console.log(blocksToDelete, i);
    


    return(
      <div className="grid">
        {grid.map((col, i)=> {
          return <Column key={i} col={col} checkNearestBlocks={this.checkNearestBlocks}/>
        })}
      </div>
    );

  }
}

export default Grid;