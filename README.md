# google-analytics-app
A marketplace application that integrates to Google Analytics

![image](https://user-images.githubusercontent.com/50983144/177836969-4c664c46-4bb4-40eb-ba09-2728549bcae2.png)

# Local Development

-   `git clone https://github.com/zesty-io/app-google-analytics.git`
-   `cd app-google-analytics`
-   `npm install`
-   copy .env.example to .env
-   get session token and set `REACT_APP_TOKEN` in .env
-   get instance ZUID and set `REACT_APP_ZUID` in .env
-   get instance ID and set `REACT_APP_INSTANCE_ID` in .env
-   `npm start`
    -   Will open up http://localhost:3000/app-google-analytics or open [http://test.zesty.oi:3000](http://test.zesty.oi:3000) so you can connect with API.
-   Have fun!

# Authorizing request using OAuth2

All requests to the Analytics API must be authorized by an authenticated user. The application follow the authorization flow below :

-   Create application and register it using Google API Console https://console.cloud.google.com
-   Activate Google Analytics API.
-   Add scope which allows the application to collect data from google analytics.

| Scope | Meaning |
| :---: | :---: |
| https://www.googleapis.com/auth/analytics.readonly | Read-only access to the Analytics API. |

-   Google display a consent screen asking them to authorize the application for data access.
-   Once authorization was approved, a code will be pass which will be use get tokens.
-   This tokens will be attached to user request. If google determines that the request is valid, requested data will return.

Authentication function : https://github.com/zesty-io/gcp-cf/blob/master/authenticateGoogleAnalytics/index.js

For more info : https://developers.google.com/analytics/devguides/reporting/core/v4/authorization

# Deployment in production

Deployment happens with gcloud cli and gsutils. Install gcloud to run the deployment command. https://cloud.google.com/sdk/docs/install


### Using AppLoader in App.js

-   On development, you should pass `token` and `instance` on AppLoader.
-   During deployment and build, you dont need to pass `token` and `instance` on AppLoader. The parent container will automatically pass the data.

### Build the app with production variables

-   Make production environment variables by adding `.env.production`. use variables from `env.example`
-   see package.json. run `npm run build:prod`

### How to deploy in production

-  check package.json and run `npm run deploy-prod`
-  go to this bucket `apps.zesty.io https://console.cloud.google.com/storage/browser/apps.zesty.io;tab=objects?project=zesty-prod` and see if the files has been transferred.



# Deployment Scripts for Application

Once permissions are set on buckets, the package.json should include these scripts. Replace APP_NAME with a simple short name of your app.

-   "deploy-stage" : "gsutil cp -r ./build/* gs://apps.stage.zesty.io/APP_NAME/"
-   "deploy-prod" : "gsutil cp -r ./build/* gs://apps.zesty.io/APP_NAME/"
-   "deploy-dev" : "gsutil cp -r ./build/* gs://apps.dev.zesty.io/APP_NAME/"


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

