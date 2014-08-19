#Swipo

##Introduction
Swipo is a simple plugin that can be used to initiate different types of carousels. You can use the carousel automaticly, with arrows, with bullets and with your finger! It works on a lot of devices and is very lightweight thanks to CSS3.

##Dependencies
Swipo needs the following javascript libraries:
- jquery.1.11.0.js
- modernizr.2.8.3.js
- hammer.1.1.3.js
- swipo.1.4.0.js

##How to implement
The HTML needs at least the following classes: '.media-holder', '.media-slider' and 'media-slide'. For easy styling, copy the corresponding CSS and tweak it to your needs! 

A most complete example of the carousel:

###HTML
```html
    <div class="media-holder js-carousel-1">
        <div class="media-slider">
            <div class="media-slide yellow-block"><span>Slide 1</span></div>
            <div class="media-slide green-block"><span>Slide 2</span></div>
            <div class="media-slide blue-block"><span>Slide 3</span></div>
            <div class="media-slide red-block"><span>Slide 4</span></div>
            <div class="media-slide black-block"><span>Slide 5</span></div>
        </div>
        <div class="media-paginator">
            <a class="bullet active" data-slide="1" href="#"><span></span></a>
            <a class="bullet" data-slide="2" href="#"><span></span></a>
            <a class="bullet" data-slide="3" href="#"><span></span></a>
            <a class="bullet" data-slide="4" href="#"><span></span></a>
            <a class="bullet" data-slide="5" href="#"><span></span></a>
        </div>
        <a href="#" class="arrow prev hidden" data-direction="prev"><</a>
        <a href="#" class="arrow next" data-direction="next">></a>
    </div>
``` 

###CSS
Please check swipo.css

###JavaScript
```javascript
    var c = new swipo();
    c.carousel('.js-carousel-1', {
        arrows : true // default: false
        bullets : true, // default: false
        auto : true, // default: false
        autoInterval : 4000, // default: 5000
    });
```

##Demo
See a working demo of the latest version at http://www.southpark-online.nl/swipo/
