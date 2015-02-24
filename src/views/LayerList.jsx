"use strict";

import React from 'react';

const LayerList = React.createClass({
    render () {
        const { data } = this.props;

        const style = {
            backgroundColor: "white",
            width: 100
        };

        const items = data.map((it,index) => {
            return (
                <li key={index}>
                    {it.element.show}
                </li>
            );
        });

        return (
            <ul style={style}>
                {items}
            </ul>
        );
    }
});

export default LayerList;
