"use strict";

import Home from "views/PageHome";
import BrunchDesignPattern from "views/PageBrunchDesignPattern";

var routes = [
    {id: "home", title: "Home", page: Home},
    {id: "design-patterns", title: "Design Patterns", page: BrunchDesignPattern},
    {id: "rancheros-definition", title: "Definition" },
    {id: "open-ended", title: "Open Ended"},

    {id: "app-intro", title: "The App"},
    {id: "kopi-luwak", title: "Kopi Luwak Principle"},

    {id: "react-intro", title: "React"},
    {id: "components", title: "Components"},

    {id: "d3-intro", title: "D3"},
    {id: "d3-features",title: "D3 Features"},
    {id: "imperative-vs-declarative", title: "Imperative vs Declarative"},

    {id: "not-a-document",title: "Not a Document"},
    {id: "inline-events", title: "Inline Events"},
    {id: "inline-styles", title: "Inline Styles"},
    {id: "css-minus-css", title: "CSS minus CSS"}


];


export default routes;