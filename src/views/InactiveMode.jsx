"use strict";

import React from 'react';

const InactiveMode = React.createClass({
    render () {
        const { data } = this.props;

        const items = data.map((it,index) => {
            const Element = typeof it.element === "string" ?
                it.element :
                it.element.show;

            const { x, y } = it.props;

            return (
                <g key={index} transform={`translate(${x||0},${y||0})`}>
                    <Element {...it.props}/>
                </g>

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
