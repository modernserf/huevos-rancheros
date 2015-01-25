# huevos-rancheros
Exploring web application development with huevos rancheros

# Introduction
- who am i
    + Justin
    + live in brooklyn
    + like all brooklyn web developers, i love brunch
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

# What is an app?
- Huevos Rancheros recipe builder
    + help create new recipes
    + track success of recipes/styles
    + I find it hard to tell the difference between a terrible idea and a brilliant one until I've really explored it
    + kopi luwak principle
- an app is not a document
    + html created with a particular kind of document in mind
    + style attrs/tags added haphazardly to allow vernacular markup
    + css derived from those attributes
    + javascript/DOM similarly created without knowing what they would be used for
    + wildly varying browser support
    + best practices arise to make sense of this
        + progressive enhancement
        + restricted subsets 
            * browser-safe pallette
            * javascript: the good parts
            * SMACSS, OOCSS
        + separation of semantics and style (CSS Zen Garden)
        + increase accessibility/usabilty, decrease complexity
- many apps are customized document viewers
    + a book is both a document and the machine for reading it
    + an article is not a calendar is not a presentation is not a tweet is not a github profile, but they are all documents
    + the "document" is a pattern; there is not one correct way to make a document

---

This section probably needs to be reorganized.

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
    + similar to templates, web components, angular directives
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
- isolating D3 components allows you to treat dynamic charts like images
- inline d3 in react is neither specific to d3 nor react
    + use d3 with angular / handlebars
    + use react with other math / formatting libraries

# Inlining
- inline events
    + jQuery 'best practice' is to put event handlers on parents
    + react does this for you
    + now i don't have to think about event bubbling
- inline styles
    + svg styles and positions are necessarily inlined
    + compare css class w/ style object
    + shared style mixins / components allow for abstraction
- CSS is great when you remove the cascade and the stylesheet parts
    + inlining prevents style conflicts
    + works like Shadow DOM/scoped CSS
    + don't have to think about source order, specificity, SASS DSL

---

# What We Learned 
- the “react way” sounds bad and is contrary to the established standards
    + but its actually congruent with the goals of the established standards
    + it just acheives them in a different way
- "best practices" vs values
    + the best practices for web pages are not moral imperatives
    + accessibility, usability, ease of development are our values
    + separating markup from styles from event handlers is a tactic 
    + a tactic that has outlived its usefulness is a superstition
- the purpose of the web
    + the browser was originally a hyperlinked document viewer
    + now its often used a hyperlinked document viewer viewer
    + this is OK
- evolution
    + the web is evolving from a collection of linked documents to a platform for applications that run on a huge range of computers
    + this is necessarily going to be a very bumpy, hacky experience
    + "Evolution is a celebration of deformity"
    + vDOM is only the beginning
    + react is pretty powerful, but i hope i am not still using it in five years
    + we are still constrained by the document model, both literally (DOM) and mentally
        * like making movies that are just filmed stageplays
    + Elm completely abstracts away the DOM, CSS, JS
    + Web components for inserting non-documents into documents
    + There are tremendous opportunities for  

- the way ive ended up making that dish is kind of unusual
    + i stack everything and put it in a bowl
    + full-stack breakfast engineer


# Notes
- [Magic Ink on statelessness](http://worrydream.com/MagicInk/#p270)

