"use strict";

import 'es6-shim/es6-shim';
import React      from 'react';

document.addEventListener('DOMContentLoaded', function (){
    React.render(
        React.createElement('div', null, "hello world!"),
        document.getElementById('main')
    );
});
