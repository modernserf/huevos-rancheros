"use strict";

import React from 'react';
import GlobalAtom from 'mixins/GlobalAtom';

import Navigation from 'views/Navigation';

var Main = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        var currentRoute = this.getGlobal('currentRoute');
        var Page = currentRoute.page;
        return (
            <div>
                <Page />
                <Navigation />
            </div>
            
        );
    }
});

export default Main;
