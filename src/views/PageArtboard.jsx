"use strict";

import React from 'react';
import EventStream from 'types/EventStream';
import Drag from 'views/Drag';
import ClickArea from 'views/ClickArea';
import MoveMode from 'views/MoveMode';
import InactiveMode from 'views/InactiveMode';
import Circle from 'views/Circle';

import {colors} from 'views/style';

const _t = React.PropTypes;

const flatcat = (arr) => arr instanceof Array ?
    arr.map(flatcat).join(' ') :
    String(arr);

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

const polarR = (a, b) => {
    const diff = sub(a, b);
    return Math.sqrt((diff[0] * diff[0]) + (diff[1] * diff[1]));
};

const offset = (pair, x) => add(pair, [-x,x]);

// const cursor = isGrabbing ? "-webkit-grabbing" : "-webkit-grab";
// style={{cursor: cursor}}

const { DragState, DragArea, Draggable } = Drag('g');

const ShowBezier = React.createClass({
    render () {
        const { x, y } = this.props;

        return (
            <g transform={`translate(${x||0},${y||0})`}>
                <path {...this.props}/>
            </g>
        );
    }
});

const DottedLine = React.createClass({
    render () {
        const { s, e } = this.props;

        return <line x1={s[0]} y1={s[1]} x2={e[0]} y2={e[1]}
            strokeDasharray="5,5" stroke="gray"/>;
    }
});

const AddBezier = React.createClass({
    getInitialState (){
        return {
            pathData: [],
            isCreating: false,
            dragState: DragState.create()
        };
    },
    parsePathData (data){
        if (!data.length){ return ""; }

        const last = data[data.length - 1];
        const start = ['M', last[3]];
        const d = flatcat([start].concat(data)) + " Z";
        return d;
    },
    addPoint (x,y,e) {
        const point = [x,y];

        const cmd = ['C', offset(point,-20), offset(point,20),point];
        const pathData = this.state.pathData.concat([cmd]);

        this.setState({
            isCreating: true,
            pathData: pathData
        });
    },
    deletePoint (cmd) {
        const { pathData } = this.state;
        this.setState({
            pathData: pathData.filter(c => c !== cmd)
        });
    },
    dragPoint (params) {
        const { isAnchor, id, pos, x, y } = params;
        const { pathData } = this.state;

        // if anchor point move all points together
        if (isAnchor) {
            const diff = sub([x,y],pathData[id][pos + 1]);
            pathData[id] = [pathData[id][0]].concat(
                pathData[id].slice(1).map(p => add(p, diff))
            );

        // if control point move just control point
        } else {
            pathData[id][pos + 1] = [x, y];
        }

        this.forceUpdate();
    },
    render (){
        const { data, width, height, onAdd } = this.props;
        const { isCreating, dragState, pathData } = this.state;

        const style = { stroke: "black", fill: "transparent" };
        const path = this.parsePathData(pathData);

        const preview = isCreating && (
            <ShowBezier d={path} style={style}/>
        );

        const commands = pathData.map((cmd,id) => {
            const [type, ...points] = cmd;

            const pointTags = points.map((p,pos) => {
                const [x,y] = p;

                const color = pos === 2 ? "red" : "blue";

                return (
                    <Draggable key={pos} dragState={dragState}
                        x={x} y={y}
                        onDragStart={(_x,_y,e)=> {
                            if (e.shiftKey){
                                this.deletePoint(cmd);
                            }
                        }}
                        onDrag={(_x,_y,e)=> this.dragPoint({
                            isAnchor: pos === 2,
                            id: id,
                            pos: pos,
                            x: _x,
                            y: _y,
                            event: e
                        })}>
                        <circle r={5} fill={color}/>
                    </Draggable>
                );
            });

            const lines = points.length > 1 ?
                <g>
                    <DottedLine s={points[0]} e={points[2]}/>
                    <DottedLine s={points[1]} e={points[2]}/>
                </g> :
                null;

            return (
                <g key={id}>
                    <g>{lines}</g>
                    <g>{pointTags}</g>
                </g>
            );
        });

        const commit = (e) => {
            onAdd({ element: Bezier, props: {
                d: path,
                style: style
            }});
            this.setState({
                isCreating: false,
                pathData: []
            });
        };

        return (
            <g>
                <InactiveMode width={width} height={height} data={data}/>
                {preview}
                <DragArea dragState={dragState}
                    width={width} height={height}>
                    <ClickArea width={width} height={height}
                        onClick={(x,y,e) => this.addPoint(x,y,e)}/>
                    {commands}
                </DragArea>
                <text y={height} onClick={commit}>Commit</text>
            </g>
        );
    }
});

const Bezier = {
    show: ShowBezier,
    add: AddBezier
};

const ModeSelector = React.createClass({
    render () {
        const { onChange } = this.props;
        const modes = [
            ['Move', MoveMode],
            ['Circle', Circle.add],
            ['Path',Bezier.add],
        ];

        const style = {
            position: "fixed",
            top: 0,
            left: 0,
        };

        return (
            <div style={style}>
                {modes.map(m => <button key={m[0]}
                    style={{display: "block"}}
                    onClick={e => onChange(m[1])}>
                    {m[0]}
                </button>)}
            </div>
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
            mode: MoveMode
        };
    },
    render () {
        const { data, mode: Mode } = this.state;
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

        const onAdd = (newElement) => {
            data.push(newElement);
            this.forceUpdate();
        };

        return (
            <div style={container}>
                <ModeSelector onChange={m => this.setState({mode: m})}/>
                <svg style={artboard}>
                    <Mode width={width} height={height} data={data}
                        onChange={onChange} onAdd={onAdd}/>
                </svg>
            </div>
        );
    }
});

export default Artboard;
