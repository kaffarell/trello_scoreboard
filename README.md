# Trello Scoreboard

Searches for all the cards a user is added on and counts them. The program outputs the list with all the users and their score in the command line and writes the list on a trello card

## How to use

Rename the file `.env.sample` to `.env` and fill in the trello api key and token (obtained here: https://trello.com/app-key). 

The file .env should look like this:
```
TOKEN=1a9daa509b779crcdv01a13ae55ee00780760cf069114122cab378317a
KEY=6af36asfcaaebe6fd2d9a880ee8
```

Compile the typescript to javascript:
```
npm run build:dev
```
Run the script:
```
npm run start
```