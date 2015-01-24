"use strict";

import 'es6-shim/es6-shim';
import React from 'react';
import Atom from 'types/Atom';

import Main from 'views/Main';

var baseTitle = "Huevos Rancheros";

var pages = [
    {id: "home", title: "Home"}
];

// string -> IO()
var setRoute = function (href){
    var [ ,pageID] = href.split("#");
    pageID = pageID || "home";

    // TODO: do something for error page?
    var page = pages.find(p => p.id === pageID) || pages[0];

    document.title = baseTitle + " | " + page.title;

    Atom.set('currentPage',page)
        .set('pages',pages);
};

Main = React.createFactory(Main);

document.addEventListener('DOMContentLoaded', function (){
    setRoute(window.location.href);

    React.render(Main(),document.getElementById('main'));
});

window.addEventListener('hashchange', e => setRoute(e.newURL));
