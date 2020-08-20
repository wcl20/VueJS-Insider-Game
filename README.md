# VueJS Insider Game
Online version of the Insider board game.

## Set up
Install yarn packages
```bash
yarn install
```
Modify path to server in src/main.js and start Vue app
```bash
yarn serve
```

# Server Set up
Login to heroku
```bash
heroku login
```
Find app
```bash
heroku:git:remote -a <app>
```
Push server to heroku
```bash
git subtree push --prefix server heroku master
```
Check available apps
```bash
heroku apps
```
Start app
```bash
heroku ps:scale web=1 --app <app>
heroku open --app <app>
```
Stop app
```bash
heroku ps:scale web=0 --app <app>
```
