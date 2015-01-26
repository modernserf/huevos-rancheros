# huevos-rancheros
Exploring web application development with huevos rancheros

# introduction
i consider myself an adventurous eater but i dunno, there's just something about being a twentysomething in brooklyn that makes me obsessed with brunch. cause a lot of times youll see the same six things on the menu every place you go. and even then i always get eggs benedict.

but everybody does eggs benedict a little differently right? Like we all have an abstract notion of what eggs benedict is but its not like theres some sort of platonic ideal eggs bene that these places are trying to live up to. Every take on it is a little bit different even though they're all identifiably of a piece.

now when im making breakfast at home im not making eggs benedict. if im hungry im not gonna go through poaching eggs and making hollandaise. what i end up doing is usually a variation on huevos rancheros, which is fried eggs, sofrito and tortillas. And that's an even more abstract notion of a dish -- like, it seems so simple that its just _always_ been around -- but you could eat something identifiable as huevos rancheros every day and still never have the same meal twice.

# app specification
and thats what im trying to do. so im making an app that's gonna help me explore huevos rancheros. its gonna be my experimental partner in a huevos rancheros laboatory where i can try new recipes and track my results. 

The app will also give me random ingredients and constraints, like a culinary oblique strategies. Its often hard to tell the difference between a terrible idea and a great one -- beer and cheese don't sound like good ideas when you describe them -- so I want to have an element of chaos in there to ensure I'm really _exploring_ the huevos rancheros space.

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

