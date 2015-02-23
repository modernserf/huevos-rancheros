"use strict";

import React from 'react';
import MoveMode from 'views/MoveMode';
import Circle from 'views/Circle';
import Bezier from 'views/Bezier';

import {colors} from 'views/style';

const _t = React.PropTypes;

const ModeSelector = React.createClass({
    render () {
        const { data, onChange } = this.props;
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
                    style={{
                        display: "block",
                        color: data === m[1] ? "red" : "black"
                    }}
                    onClick={e => onChange(m[1])}>
                    {m[0]}
                </button>)}
            </div>
        );
    }
});

const ColorPicker = React.createClass({
    render (){
        const { data, onChange } = this.props;

        const cl = ['transparent', 'black'].concat(
            Object.keys(colors).map(k => colors[k])
        );

        const getStyle =  (c, type) => ({
            width: 20,
            height: 20,
            cursor: "pointer",
            backgroundColor: c,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: data[type] === c ? "red" : "white"
        });

        const rows = cl.map(c => {
            return (
                <tr key={c}>
                    <td style={getStyle(c,'stroke')}
                        onClick={e => onChange({stroke: c})}>&nbsp;</td>
                    <td style={getStyle(c,'fill')}
                        onClick={e => onChange({fill: c})}>&nbsp;</td>
                </tr>
            );
        });

        return (
            <table style={{backgroundColor: "white"}}><tbody>
                {rows}
            </tbody></table>
        );

    }
});

const Artboard = React.createClass({
    getInitialState (){
        return {
            data : [],
            mode: MoveMode,
            style: {
                stroke: 'black',
                fill: 'transparent'
            }
        };
    },
    render () {
        const { data, mode: Mode, style } = this.state;
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
                <ModeSelector data={Mode}
                    onChange={m => this.setState({mode: m})}/>
                <svg style={artboard}>
                    <Mode width={width} height={height} data={data}
                        style={style}
                        onChange={onChange} onAdd={onAdd}/>
                </svg>
                <div style={{
                    position: "fixed",
                    top: 0,
                    right: 20,
                }}>
                    <ColorPicker data={style}
                        onChange={s => this.setState(
                            {style: Object.assign(style,s)})}/>
                </div>
            </div>
        );
    }
});

export default Artboard;
