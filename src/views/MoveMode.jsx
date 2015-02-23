"use strict";

import React from 'react';
import Drag from 'views/Drag';

const { DragState, DragArea, Draggable } = Drag('g');

const MoveMode = React.createClass({
    getInitialState (){
        return {
            dragState: DragState.create()
        };
    },
    render () {
        const { data, onChange, width, height } = this.props;
        const { dragState } = this.state;

        const items = data.map((it,index) => {
            const Element = typeof it.element === "string" ?
                it.element :
                it.element.show;

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

export default MoveMode;
