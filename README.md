# huevos-rancheros
Exploring web application development with huevos rancheros

# introduction
there's just something about being a twentysomething in brooklyn that makes me obsessed with brunch. not just going out for brunch either -- even when i'm home alone i find myself making a full meal for breakfast. Pop-tarts just don't cut it for me anymore.

This works because a lot of the standard breakfast recipes -- you know, the lumberjack breakfast, omelets, full english, that sort of thing -- is that they're really easy to improvise on. Everyone's got an idea of what its supposed to be, but I don't need to pull out a recipe card to get it right. They aren't recipes so much as _design patterns._ 

# app specification
Now obviously I spend a lot of time thinking about this. But I'm a web developer -- I spend my working hours making analytics software -- so I kinda see everything through that lens. So I'm making this app where I can sketch out some of my breakfast ideas.

This is what i've got so far -- I have my plate here and i can drag these ingredients around and compose my plate. On the left is the list of ingredients and I have my pallete -- im calling it the pantry -- at the bottom. click to add an ingredient onto the plate.

# React

I built this with React, a library made by facebook that patches over the weirdness and rigidity of the DOM with a virtual DOM. It happens to be very fast but that's its least interesting feature from my perspective; I use it because it allows me to reason about my code in a way that makes sense to me. Let's take a look at the code.

# code

Now this is the part in every talk about React where the presenter gets super defensive about "best practices". I'm gonna tell you what this does and you can tell me I'm ruining the internet in the Q & A.

## Egg.jsx

Starting at the lowest level: This is an egg. It renders into SVG. React components have a couple of lifecycle methods that run when the component is first loaded or between updates; here I'm using componentWillMount to generate an irregular border for the egg. This runs once for every egg, so every egg has a unique border but it doesn't change once its made. 

In the render method, I define the template for the egg, and I handle the data that's going into the component, via the state and properties. For this component the only property that matters right now is "isHover" -- when isHover is true, the yolk gets a blue outline. The styles are set inline.

## Pantry.jsx

I use the same Egg component both in the pantry and on the plate. In the pantry, I make a button for every ingredient i have; when I click a button, it's handled by this onClick method which adds a new ingredient to the global state, which triggers a redraw in all the components that consume the global state.  

## IngredientSVG.jsx

When I'm rendering the plate and its contents, I loop over the ingredients in the global state and wrap them in a component that handles all of the generic stuff like position and dragging. The component that handles the list on the side is very similar and even shares code via the IngredientManager mixin, which handles the selection and moving stuff. 

This feels a lot like 2-way binding in Angular but its actually a lot simpler -- there's no dirty checking, no digest cycles, no event broadcast, no angular scope. When I move this egg it re-renders pretty much everything, unless I specifically tell it otherwise. 


# cats and dogs, living together

    Well hold up. Everything in this file is related to this component. If I was going to have the template and the css and the javascript separated, that just means I'd have three files supporting this component instead of one. Best practices dictate that templates should have as little logic as possible in the template; the data should be "massaged" into a form that can be consumed by the template. This is part of why people hate on PHP so hard -- logic-full templates are a first-class construct in the language. But this is conflating separation of technologies with separation of concerns -- **TKTKTK** web components

JSX -- react's templating system -- is both its greatest strength and its biggest liability. It looks very much like HTML but works quite a bit differently, and your intuition about what is right for html doesn't always translate.

Inline events, for example. Unobtrusive JavaScript says you should never bind an onClick event to an html element; you should bind an event handler to the element's class or better yet delegate to its parent. Well this isnt html, its javascript that renders html. this does not render into an event handler in html. in fact, when react renders this, it automatically lifts all the event handling to the top level component. Now I don't have to even think about event bubbling and all the weird implications that can have. If I want multiple components to share the same callback behavior, I can make that behavior a separate component and import it rather than make it global.

Inline styles are probably an even harder pill to swallow. CSS classes are such a deeply rooted system of abstraction for web developers that we sometimes forget how broken they are. In React, the whole component is a unit of abstraction; you don't need to use a crappy one on top of it.

I understand the reasoning behind the cascade, but it makes it very hard to work with deeply nested components -- I need to make sure nothing in this component's stylesheet conflicts with any of its children. But that means that in order to design this component, i need to know the inner workings of everything that its composed from -- this is so fundamentally incompatible with modularity.

But if I have inline styles, that goes away. I can still share styles between components, but now its explicit instead of implicit. If I want a component to be stylable by its parents, I expose that feature explicitly. I don't have pseudo selectors like nth-child anymore, but I don't need them -- I have all of javascript at my disposal now. I don't have to think about source order, specificity, coordinating my variables between sass and javascript -- I'm freeing myself from spooky action at a distance. 

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

# what is an app
So I'm building a web app. Why a web app? What makes this an app and not just a site? In the traditional model of the web, pages are documents with links and an outline structure, with the content and structure in html, the design in css, and "extra stuff" in javascript, and you access the document with a browser. The web app model adds a layer of indirection to this, so instead of the browser being a document viewer, you make custom documents and a custom viewer and the browser becomes a ... document viewer viewer.

    Its easy to forget this but the book is a form of technology; it is both a document and a machine for reading the document. The content _can_ often be separated from its layout, its style, the size of the page, the quality of the paper, the book's pagination -- but all of those are features of the book-as-artifact. 

This is actually a good thing. 

HTML and CSS are pretty good at representing a particular kind of document, but they do not encompass all documents. an article is not a photo is not a calendar is not a presentation is not a tweet, and they have varying abilities to map to semantic HTML, but they are all documents. The "document" is an abstract concept that can have infinite representations, but we need to shoehorn it into this one format based on a series of bad decisions made 20 years ago. 

    A note on best practices.

    so i want to have interactive recipes and reports tracking which ones are successful. I've gotta represent these in html somehow, but before I get there I must consider what html is _for_.

    html was originally created in the early 90s as a way to format and link technical documents. for the first years of its life new features weren't so much designed as grown; netscape and microsoft introduced new tags and attributes to allow simple styling and layout. CSS was created based on these tags in an attempt to decouple design from document semantics.

    JavaScript and the DOM were developed in a similarly haphazard fashion -- the language itself was famously spec'd out in 10 days -- and even in the mid 90s after it had only been out for a couple of months it was already too late to introduce breaking changes, even to fix counterintuitive and poorly implemented features. 

    Further complicating the situation was wildly varying support for features. Web standards are unevenly supported to this day, but the variations between browsers in the early 2000s was tremendous. We complain about IE8 today but microsoft sat on IE6 for _five years_.   

    What we now recognize as best practices were developed in order to protect us from these irregularities. Anyone who was making pages in the font tag days remembers what a pain it was to change every page when you wanted to update your design; having a separate stylesheet made updating a design a much more reasonable process. 

    - best practices arise to make sense of this
        + progressive enhancement
        + restricted subsets 
            * browser-safe pallette
            * javascript: the good parts
            * SMACSS, OOCSS
        + separation of semantics and style (CSS Zen Garden)
        + increase accessibility/usabilty, decrease complexity


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
