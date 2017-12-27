"use strict";

require("./helpers/setup");

var wd            = require("wd"),
                _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

describe("Bringup TEST", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = serverConfigs.local;
    driver           = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

     // var desired = process.env.npm_package_config_sauce ?
     //  _.clone(require("./helpers/caps").android18) :
     //  _.clone(require("./helpers/caps").android19);
    
    //USA ANDROID - celular fisico - 6.0.1 - J5 metal
    var desired = _.clone(
                    {
                      browserName: '',
                      'appium-version': '1.6',
                      platformName: 'Android',
                      platformVersion: '6.0.1',
                      deviceName: 'Android Emulator',
                      app: 'br.com.bringupapp', // will be set later
                      noReset: true,
                      fullReset: false
                    }
    );
    
    //APP A SER INSTALADO
    //var androidApiDemos = "https://build.phonegap.com/apps/1970105/download/android";
    //rodar rodar-local-server.js antes de iniciar mocha
    var androidApiDemos = "http://localhost:3000/BringUp-debug.apk";
    desired.app         = androidApiDemos;
    //desired.app = require("./helpers/apps").androidApiDemos;
    
    if (process.env.npm_package_config_sauce) {
      desired.name = 'android - simple';
      desired.tags = ['sample'];
    }

    return driver
      .init(desired)
      .setImplicitWaitTimeout(3000);
  
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.npm_package_config_sauce) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  
  it("login", function () {
    return driver
        .contexts().then(function (contexts) { // get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
            console.log('contextos',contexts)
            return driver.context(contexts[1]); // choose the webview context
        })
      let el1 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[3]/android.view.View/android.view.View[2]/android.view.View[1]/android.widget.Button");
      el1.click();
      let el2 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[3]/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText");
      el2.click();
      let el3 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout");
      el3.setValue("viniciusferreirawk@gmail.com");
      let el4 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[3]/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View[3]");
      el4.click();
      el4.setValue("gree");
      let el5 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[3]/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText");
      el5.click();
      el5.click();
      el5.setValue("viniciusferreirawk@gmail.com");
      let el6 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[3]/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.Button[1]");
      el6.click();


      driver.sleep(20000);
      /*.elementByAccessibilityId('Arcs')
        .should.eventually.exist
      .back()
      .elementByName('App')
        .should.eventually.exist
      .elementsByAndroidUIAutomator('new UiSelector().clickable(true)')
        .should.eventually.have.length(12)
      .elementsByAndroidUIAutomator('new UiSelector().enabled(true)')
        .should.eventually.have.length.above(20)
      .elementByXPath('//android.widget.TextView[@text=\'API Demos\']')
        .should.exists;*/
  });
  

});
