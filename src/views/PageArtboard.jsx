"use strict";

import React from 'react';
import EventStream from 'types/EventStream';
import Drag from 'views/Drag';

import {colors} from 'views/style'; 

const _t = React.PropTypes;

const flatcat = (arr) => arr instanceof Array ?
    arr.map(flatcat).join(' ') :
    String(arr);

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const offset = (pair, x) => add(pair, [-x,x]);

// const cursor = isGrabbing ? "-webkit-grabbing" : "-webkit-grab";
// style={{cursor: cursor}}

const { DragState, DragArea, Draggable } = Drag('g');

const Point = React.createClass({
    render () {
        var { x, y, onClick, id, pos } = this.props;

        const color = pos === 2 ? "red" : "blue";

        return <g transform={`translate(${x},${y})`}
            onMouseDown={e => onClick(e,id,pos)}
            onMouseUp={e => onClick(e, null,null)}>
            <circle r={5} fill={color}/>
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

const Path = React.createClass({
    render (){
        const { data, style } = this.props;

        if (data.length < 2){ return null; }

        const last = data[data.length - 1];

        const start = ['M', last[3]];

        const d = flatcat([start].concat(data)) + " Z";

        return (
            <path d={d} style={style}/>
        );
    }
});



const EditPath = React.createClass({
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
    addPoint(e){
        let { data } = this.state;

        const point = [e.clientX, e.clientY];

        const cmd = ['C', offset(point,-20), offset(point,20),point];

        data.push(cmd);

        this.forceUpdate();
    },
    render () {
        const { data, onClick } = this.props;

        const commands = data.map((x,id) => {

            const [type, ...points] = x;

            const pointTags = points.map((p,pos) => {
                const [x,y] = p;

                return (
                    <Point key={pos} x={x} y={y} id={id} pos={pos}
                        onClick={onClick.point}/>
                );
            });

            const lines = points.length > 1 ?
                <g>
                    <Line s={points[0]} e={points[2]}/>
                    <Line s={points[1]} e={points[2]}/>
                </g> : 
                null;

            return (
                <g key={id}>
                    <g>{lines}</g>
                    <g>{pointTags}</g>
                </g>
                
            );
        });

        const scale = 0.98;
        const innerPath = `matrix(${scale},0,0,${scale},2,2)`;

        return (
            <g>
                <Path data={data}  style={{fill: "transparent", stroke: "black"}}/>

                <g onClick={onClick.default} transform={innerPath}>
                    <Path data={data}  style={{fill: "transparent", stroke: "none"}}/>
                </g>
                
                <g>{commands}</g>
            </g>
        );
    }
});

const Circle = React.createClass({
    render () {
        const { x, y } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <circle {...this.props}/>
            </g>
        );
    }
});


const InactiveMode = React.createClass({
    render () {
        const { data , width, height } = this.props;

        const items = data.map((it,index) => {
            const Element = it.element;

            return (
                <Element key={index} {...it.props}/>
            );
        });

        return (
            <g>
                {items}
            </g>
        );
    }
});

const MoveMode = React.createClass({
    getInitialState (){
        const dragState = DragState.create();

        return {
            dragState: dragState
        };
    },
    render () {
        const { data, onChange, width, height } = this.props;
        const { dragState } = this.state;

        const items = data.map((it,index) => {
            const Element = it.element;

            return (
                <Draggable key={index} dragState={dragState}
                    onDrag={(x,y) => { onChange(it,{ x, y }); }}>
                    <Element {...it.props}/>
                </Draggable>
            );
        });

        return (
            <DragArea dragState={dragState} width={width} height={height}>
                {items}
            </DragArea>
        );
    }
});

const Artboard = React.createClass({
    getInitialState (){
        return {
            data : [
                {element: Circle, props: {
                    fill: colors.gold,
                    x: 100,
                    y: 100,
                    r: 30
                }}
            ],
        };
    },
    render () {
        const { data, eggX, eggY, dragState } = this.state;
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
            display: "block",
            marginLeft: 100
        };

        const onChange = (x, props) => {
            const item = data.find(it => it === x);
            if (item){
                Object.assign(item.props,props);
                this.forceUpdate();
            }
        };

        const Mode = InactiveMode;

        // const onClick = {
        //     point: (e, id, pos) => this.onClickPoint(e,id, pos),
        //     default: (e) => this.addPoint
        // };

        return (
            <div style={container}>
                <svg style={artboard}>
                    <Mode width={width} height={height} data={data} onChange={onChange}/>
                        {/*<rect width={width} height={height} fill="transparent"
                            onClick={this.addPoint}/>*/}

                        {/*<EditPath data={data} onClick={onClick}/>*/}                    
                </svg>
            </div>
        );
    }
});

export default Artboard;
