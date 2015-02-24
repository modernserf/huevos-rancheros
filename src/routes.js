"use strict";

import Home from "views/PageHome";
import BrunchDesignPattern from "views/PageBrunchDesignPattern";
import Workspace from "views/PageWorkspace";
import Artboard from "views/PageArtboard";

var routes = [
    {id: "intro", title: "Home", page: Home},
    {id: "workspace", title: "Workspace", page: Workspace},
    {id: "artboard", title: "Artboard", page: Artboard},

];

export default routes;