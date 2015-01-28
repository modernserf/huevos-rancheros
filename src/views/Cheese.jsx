"use strict";
import React from 'react';
import {colors, addHoverStroke} from 'views/style'; 

var cheeseColors = [colors.gold, "orange", "white"];

var Cheese = React.createClass({
    getInitialState (){
        return {
            chunks: []
        };
    },
    componentWillMount () {
        var x, y;
        for (var i = 0; i < 100; i++) {
            x = ((i % 10) + Math.random() * 2) * 2;
            y = (Math.floor(i / 10) + Math.random() * 2) * 2;
            this.state.chunks[i] = {
                key: i,
                stroke: "none",
                fill: cheeseColors[Math.floor(Math.random() * 3)],
                width: 1 + Math.random() * 5,
                height: 0.5 + Math.random(),
                x: x,
                y: y,
                opacity: Math.random() + 0.5,
                transform: `rotate(${Math.random() * 90}, ${x},${y})`
            };
        }
    },
    render (){
        var chunks = this.state.chunks.map(x => <rect {...x}/>);

        return (
            <g transform="translate(-10,-10)">
                <rect {...addHoverStroke(this.props.isHover, {
                    fill: "transparent",
                    width: 20,
                    height: 20
                })}></rect>
                {chunks}
            </g>
        );
    }
});

export default Cheese;
