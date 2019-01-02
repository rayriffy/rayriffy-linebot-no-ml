rayriffy-linebot-no-ml
======================

## Features

- `/eat` to random various lists of food
- `/moe` to heal yourself
- `/riffycat` to stay awesome

## Deploying yourself

1. Clone repository

```
$ git clone https://github.com/rayriffy/rayriffy-linebot-no-ml
```

2. Edit `.firebaserc` change project id to yours instead

3. Add config variables

```
$ firebase functions:config:set line.access_token="YOUR_LINE_ACCESS_TOKEN"
```

4. Deploy

```
$ yarn run deploy
```
