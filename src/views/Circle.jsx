"use strict";

import React from 'react';
import Drag from 'views/Drag';
import { polarR } from 'types/Vector';

import InactiveMode from 'views/InactiveMode';

const { DragState, DragArea, Draggable } = Drag('g');

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

const AddCircle = React.createClass({
    getInitialState (){
        return {
            newItemProps: {x: 0, y: 0, r: 0},
            isCreating: false,
            dragState: DragState.create()
        };
    },
    render () {
        const { data, width, height, onAdd } = this.props;
        const { isCreating, dragState } = this.state;
        let { newItemProps } = this.state;

        const dragNew = {
            props: {},
            onDragStart: (x,y, e) => {
                newItemProps = { x: x , y: y, r: 1, fill: "blue"};

                this.setState({
                    newItemProps: newItemProps,
                    isCreating: true
                });
            },
            onDrag: (x, y, e) => {
                const {x: _x, y: _y} = newItemProps;
                newItemProps.r = polarR([_x,_y],[x,y]);
                this.setState({newItemProps: newItemProps});
            },
            onDragEnd: (x, y, e) => {
                this.setState({
                    newItemProps: {x: 0, y: 0, r: 0},
                    isCreating: false
                });
                onAdd({ element: CircleElement, props: newItemProps });
            }
        };

        const preview = isCreating && (
            <Circle {...newItemProps}/>
        );

        return (
            <g>
                <InactiveMode width={width} height={height} data={data}/>
                
                <DragArea dragState={dragState} dragNew={dragNew}
                    width={width} height={height}>
                    {preview}
                </DragArea>
            </g>
        );
    }
});

const CircleElement = {
    show: Circle,
    add: AddCircle
};

export default CircleElement;
