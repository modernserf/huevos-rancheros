"use strict";

import React from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

const flatcat = (arr) => {
    if (arr instanceof Array){
        return arr.map(flatcat).join(' ');
    } else {
        return String(arr);
    }
};

const Point = React.createClass({
    render () {
        var { x, y, onClick, id, pos } = this.props;

        return <g transform={`translate(${x},${y})`}
            onMouseDown={e => onClick(id,pos)}
            onMouseUp={e => onClick(null,null)}>
            <circle r={3} fill="red"/>
        </g>;
    }
});

const Artboard = React.createClass({
    getInitialState (){
        return {
            data : [
                ['M', [10,10]],
                ['C', [0,0],[20,20],[10,30]],
                ['C', [5,5],[25,25],[30,30]],
                ['C', [0,5],[35,35],[30,10]],
            ],
            movingID: null,
            movingPos: null
        };
    },
    onMove (e){
        const { data, movingID, movingPos } = this.state;

        if (movingID === null){ return; }

        const nextPos = [e.clientX, e.clientY];

        data[movingID][movingPos + 1] = nextPos;

        this.forceUpdate();
    },
    onClick (id, pos){
        this.setState({
            movingID: id,
            movingPos: pos
        });
    },
    render () {
        const { data } = this.state;
        const width = 600;
        const height = 400;

        const container = {
            backgroundColor: "#000",
            height: 1000
        };

        const artboard = {
            width: width,
            height: height,
            backgroundColor: "#fff",
            display: "block"
        };

        const path = flatcat(data) + " Z";

        const commands = data.map((x,id) => {

            const [type, ...points] = x;

            const pointTags = points.map((p,pos) => {
                const [x,y] = p;

                return (
                    <Point x={x} y={y} id={id} pos={pos}
                        onClick={this.onClick}/>
                );
            });

            return (
                <g>{pointTags}</g>
            );
        });

        return (
            <div style={container} onMouseMove={this.onMove}>
                <svg style={artboard}>
                    <path d={path} fill="white" stroke="black"/>
                    <g>{commands}</g>
                </svg>
            </div>
        );
    }
});

export default Artboard;
