"use strict";

import React from 'react';
import EventStream from 'types/EventStream';

const _t = React.PropTypes;

// private state to handle drag & drop
class DragState {
    constructor (it) {
        this.draggedItem = it.draggedItem;
        this.stream = it.stream;
    }

    onDragStart (item, x,y,e) {
        if (!item){ return; }

        this.draggedItem = item;
        if (this.draggedItem.onDragStart){
            this.draggedItem.onDragStart(x,y,e);
        }

        this.update();
    }

    onDrag (x, y, e) {
        if (this.draggedItem && this.draggedItem.onDrag) {
            this.draggedItem.onDrag(x, y, e);
        }

        this.update();
    }

    onDragEnd (x, y, e) {
        if (this.draggedItem && this.draggedItem.onDragEnd) {
            this.draggedItem.onDragEnd();
        } else if (this.draggedItem && this.draggedItem.onClick) {
            this.draggedItem.onClick(x, y, e);
        }

        this.draggedItem = null;

        this.update();
    }


    onUpdate (callback) {
        this.stream.listen(callback);
    }
    update () {
        this.stream.put(this);
    }

}

DragState.create = () => {
    return new DragState({
        draggedItem: null,
        stream: new EventStream()
    });
};

// element defined at runtime to allow use in svg or html
export default function (E) {

    // TODO: handle x/y offset
    const DragArea = React.createClass({
        getInitialState () {
            return {
                x: 0,
                y: 0,
            };
        },
        getOffset () {
            const el = this.getDOMNode();
            const rect = el.getBoundingClientRect();
            this.setState({
                x: rect.left,
                y: rect.top,
            });
        },
        componentDidMount () {
            this.getOffset();
            window.addEventListener('scroll', e => { this.getOffset(); });
            window.addEventListener('resize', e => { this.getOffset(); });
        },
        render () {
            const { children, dragState, width, height, dragNew } = this.props;
            let { x, y } = this.state;

            return (
                <E  onMouseDown={e => dragState.onDragStart(dragNew,
                        e.clientX - x, e.clientY - y, e)}
                    onMouseMove={e => dragState.onDrag(
                        e.clientX - x, e.clientY - y, e)}
                    onMouseUp={e => {
                        dragState.onDragEnd(e.clientX - x, e.clientY - y, e);
                        this.forceUpdate();
                    }}>
                    <rect width={width} height={height} fill="transparent" />
                    {children}
                </E>
            );
        }
    });

    const Draggable = React.createClass({
        propTypes: {
            x: _t.number,
            y: _t.number,
            onDrag: _t.func.isRequired,
            onDragStart: _t.func,
            onDragEnd: _t.func,
            dragState: _t.instanceOf(DragState).isRequired
        },
        getDefaultProps () {
            return {
                x: 0,
                y: 0
            };
        },
        getDefaultActions () {
            return {
                onDragStart: (x,y,e) => {
                    this.setState({isDragging: true});
                },
                onDragEnd: (x,y,e) => {
                    this.setState({isDragging: false});
                }
            };
        },
        getInitialState () {
            return {
                isDragging: false
            };
        },
        render (){
            const { x, y, children, dragState } = this.props;

            const cursor = this.state.isDragging ? "-webkit-grabbing" : "-webkit-grab";

            const transform = `translate(${x},${y})`;

            const props = Object.assign(this.getDefaultActions(), this.props);

            return (
                <E  transform={transform}
                    onMouseDown={e => dragState.onDragStart(props, null, null, e)}
                    style={{cursor: cursor}}>
                    {children}
                </E>
            );

        }
    });

    return {
        DragState: DragState,
        DragArea: DragArea,
        Draggable: Draggable
    };

}
