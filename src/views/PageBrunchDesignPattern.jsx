"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

var PageBrunchDesignPattern = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        return (
            <div>
                lots of common brunch recipes
            </div>
        );
    }
});

export default PageBrunchDesignPattern;
