# INSTALAR AMBIENTE

jdk 7
sdk for tools 

# Lib para android 6.0.1 - 19.0.0
sdkmanager.bat "platform-tools;tools;build-tools;19.0.0"

setar JAVA_HOME = 
setar ANDROID_HOME = 

setar no path %PATH%
%JAVA_HOME%\bin
%ANDROID_HOME%\bin %ANDROID_HOME%\platform-tools %ANDROID_HOME%\build-tools


#Baixar appium
setar no caps.js a lib do android
setar apps.js com os app para baixar e instalar

#rodar  'node roda-local-server.js' e setar app dentro da pasta bin e alterar no rodar-local-server.js 

# Node.js samples

##USAR XPATH
selecionar no chrome inspect o elemento > botao direito > copy > xpath

#Install local packages:

```
npm install
```

### To run tests using Sauce Labs cloud

[Sign up here](https://saucelabs.com/signup/trial)

Then when running the tests, add your Sauce Labs credentials as npm config parameters, example :

```
npm run ios-simple --appium-sample-code:sauce=1 --appium-sample-code:username=<SAUCE_USERNAME> --appium-sample-code:key=<SAUCE_ACCESS_KEY>

```

Or set the config parameters directly in package.json :

```
// package.json

...
"config":{
  "sauce":"1",
  "sauce_username":"<SAUCE_USERNAME>",
  "sauce_access_key":"<SAUCE_ACCESS_KEY>"
},
...
```

If you also want to use Sauce Connect (secure tunelling):

- [Read the doc here](https://saucelabs.com/docs/connect)
- Install and start the Sauce Connect client


### To run tests locally

Install appium and start the appium server for your device, please refer to:

- http://appium.io
- https://github.com/appium/appium/blob/master/README.md

## Running tests

### iOS

```
npm run ios-simple
npm run ios-complex
npm run ios-webview
npm run ios-actions
npm run ios-local-server
npm run ios-selenium-webdriver-bridge
```

### Android

```
npm run android-simple
npm run android-complex
npm run android-webview
npm run android-local-server
```

### Selendroid

```
npm run selendroid-simple
```

### Node.js 0.11 + Generator with Yiewd

prerequisite: switch to node > 0.11

```
npm run ios-yiewd
```
