"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

var Main = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        var currentPage = this.getGlobal('currentPage');
        var Component = currentPage.component;
        return (
            <div>
                Hello, World!
            </div>
        );
    }
});

export default Main;
