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

You will run *some* tests where the inner hexagon is fully integrated with the outer one,
but there won't be many of them. We call this *integrated tests*. Examples are
Cucumber scenarios that interact with Selenium which interacts with a webapp which
interacts with all sorts of external services. I/O everywhere. Mayhem. Congratulations
if you manage to remove all flickers from this volatile unpredictable world. If
they flicker a lot, replace them with narrower, more focussed tests. A trickle
of tests from the top of the [pyramid](https://martinfowler.com/bliki/TestPyramid.html) towards the bottom is often a sign of a team working in an outside-in fashion which,
in my experience, tends to be better products.

You'll have *a few more* tests for all of the adapters.
This is what we call *integration tests*. These tests don't test business logic.
Instead they are connected to the same ports that the inner hexagon connects to,
and only verify that the adapters work properly.

You'll have *lots* of unit tests for your inner hexagon, where your business
logic is. Because the tests are so fast at this level, you can do
\#subsecondtdd. This has a euphoric effect on some TDD practitioners. Happy programmers
are the more productive ones.

The design that makes this possible is [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture),
also called "Ports and Adapters".
[This article](http://www.dossier-andreas.net/software_architecture/ports_and_adapters.html)
is a nice explanation.

In this model the "outside world" is the outer hexagon and everything outside it.
All the asynchronous operations, I/O and networking that our application needs
happens in the outer hexagon.

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
