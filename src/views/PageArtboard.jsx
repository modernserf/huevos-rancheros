"use strict";

import React from 'react';
import MoveMode from 'views/MoveMode';
import Circle from 'views/Circle';
import Bezier from 'views/Bezier';

import {colors} from 'views/style';

const _t = React.PropTypes;

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
