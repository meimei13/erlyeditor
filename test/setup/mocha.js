import path from 'path';
import { addPath } from 'app-module-path';
import { jsdom } from 'jsdom';
import chai, { expect, should } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

// read about some other solutions here:
// https://gist.github.com/branneman/8048520
addPath(path.resolve(__dirname, '../../src'));

// expose expect & should globally
// see http://chaijs.com/guide/styles/
global.expect = expect;
should();

jsdom.env({
  html: '<html><body></body></html>',
  done: (error, window) => {
    if (error) console.error(error);

    global.window = window;
    propagateToGlobal(window);
  }
});

// take all properties of the window object
// and also attach it to the mocha global object
//
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
// useful to be able to write smth like
// navigator.userAgent.indexOf('Chrome') > -1
// instead of window.navigator.userAgent.indexOf('Chrome') > -1

function propagateToGlobal(window) {
  for (let const in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (const in global) continue;

    global[key] = window[key];
  }
}

// for more info see: http://jaketrent.com/post/testing-react-with-jsdom/
