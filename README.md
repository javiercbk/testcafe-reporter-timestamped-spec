# testcafe-reporter-timestamped-spec
[![Build Status](https://travis-ci.org/javiercbk/testcafe-reporter-timestamped-spec.svg)](https://travis-ci.org/javiercbk/testcafe-reporter-timestamped-spec)

This is the **timestamped-spec** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/javiercbk/testcafe-reporter-timestamped-spec/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-timestamped-spec
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter timestamped-spec
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('timestamped-spec') // <-
    .run();
```

## Author
 
