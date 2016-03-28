Stravistix Landing Page
==========
Code of website running @ http://thomaschampagne.github.io/stravistix-landingpage/  (new site work in progress)

# Project prerequisites
## Node Package Manager
You must run **npm** cli command via [nodejs.org](https://nodejs.org)
## Gulp task runner
(Install **gulp-cli** from npm if not already installed...)
```
npm install --global gulp-cli
```

# Install project dependencies
```
npm install
```
# Build distribution
```
gulp build
```
The build pushes assets **js, less > css, img, fonts, ...** into **dist/** directory
# Build production
```
gulp --prod
```
The build pushes assets **js, less > css, img, fonts, ...** into **dist/** directory

# Run local server to develop in...
```
node server.js
```
Local server will now listen on **TCP/8080** port

Local server use **dist/** as static directory

Launch [localhost:8080](http://localhost:8080) into your browser

# Watch & Dev
```
gulp watch
```
Redo a **gulp build** on any **src/** file change
