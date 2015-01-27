"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';
import {colors} from 'views/style';

export var IngredientListItem = React.createClass({
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

export default IngredientList;
