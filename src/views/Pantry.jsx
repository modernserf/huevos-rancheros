"use strict";
import React from 'react';
import GlobalAtom from 'mixins/GlobalAtom';
import {Flex, FlexBox} from 'views/FlexBox';

import Egg from 'views/Egg';
import Tomato from 'views/Tomato';

export var PantryButton = React.createClass({
    onClick (e){
        this.props.onClick(this.props.item);
    },
    render (){
        var Component = this.props.item;

        return (
            <button onClick={this.onClick}>
                <svg viewBox="0 0 50 50" style={{
                    width: 100,
                    height: 100,
                    display: "block"
                }}>
                    <g transform={"translate(25,25)"}><Component /></g>
                </svg>
                {Component.displayName}
            </button>
        ); 
    }
});

export var Pantry = React.createClass({
    mixins: [GlobalAtom],
    onClick (component){
        var ings = this.getGlobal('ingredients');

        var next = {
            id: this.gensym(), 
            component: component,
            x: 25 + Math.random() * 50,
            y: 25 + Math.random() * 50
        };

        this.setGlobal('ingredients', ings.concat([next]));
    },
    render (){
        return (
            <FlexBox>
                <Flex>
                    <PantryButton item={Egg} onClick={this.onClick}/>
                </Flex>
                <Flex>
                    <PantryButton item={Tomato} onClick={this.onClick}/>
                </Flex>
            </FlexBox>
        );
    }
});

export default Pantry;