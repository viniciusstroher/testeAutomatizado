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
    var desired = _.clone(require("./helpers/caps").android19);
    
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

  
  it("should find an element", function () {
    return driver
      .elementByAccessibilityId('Graphics')
      .click()
      .elementByAccessibilityId('Arcs')
        .should.eventually.exist
      .back()
      .elementByName('App')
        .should.eventually.exist
      .elementsByAndroidUIAutomator('new UiSelector().clickable(true)')
        .should.eventually.have.length(12)
      .elementsByAndroidUIAutomator('new UiSelector().enabled(true)')
        .should.eventually.have.length.above(20)
      .elementByXPath('//android.widget.TextView[@text=\'API Demos\']')
        .should.exists;
  });
  

});
