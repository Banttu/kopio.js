# kopio.js
[![kopio.js on NPM](https://img.shields.io/npm/v/kopio.js.svg?style=flat-square)](https://www.npmjs.com/package/kopio.js) [![kopio.js Downloads on NPM](https://img.shields.io/npm/dm/kopio.js.svg?style=flat-square)](https://www.npmjs.com/package/kopio.js) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> Zero-dependency solution for copying text. Light as a croissant 🥐
* [Demo](http://Banttu.github.io/kopio.js)

## Install
```
$ npm install kopio.js --save
```

## Two ways to get text

Text from data attribute:
```
<button class="kopio" data-kopio-text="my text to copy">copy</button>
```

Specify a target:
```
<button class="kopio" data-kopio-target="#target">copy</button>

<p id="target">Here is some text I want to be able to be copied.</p>
```

## Import & instantiate
```
import Kopio from 'kopio.js'

// using default selector '.kopio'
new Kopio()
// or a custom selector
new Kopio('.custom')
```

## Two ways to get text

Text from data attribute:
```
<button class="kopio" data-kopio-text="my text to copy">copy</button>
```
Specify a target:
```
<button class="kopio" data-kopio-target="#target">copy</button>

<p id="target">Here is some text I want to be able to be copied.</p>
```

## Events

Saving the object enables subscribing to the copy events. There are only two events success and error. Both events pass the event triggerer as a parameter for the callback.

```
const kopio = new Kopio()

kopio.on('success', (trigger) => {

})

kopio.on('error', (trigger) => {

})
```

## License
Released under the MIT license by Andreas Siivola.
