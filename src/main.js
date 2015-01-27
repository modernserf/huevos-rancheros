"use strict";

import 'es6-shim/es6-shim';
import React from 'react';
import Atom from 'types/Atom';
import routes from 'routes';

import Main from 'views/Main';

var baseTitle = "Huevos Rancheros";

Atom.set('ingredients', []);

// string -> IO()
var setRoute = function (href){
    var [ ,routeID] = href.split("#");
    routeID = routeID || "home";

    // TODO: do something for error page?
    var route = routes.find(p => p.id === routeID) || routes[0];

    document.title = baseTitle + " | " + route.title;

    Atom.set('currentRoute',route)
        .set('routes',routes);
};

Main = React.createFactory(Main);

document.addEventListener('DOMContentLoaded', function (){
    setRoute(window.location.href);

    React.render(Main(),document.getElementById('main'));
});

window.addEventListener('hashchange', e => setRoute(e.newURL));
