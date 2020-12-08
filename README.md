# TestApiFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

![image info](https://i.gyazo.com/b4efa36ee6728c3579ce2b2fb12fb038.png)

## Development server
 - Change start in [package.json](./package.json) `"start": "ng serve"`
 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Production server
 - Change start in [package.json](./package.json) `"start": "node server.js"`
 - Run `ng build --prod --base-href="./"` and `node server.js` for a production server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Deploy on Heroku
1. Needs a heroku user account.
2. Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).

3. Install cli compiler:

`npm install @angular/cli@latest @angular/compiler-cli --save-dev`

4. Add to [package.json](./package.json):
 
   - Copy from devDependencies to dependencies:
        `"typescript": "<version>",`

        `"@angular/cli”: “<version>”,`

        `"@angular/compiler-cli": "<version>",`
        
    - Add to json under scrpits:
    
        ```        
        "heroku-postbuild": "ng build --prod",
          "engines": {
            "node": "<version>",
            "npm": "version>"
          }
        ```
        
5. Install Enhanced Resolve:

    `npm install enhanced-resolve`   
     
6. Create [server.js](./server.js) file:
 ``` 
//Install express server
const express = require('express');
const path = require('path');
const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/<Project>'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/<Project>/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
 ```
7. Run production server 
8. Login to heroku, ppen terminal in project root and follow steps.
```
    heroku login
```
9. Commit git changes.
10. Create heroku application.
```
  heroku apps:create example-unique-name
```
6. Push changes to heroku.
```
 git push heroku master
```
if everything was ok, it should show like this
    ![image info](https://i.gyazo.com/fe544bfa4ac44accdc73c538921d027c.png)
    
7. Open heroku in your browser
    ```
    heroku open
    ```


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
