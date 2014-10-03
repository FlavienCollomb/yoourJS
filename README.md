# [yoourJS](http://www.yoourjs.com)

yoourJS is free and open source full object JavaScript library, created by a french developer [Flavien Collomb](http://www.flaviencollomb.fr). It is written with plain JavaScript and works well with other libraries like jQuery.

To get started, check out <http://www.yoourjs.com>!

## Quick start
[Download the latest release here](http://www.yoourjs.com/yoour.js).

### What's included
```
yoourjs/
├── core/
├── ui/
```
All objects are concatened in final release.

## Bugs and feature requests
Have a bug or a feature request? [Please open a new issue](https://github.com/FlavienCollomb/yoourJS/issues/new).

## Documentation
yoourJS's documentation is under construction.

## First steps
Encapsulate HTMLElement html and body
```javascript
var html = document.getElementsByTagName("html")[0];
html = new UrWidget({"element": html});
var body = document.getElementsByTagName("html")[0];
body = new UrWidget({"element": html});
```

Create a first UrWidget
```javascript
var content = new UrWidget({
    "id":"first",
    "className":"firstClass",
    "style":{"background":"black"},
    "parent":body
});
```

Create a h1 title
```javascript
var title = new UrCustomWidget("h1",{
    "html":"Title"
});
```

Add a link on the title
```javascript
var link = new UrLink({
    "parent":content,
    "href":"http://www.github.com",
    "target":"_blank"
});
link.addChild(title);
```

Create an image
```javascript
new UrImage({
    "parent":content,
    "src":"img/yoursrc.png",
    "width":50,
    "height":50
});
```

## Contributing
yoourJS is a young project. So, for the moment, you can contact the creator at [social@flaviencollomb.fr](mailto:social@flaviencollomb.fr) if you want to help him.

## Creators
**Flavien Collomb**

- <https://twitter.com/FlavienCollomb>
- <https://github.com/FlavienCollomb>

## Copyright and license
Code copyright 2014 Flavien Collomb. Code released under [the MIT license](LICENSE).
