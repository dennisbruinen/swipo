#swipo

##Introduction
Swipo is a simple plugin that can be used to initiate different carousels. It works on a lot of devices and is very lightweight thanks to CSS3.

##Initiation
The html at least needs div's with the classes '.media-holder', '.media-slider' and 'media-slide'. For easy use, copy the corresponding CSS. 

A most complete version of the carousel:

```javascript
    var c = new swipo();
    c.carousel('.js-carousel-1', {
        'arrows' : true // default: false
        'bullets' : true, // default: false
        'auto' : true, // default: false
        'autoInterval' : 4000, // default: 5000
    });
```

##Demo
See a working demo of the latest version at http://www.southpark-online.nl/swipo/
