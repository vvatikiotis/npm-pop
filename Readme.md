#### Steps to reproduce from scratch this skeleton.
- `npm init`
- `npm install browser-sync --save-dev`
- `npm install gulp --save-dev`
- `npm install jspm/jspm-cli -g` and `npm install jspm --save-dev.`
- `jspm init`. We'll use this to install all the client app packages. *Use your client code directory as the `baseURL`*.
- `jspm install underscore`.

#### Steps to install npm and jspm packages after cloning this repos.
These steps keep package information, from the scratch step, and after cloning the repo install only  the already specified packages. Scratch steps are not necessary if you clone this repo and follow the following steps:
- `npm install`
- `jspm install`
- `npm start`

We can use ES6. Transpilation by Babel on the fly, there's no build step to produce ES5 transpiled files.
