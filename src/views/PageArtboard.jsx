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

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

const offset = (pair, x) => add(pair, [x,x]);

const Point = React.createClass({
    render () {
        var { x, y, onClick, id, pos } = this.props;

        const color = pos === 2 ? "red" : "blue";

        return <g transform={`translate(${x},${y})`}
            onMouseDown={e => onClick(e,id,pos)}
            onMouseUp={e => onClick(e, null,null)}>
            <circle r={2} fill={color}/>
        </g>;
    }
});

const Line = React.createClass({
    render () {
        const { s, e } = this.props;

        return <line x1={s[0]} y1={s[1]} x2={e[0]} y2={e[1]}
            strokeDasharray="5,5" stroke="gray"/>;
    }
});

const Artboard = React.createClass({
    getInitialState (){
        return {
            data : [],
            movingID: null,
            movingPos: null,
            isDeleteMode: false
        };
    },
    onMove (e){
        let { data, movingID, movingPos } = this.state;

        if (movingID === null){ return; }

        const nextPos = [e.clientX, e.clientY];

        if (movingPos === 2){ 
            let diff = sub(nextPos, data[movingID][3]);
            data[movingID][1] = add(diff, data[movingID][1]);
            data[movingID][2] = add(diff, data[movingID][2]);
        }

        data[movingID][movingPos + 1] = nextPos;

        this.forceUpdate();
    },
    onClickPoint (e, id, pos){
        const { data, isDeleteMode } = this.state;

        if (isDeleteMode){
            let nextData = data.slice(0, id)
                .concat(data.slice(id + 1));

            this.setState({
                data: nextData
            });

        } else {
            this.setState({
                movingID: id,
                movingPos: pos
            });   
        }
    },
    dispatchKey (e){
        if (e.shiftKey){
            this.setState({
                isDeleteMode: true
            });
        }

        if (e.keyCode === 27){
            this.setState({
                movingID: null,
                movingPos: null
            });
        }
    },
    onKeyUp (e){
        this.setState({
            isDeleteMode: false
        });
    },
    addPoint(e){
        let { data } = this.state;

        const point = [e.clientX, e.clientY];

        const cmd = ['C', offset(point,-5), offset(point,5),point];

        data.push(cmd);

        this.forceUpdate();
    },
    getPath (){
        const { data } = this.state;

        if (data.length < 2){ return ""; }

        const last = data[data.length - 1];

        const start = ['M', last[3]];

        return flatcat([start].concat(data)) + " Z";
    },
    render () {
        const { data, isDeleteMode } = this.state;
        const width = 600;
        const height = 400;

        const cursor = isDeleteMode ? "context-menu" : "default";

        const container = {
            backgroundColor: "#000",
            height: 1000,
            cursor: cursor
        };

        const artboard = {
            width: width,
            height: height,
            backgroundColor: "#fff",
            display: "block"
        };

        const path = this.getPath();

        const commands = data.map((x,id) => {

            const [type, ...points] = x;

            const pointTags = points.map((p,pos) => {
                const [x,y] = p;

                return (
                    <Point x={x} y={y} id={id} pos={pos}
                        onClick={this.onClickPoint}/>
                );
            });

            const lines = points.length > 1 ?
                <g>
                    <Line s={points[0]} e={points[2]}/>
                    <Line s={points[1]} e={points[2]}/>
                </g> : 
                null;

            return (
                <g>
                    <g>{lines}</g>
                    <g>{pointTags}</g>
                </g>
                
            );
        });

        const scale = 0.98;

        const innerPath = `matrix(${scale},0,0,${scale},2,2)`;

        return (
            <div tabIndex={1} style={container} onMouseMove={this.onMove}
                onKeyDown={this.dispatchKey}
                onKeyUp={this.onKeyUp}>
                <svg style={artboard}>
                    <rect width={width} height={height} fill="white"
                        onClick={this.addPoint}/>
                    <path d={path} fill="transparent" stroke="black"/>

                    <g onClick={this.addPoint} transform={innerPath}>
                        <path d={path} fill="transparent" stroke="none"/>
                    </g>
                    
                    <g>{commands}</g>
                </svg>
            </div>
        );
    }
});

export default Artboard;
