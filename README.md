# Ashcroft

Religiously disallow things that cause slowness

```
 -------------------
< You can't do that >
 -------------------
     \
      \
```
![Ashcroft](https://rawgit.com/aslakhellesoy/ashcroft/logo/ashcroft.svg)

## About

Node.js API implementation of the original, classic
[Ashcroft](https://github.com/codehaus/ashcroft/tree/master/ashcroft) in Java.

Other language implementations welcome.

## Why

Do what Ashcroft says and your tests will be very fast.

Enable him from the beginning of a project and he will make you stay on the
straight and narrow from the get-go.

Enable him on an existing project and he will point your finger at any
sinful thing you do. He will patiently wait while you make it your sole focus
to rid your codebase of this #subsecondtdd hostile substance through careful
refactoring and decoupling.

Whenever Ashcroft confirms you are clean, you can celebrate by taking a break
from Ashcroft (not enabling him). This will increase the speed of your tests
even further, because there is some overhead with Ashcroft himself. He's only
human.

## Install

```sh
yarn add --dev ashcroft
```

## Usage

```javascript
const Ashcroft = require('ashcroft')
Ashcroft.enable()
```

### Mocha / Cucumber

place the contents in `test/ashcroft_enable.js` file and run `mocha` / `cucumber` with
`--require test/ashcroft_enable.js`.

Try it out by disabling some of the bans, run `yarn test` and observe the errors.
