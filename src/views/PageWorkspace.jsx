"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

import PageBase from 'views/PageBase';
import {Flex,FlexBox} from 'views/FlexBox';
import {colors, fonts} from 'views/style';

var DragGroup = React.createClass({
    render (){
        var { x, y, onSelect, children } = this.props;

        return (
            <g onMouseDown={onSelect}
                style={{cursor: "move"}}
                transform={`translate(${x},${y})`}>
                {children}
            </g>
        );
    }
});


var Egg = React.createClass({
    render (){
        var r = 15;
        return (
            <DragGroup {...this.props}>
                <circle r={15} fill={"white"}/>
                <circle r={7} fill={colors.gold} 
                    style={{opacity:0.5}}/>
            </DragGroup>
        );
    }
});

var Tomato = React.createClass({
    render (){
        var r = 10;
        return (
            <DragGroup {...this.props}>
                <circle r={r} fill={colors.red}/>
            </DragGroup>
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

var collectMapOn = function (key){
    return (coll, item) => {
        var subcoll = coll.get(item[key]) || [];
        subcoll.push(item);
        coll.set(item[key], subcoll);
        return coll;
    };
};

var reduce = function (coll, fn, into){
    var iter = coll.entries();
    var item = iter.next();
    while (!item.done){
        // into, value, key
        into = fn(into, item.value[1], item.value[0], coll);
        item = iter.next();
    }
    return into;
};

var map = function (coll, fn){
    var into = new coll.constructor();
    var iter = coll.entries();
    var item = iter.next();
    while (!item.done){
        // into, value, key
        into.set(item.value[0], fn(item.value[1], item.value[0], coll ));
        item = iter.next();
    }

    return into;
};


var IngredientListItem = React.createClass({
    propTypes: {
        component: React.PropTypes.func.isRequired,
        items: React.PropTypes.array.isRequired 
    },
    render (){
        var {component, items} = this.props;

        return (
            <div>
                <span>{component.displayName}</span>
                <span>:</span>
                <span>{items.length}</span>
            </div>
        );
    }
});

var IngredientList = React.createClass({
    mixins: [GlobalAtom],
    render (){
        var ings = this.getGlobal('ingredients');
        // var items = ings.reduce(collectMapOn('component'),new Map());

        return (
            <ul style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "white"
            }}>
                {ings.map(v =><li key={v.id}>
                    <IngredientListItem component={v.component} items={[v]}/>
                </li>)}
            </ul>
        );
    }
});


var Ingredients = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },
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
            {id: 1, component: Tomato, x: 50, y: 50},
            {id: 2, component: Egg, x: 25, y: 25}
        ]);
    },
    componentDidMount (){
        var el = this.getDOMNode();
        this.setState({
            w: el.clientWidth,
            h: el.clientHeight
        });
    },
    onSelect (id){
        this.setGlobal('selectedID',id);
        var ingredients = this.getGlobal('ingredients');
        // put selected ingredient at top (end) of list
        var nextIngredients = ingredients.filter(x => x.id !== id)
            .concat([ingredients.find(x => x.id === id)]);

        this.setGlobal('ingredients',nextIngredients);
    },
    onMove (e){
        var selectedID = this.getGlobal('selectedID');
        if (selectedID === null){ return; }

        var { w, h} = this.state;
        var igs = this.getGlobal('ingredients');

        // "active ingredient" is last item
        var nextIgs = igs.slice(0);
        var item = nextIgs[nextIgs.length - 1];
        item.x = 100 * e.clientX / w;
        item.y = 100 * e.clientY/ h;

        this.setGlobal('ingredients',nextIgs);
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
                <svg viewBox="0 0 100 100" style={{
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
                <IngredientList />
            </PageBase>
        );
    }
});

export default PageWorkspace;
