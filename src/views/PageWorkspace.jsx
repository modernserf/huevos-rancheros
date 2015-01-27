"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

import PageBase from 'views/PageBase';
import {Flex,FlexBox} from 'views/FlexBox';
import {colors, fonts} from 'views/style';

var Pantry = React.createClass({
    mixins: [GlobalAtom],
    onClick (component){ return e => {
        var ings = this.getGlobal('ingredients');

        var next = {
            id: this.gensym(), 
            component: component,
            x: 25 + Math.random() * 50,
            y: 25 + Math.random() * 50
        };

        this.setGlobal('ingredients', ings.concat([next]));
    };},
    render (){
        return (
            <FlexBox>
                <Flex>
                    <button onClick={this.onClick(Egg)}>
                        Egg
                    </button>
                </Flex>
                <Flex>
                    <button onClick={this.onClick(Tomato)}>
                        Tomato
                    </button>
                </Flex>
            </FlexBox>
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

var Tomato = React.createClass({
    render (){
        var r = 10;
        return (
            <g>
                <circle {...addHoverStroke(this.props.isHover,{
                    r: r, fill: colors.red
                })}/>
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
    onMouseEnter (e){
        e.preventDefault();
        this.props.onHover(this.props.item.id);
    },
    onMouseLeave (e){
        e.preventDefault();
        this.props.onHover(null);
    },
    render (){
        var {item, isHover} = this.props;

        var style = isHover ? { 
            backgroundColor: colors.blue,
            color: "white",
            cursor: "pointer"
        } : {};

        return (
            <div style={style} 
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <span>{item.component.displayName}</span>
                <button onClick={this.onRemove}>remove</button>
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
                {ings.slice(0).reverse().map(v =><li key={v.id}>
                    <IngredientListItem item={v}
                        isHover={v.id === hoverID}
                        onRemove={this.onRemove}
                        onHover={this.onHover}/>
                </li>)}
            </ul>
        );
    }
});

var IngredientSVGWrapper  = React.createClass({
    onSelect (e){
        this.props.onSelect(this.props.item.id);
    },
    onMouseEnter (e){
        e.preventDefault();
        this.props.onHover(this.props.item.id);  
    },
    onMouseLeave (e){
        e.preventDefault();
        this.props.onHover(null);
    },
    render (){
        var {item, hoverID} = this.props;
        var Component = item.component;

        return (
            <g  onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onMouseDown={this.onSelect}
                style={{cursor: "move"}}
                transform={`translate(${item.x},${item.y})`}>
                <Component isHover={item.id === hoverID}/>
            </g>
        );
    }
});

var Ingredients = React.createClass({
    mixins: [GlobalAtom],
    onSelect (id){
        this.setGlobal('selectedID',id);
        var ingredients = this.getGlobal('ingredients');
        // put selected ingredient at top (end) of list
        var nextIngredients = ingredients.filter(x => x.id !== id)
            .concat([ingredients.find(x => x.id === id)]);

        this.setGlobal('ingredients',nextIngredients);   
    },
    onHover (id){
        this.setGlobal('hoverID',id);
    },
    render () {
        var ings = this.getGlobal('ingredients');
        var hoverID = this.getGlobal('hoverID');

        return (
            <g>
                {ings.map(item => <IngredientSVGWrapper key={item.id}
                    item={item}
                    hoverID={hoverID}
                    onSelect={this.onSelect}
                    onHover={this.onHover}/>)}
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
    onMove (e){
        var selectedID = this.getGlobal('selectedID');
        var hoverID = this.getGlobal('hoverID');
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
                    <Ingredients />
                </svg>  
            </section>
        );
    }
});

var PageWorkspace = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        var pantryStyle = {
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
            padding: 10
        };

        return (
            <PageBase color={colors.green}>
                <Workspace />
                <IngredientList />
                <section style={pantryStyle}>
                    <Pantry />
                </section>
            </PageBase>
        );
    }
});

export default PageWorkspace;
