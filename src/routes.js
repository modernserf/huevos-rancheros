"use strict";

import Home from "views/PageHome";
import BrunchDesignPattern from "views/PageBrunchDesignPattern";
import Workspace from "views/PageWorkspace";

var routes = [
    {id: "home", title: "Home", page: Home},
    {id: "workspace", title: "Workspace", page: Workspace}
];

export default routes;