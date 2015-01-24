"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';

var PageHome = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        return (
            <div>
                Hello, World! Home page.
            </div>
        );
    }
});

export default PageHome;
