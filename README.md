# Ashcroft

Religiously disallow things that cause slowness

```
 -------------------
< You can't do that >
 -------------------
     \
      \
```
![Ashcroft](https://cdn.rawgit.com/aslakhellesoy/ashcroft/master/ashcroft.svg)

## About

Node.js API implementation of the original, classic
[Ashcroft](https://github.com/codehaus/ashcroft/tree/master/ashcroft) in Java.

Other language implementations welcome.

## Why

Do what Ashcroft says and your tests will be very fast. Ashcroft won't let you do
any of the things that cause slow tests, such as I/O and sleeping.

Enable him from the beginning of a project and he will make you stay on the
straight and narrow from the get-go.

Enable him on an existing project and he will point your finger at any
sinful thing you do. He will patiently wait while you make it your sole focus
to rid your codebase of this #subsecondtdd hostile substance through careful
refactoring and decoupling.

Whenever Ashcroft confirms you are clean, you can celebrate by taking a break
from Ashcroft (not enabling him). This will increase the speed of your tests
even further, because Ashcroft does bring some performance baggage.

If you are haunted by flickering test (and I'm sure you are) you can refactor
your code (and tests) to make your tests fast and predictable. Ashcroft will
tell you what to do (or rather - stop doing).

You will end up with synchronous tests that are incredibly fast, and perhaps
more interestingly, *behave consistently*. This is YUGE.

In doing this you also tend to end up with a better design - to my taste at least.
It is a design where all business logic is decoupled from "the outside world"
([where the wild things are](https://en.wikipedia.org/wiki/Where_the_Wild_Things_Are)).

It's not that this "outside world" isn't important - it is indeed. The thing is,
you most of your tests should not test business logic and the outside world at
the same time.

This is one of the most common mistakes of junior developers, because they haven't
yet learned how to make the tradeoffs between "get shit done fast now" and
"get shit done fast forever".

As it turns out, the process is easy to learn, and with patience and rigour,
most codebases can be refactored safely towards such a design.

The design is [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture),
also called "Ports and Adapters".
[This article](http://www.dossier-andreas.net/software_architecture/ports_and_adapters.html)
is a nice explanation.

The "outside world" is the outer hexagon (where all the asynchronous operations, I/O and networking happens) as well as all the things on the networks outside (databases, message queues, web services etc.)

With Ashcroft enabled, the outer hexagon is crippled, so tests for the inner hexagon
will only pass if they don't depend directly on the outer hexagons. This helps you
decide where to introduce ports and adapters.

## Finished-Promise

[Finished-Promise](https://github.com/featurist/finished-promise) is a
synchronous `Promise` implementation. Used in conjunction
with Ashcroft it will inform you where your code is asynchronous (for example
using in-memory `Stream`s). Your tests should return a `Promise` which
resolves upon a `finish` or `end` events. This test will fail because
`Finished-Promise` will finish before the asynchronous streaming events
are emitted.

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
