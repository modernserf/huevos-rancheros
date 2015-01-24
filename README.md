# huevos-rancheros
Exploring web application development with huevos rancheros

# Introduction
- who am i
    + Justin
    + live in brooklyn
    + like all white people in brooklyn, i love brunch
- lots of common brunch recipes
    + identical names on menu, but variations on dish
    + "eggs benedict" is more like a design pattern than a recipe
- huevos rancheros my favorite breakfast to make at home
    + eggs
    + sofrito (onions, peppers, tomato)
    + tortillas
    + equivalent to canada's "lumberjack breakfast"
- open ended
    + optional ingredients (beans, rice, guac)
    + optional preparation methods

# Model App
- Huevos Rancheros recipe builder
    + help create new recipes
    + track success of recipes/styles
- I find it hard to tell the difference between a terrible idea and a brilliant one until I've really explored it
    + kopi luwak principle

# React
- rendering library built by facebook
- not going into details about implementation, but
    + virtual DOM, redraws on every change
    + JSX combines templates and data
    + inline styles and event handlers
    + but not "really" inline, because not really DOM
    + see [Pete Hunt: Rethinking Best Practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY)
- very small feature set
    + much smaller API than even jQuery
    + simplified considerably when using JSX
- component-level design
    + quickly dive from top level router down into smallest level component
    + use chrome plugin
    + arrow function for element lists

# D3
- data driven documents
- Mike Bostock / NY Times
- huge feature set
    + DOM manipulation, animation, AJAX (like jQuery)
    + math/geometry
    + geography
    + date/time
    + string formatting
    + color mixing
- sprawling and somewhat difficult to navigate documentation
    + every time they needed a feature for a chart, they added it to d3
- does not actually make charts; makes useful components for charts
- not using its DOM manipulation at all
    + use svg functions to generate paths
    + compare traditional vs react approach

# Inline Styles (time permitting)
- note all svg attrs are inlined
- not seeing any classes or ids on elements
- all styles in mixins and components
- CSS is great when you remove the cascade and the stylesheet parts
    + inlining prevents style conflicts
    + works like Shadow DOM/scoped CSS
- show base stylesheet, remainder inlined into components

# Gallery (time permitting)
- showcase a couple good charts and how they are implemented 
    + time series
    + squid
    + something goofy

# Conclusions 
- evolution is a celebration of deformity
- the “react way” sounds bad and is contrary to the established standards
    + but its actually congruent with the goals of the established standards
    + it just acheives them in a different way
- the way ive ended up making that dish is kind of unusual
    + i stack everything and put it in a bowl
    + full-stack breakfast engineer
- over the course of many iterations, i came across a reconceptualization of huevos rancheros that handles separation of ingredients in an unusual format, but improves the dish’s usability.
