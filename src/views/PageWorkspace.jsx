"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

import PageBase from 'views/PageBase';
import {Flex,FlexBox} from 'views/FlexBox';
import {colors, fonts} from 'views/style';

var Tomato = React.createClass({
    render (){
        var { x, y, onSelect } = this.props;

        var r = 10;
        return (
            <g onMouseDown={onSelect}
                style={{cursor: "move"}}
                transform={`translate(${x},${y})`}>
                <circle r={r} fill={colors.red}/>
            </g>
        );
    }
});

var Plate = React.createClass({
    render (){
        var r = 50;
        return (
            <circle cx={r} cy={r} r={r}
                fill={colors.gold}/>
        );
    }
});

var Ingredients = React.createClass({
    onSelect (id) { return (e) => this.props.onSelect(id); },
    render () {

        var tomato = this.props.data[0];
        return (
            <g>
                <Tomato x={tomato.x}
                    y={tomato.y}
                    onSelect={this.props.onSelect}/>

            </g>
        );
    }
});

var Workspace = React.createClass({
    mixins: [GlobalAtom],
    getInitialState(){
        return { isMoving: false };
    },
    componentDidMount (){
        this.setState({
            w: window.innerWidth,
            h: window.innerHeight
        });
    },
    onSelect (e){
        this.setState({isMoving: true});
    },
    onMove (e){
        var { isMoving, w, h} = this.state;
        if (!isMoving){ return; }

        var tomato = this.getGlobal('ingredients')[0];
        tomato.x = 100 * e.clientX / w ;
        tomato.y = 100 * e.clientY/ h;
        this.setGlobal('ingredients',[tomato]);
    },
    onRelease (e){
        this.setState({isMoving: false});
    },
    render (){
        var ingredients = this.getGlobal('ingredients');
        var tomato = ingredients[0];

        return (
            <section onMouseMove={this.onMove}
                onMouseUp={this.onRelease}>
                <svg viewBox="0 0 110 110" style={{
                    display: "block",
                    width: "100%",
                    height: "100%"
                }}>
                    <Plate/>
                    <Ingredients data={ingredients}
                        onSelect={this.onSelect}/>
                </svg>  
            </section>
        );
    }
});

var PageWorkspace = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        return (
            <PageBase color={colors.green}>
                <Workspace />
            </PageBase>
        );
    }
});

export default PageWorkspace;
