import React, { Component } from 'react'

export default class Block extends Component {

  handleClick=(id)=>{
    // const id=e.target.id;
    // const x = id && parseInt(id.charAt(0), 10);
    // const y = id && parseInt(id.charAt(2), 10);
    this.props.checkNearestBlocks(id);
  }
  render() {
    const { row } = this.props;
    return (
        <div style={{backgroundColor: row.color}} id={row.id} className="block" onClick={()=>this.handleClick(row.id)}>
          <p>{`x:${row.id.charAt(0)},y:${row.id.charAt(2)}`}</p>
        </div>
    )
  }
}
