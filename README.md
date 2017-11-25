# kopio.js

Link/text clipboard copying made easy and light.
* [Demo](http://Banttu.github.io/kopio.js)

## Install
```
$ npm install kopio.js --save
```

## Instantiate
You need to import kopio and then instantiate it.

By assigning kopio instance to a variable you can subscribe to the copy events.

## Parameters
There are no required parameters, but you can pass your own selector for the copy triggers (default is .kopio).

## Basic Usage
```
<div class="kopio" data-kopio-text="https://github.com/Banttu/kopio.js">

import Kopio from 'kopio.js';
new Kopio();
```

## License
Released under the MIT license by Andreas Siivola.
