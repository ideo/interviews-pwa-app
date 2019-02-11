# Interviews
This is a Progressive Web App built to share interview videos in the Design Research phase of the project. Initially conceived as an insights sharing tool for project Ziggy in IDEO New York, the goal is to generalize and white-label this project so that it can be used to bvenefit any project.

## Build Setup

``` bash
# create .env file in the root directory
touch .env

# edit .env file (see Environtment Variables for more information)
nano .env

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Environtment Variables
```
# Back-End URL to retrieve JSON
AXIOS_BASE_URL=

# Password
PASSWORD=

# AWS URL
AWS_URL=
```

## Deployment
The frontend app is deployred via [netlify](https://netlify.com). It has a backend dependency on a [Craft CMS](https://craftcms.com/) instance hosted on [Hyperlane](https://hyperlane.co).

## Inquiries
For more information contact [Mani Nilchiani](mnilchiani@ideo.com)
