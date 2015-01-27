"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

export var IngredientSVGWrapper  = React.createClass({
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

export default Ingredients;