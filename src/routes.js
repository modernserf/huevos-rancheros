"use strict";

import Home from "views/PageHome";
import BrunchDesignPattern from "views/PageBrunchDesignPattern";
import Workspace from "views/PageWorkspace";
import Artboard from "views/PageArtboard";

var routes = [
    {id: "artboard", title: "Artboard", page: Artboard},
    {id: "workspace", title: "Workspace", page: Workspace},
];

export default routes;