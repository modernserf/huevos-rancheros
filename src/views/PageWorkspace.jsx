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

        var items = this.props.data.map(C=> <C.component key={C.id}
            x={C.x} y={C.y} onSelect={this.onSelect(C.id)}/>);

        var tomato = this.props.data[0];
        return (
            <g>
                {items}
            </g>
        );
    }
});

var Workspace = React.createClass({
    mixins: [GlobalAtom],
    getInitialState(){
        return { w: 0, h: 0 };
    },
    componentWillMount (){
        this.setGlobal('ingredients',[
            {id: 1, component: Tomato, x: 50, y: 50}
        ]);
    },
    componentDidMount (){
        this.setState({
            w: window.innerWidth,
            h: window.innerHeight
        });
    },
    onSelect (id){
        this.setGlobal('selectedID',id);
    },
    onMove (e){
        var selectedID = this.getGlobal('selectedID');
        if (selectedID === null){ return; }

        var { w, h} = this.state;
        var ingredients = this.getGlobal('ingredients');

        var nextIngredients = ingredients.map(item => item.id === selectedID ?
            Object.assign(item, {
                x: 100 * e.clientX / w,
                y: 100 * e.clientY/ h
            }) : item);

        this.setGlobal('ingredients',nextIngredients);
    },
    onRelease (e){
        this.setGlobal('selectedID',null);
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
