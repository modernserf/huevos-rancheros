"use strict";
import React from 'react';
import {colors, addHoverStroke} from 'views/style'; 

var ptc = function (radius, theta){
    return [
        radius * Math.cos(theta),
        radius * Math.sin(theta)
    ];
};

var Egg = React.createClass({
    eggPath: "",
    yoke: {},
    componentWillMount (){
        var p = [];

        var bz = function (i, j, k){
            return `C ${p[i][0]} ${p[i][1]}, ${p[j][0]} ${p[j][1]}, ${p[k][0]} ${p[k][1]} `;
        };

        var points = (11 + Math.floor(Math.random() * 10)) * 3;

        for (var i = 0; i <= points; i++) {
            p[i] = ptc(12 + Math.random() * 5, (2 * Math.PI * (i / points)));
        }
        this.eggPath = `M ${p[0][0]} ${p[0][1]} `;

        for (i = 0; i < points; i += 3){
            this.eggPath += bz(i+1,i+2, i+3 % points);    
        }

        this.eggPath += " Z";
        this.yoke = {
            r: 4 + Math.random() * 2,
            cx: Math.random() * 10 - 5,
            cy: Math.random() * 10 - 5
        };
    },
    render (){
        var { data, isHover } = this.props;

        var opacity = data ? (data.cook || 0) + 0.5 : 1;
        var borderOpacity = data && data.cook && data.cook > 0.5 ?
            data.cook * 2 - 0.5 : 0;

        return (
            <g>
                <path {...addHoverStroke(isHover,{
                    r: 15, fill: "white", opacity: opacity,
                    stroke: "white"
                })} d={this.eggPath}/>
                <path d={this.eggPath} fill="none" stroke={colors.brown}
                    opacity={borderOpacity}/>
                <circle {...this.yoke} fill="white"/>
                <circle {...this.yoke} fill={colors.gold} opacity={0.8}/>
            </g>
        );
    }
});

export default Egg;
