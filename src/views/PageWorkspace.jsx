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

var addHoverStroke = function (isHover, props){
    return isHover ? Object.assign({},props,{
        stroke: colors.blue,
        strokeWidth: 1,
        strokeOpacity: 0.5
    }) : props;
};


var Egg = React.createClass({
    render (){
         return (
            <DragGroup {...this.props}>
                <circle {...addHoverStroke(this.props.isHover,{
                    r: 15, fill: "white"
                })}/>
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

                <circle {...addHoverStroke(this.props.isHover,{
                    r: r, fill: colors.red
                })}/>
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
        item: React.PropTypes.object.isRequired,
        isHover: React.PropTypes.bool.isRequired,
        onRemove: React.PropTypes.func.isRequired,
        onHover: React.PropTypes.func.isRequired
    },
    onRemove (){
        this.props.onRemove(this.props.item.id);
    },
    onHover (e){
        e.preventDefault();
        this.props.onHover(this.props.item.id);
    },
    render (){
        var {item, isHover} = this.props;

        var style = isHover ? { 
            backgroundColor: colors.blue,
            color: "white"
        } : {};

        return (
            <div style={style} onMouseEnter={this.onHover}>
                <span>{item.component.displayName}</span>
                <button onClick={this.remove}>remove</button>
            </div>
        );
    }
});

var IngredientList = React.createClass({
    mixins: [GlobalAtom],
    onRemove (id){
        var ings = this.getGlobal('ingredients');
        var nextIngs = ings.filter(x => x.id !== id);
        this.setGlobal('ingredients',nextIngs);
    },
    onHover (id){
        this.setGlobal('hoverID',id);
    },
    render (){
        var ings = this.getGlobal('ingredients');
        var hoverID = this.getGlobal('hoverID');

        return (
            <ul style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "white"
            }}>
                {ings.map(v =><li key={v.id}>
                    <IngredientListItem item={v}
                        isHover={v.id === hoverID}
                        onRemove={this.onRemove}
                        onHover={this.onHover}/>
                </li>)}
            </ul>
        );
    }
});


var Ingredients = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        hoverID: React.PropTypes.number,
        onSelect: React.PropTypes.func.isRequired
    },
    onSelect (id) { return (e) => this.props.onSelect(id); },
    render () {
        var { data, hoverID} = this.props;

        return (
            <g>
                {data.map(C=> <C.component key={C.id}
                    x={C.x} y={C.y} 
                    isHover={C.id === hoverID}
                    onSelect={this.onSelect(C.id)}/>)}
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
            {id: this.gensym(), component: Tomato, x: 50, y: 50},
            {id: this.gensym(), component: Egg, x: 25, y: 25},
            {id: this.gensym(), component: Egg, x: 75, y: 25}
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
        var hoverID = this.getGlobal('hoverID');
        var tomato = ingredients[0];

        var {w, h} = this.state;

        return (
            <section onMouseMove={this.onMove}
                onMouseUp={this.onRelease}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }}>
                <svg viewBox="0 0 100 100" style={{
                    display: "block",
                    width: "100%",
                    height: "100%"
                }}>
                    <Plate/>
                    <Ingredients data={ingredients}
                        hoverID={hoverID}
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
