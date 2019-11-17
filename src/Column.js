import React, { Component } from 'react';
import Block from './Block';

class Column extends Component {
    render() {
        return (
            <div className="col">
                {this.props.col.map(row=> {
                    return <Block row={row} key={row.id} checkNearestBlocks={this.props.checkNearestBlocks} />
                })}
            </div>
        );
    }
}

export default Column;