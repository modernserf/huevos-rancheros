"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';
import {colors} from 'views/style';

import IngredientManager from 'mixins/IngredientManager';

export var IngredientListItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        isHover: React.PropTypes.bool.isRequired,
        onRemove: React.PropTypes.func.isRequired,
        onHover: React.PropTypes.func.isRequired
    },
    onSelect (){
        this.props.onSelect(this.props.item.id);
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
                <span onClick={this.onSelect}>{item.component.displayName}</span>
                <button onClick={this.onRemove}>remove</button>
            </div>
        );
    }
});

var IngredientList = React.createClass({
    mixins: [GlobalAtom,IngredientManager],
    onRemove (id){
        var ings = this.getGlobal('ingredients');
        var nextIngs = ings.filter(x => x.id !== id);
        this.setGlobal('ingredients',nextIngs);
    },
    onSelectAndRelease (id){
        this.onSelect(id);
        this.setGlobal('selectedID',null);
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
                        onSelect={this.onSelectAndRelease}
                        onHover={this.onHover}/>
                </li>)}
            </ul>
        );
    }
});

export default IngredientList;
