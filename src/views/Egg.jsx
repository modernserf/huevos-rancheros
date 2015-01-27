"use strict";
import React from 'react';
import {colors, addHoverStroke} from 'views/style'; 

var Egg = React.createClass({
    render (){
         return (
            <g>
                <circle {...addHoverStroke(this.props.isHover,{
                    r: 15, fill: "white"
                })}/>
                <circle r={7} fill={colors.gold} 
                    style={{opacity:0.5}}/>
            </g>
        );
    }
});

export default Egg;
