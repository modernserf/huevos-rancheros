"use strict";

import React from 'react';

const InactiveMode = React.createClass({
    render () {
        const { data , width, height } = this.props;

        const items = data.map((it,index) => {
            const Element = typeof it.element === "string" ?
                it.element :
                it.element.show;

            return (
                <Element key={index} {...it.props}/>
            );
        });

        return (
            <g>
                {items}
            </g>
        );
    }
});

export default InactiveMode;
