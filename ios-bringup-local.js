"use strict";

require("./helpers/setup");

var wd            = require("wd"),
                _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');


describe("Bringup TEST", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;
  var asserters = wd.asserters; // commonly used asserters

  before(function () {
    var serverConfig = serverConfigs.local;
    driver           = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

     // var desired = process.env.npm_package_config_sauce ?
     //  _.clone(require("./helpers/caps").android18) :
     //  _.clone(require("./helpers/caps").android19);
    
    //USA ANDROID - celular fisico - 6.0.1 - J5 metal
    var desired = _.clone(
                    // {
                    //   browserName: '',
                    //   'appium-version': '1.6',
                    //   platformName: 'Android',
                    //   platformVersion: '6.0.1',
                    //   deviceName: 'Android Emulator',
                    //   app: 'br.com.bringupapp', // will be set later
                    //   noReset: true,
                    //   fullReset: false
                    // }
                    {
                      'appium-version': '1.6',
                      platformName: 'Android',
                      platformVersion: '6.0.1',
                      deviceName: 'Android Emulator',
                      appPackage: 'br.com.bringupapp', // will be set later
                      appActivity: '.BringUp',
                      noReset: true,
                      fullReset: false
                    }


    );
    
    //APP A SER INSTALADO
    //var androidApiDemos = "https://build.phonegap.com/apps/1970105/download/android";
    //rodar rodar-local-server.js antes de iniciar mocha
    
    //var androidApiDemos = "http://localhost:3000/BringUp-debug.apk";
    //desired.app         = androidApiDemos;
    
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
      .contexts()
      .then(function (contexts) { // get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
          console.log('contextos',contexts);
          return driver.context(contexts[1]); // choose the webview context
      })
      //.elementByCss('.button.button-positive')
      //.click()

      //selecionar ele

      .elementByXPath("/html/body/ion-nav-view/ion-view/ion-side-menus/ion-side-menu-content/ion-nav-view/ion-view/adiciona-conteudo/div/div[1]/button")
      .click()
      
      .elementByXPath("/html/body/div[2]/div/div[2]/div/form/ion-list/div/label[2]/input")
      .click()
      .clear()
      .sendKeys("viniciusferreirawk@gmail.com")

      .elementByXPath("/html/body/div[2]/div/div[2]/div/form/ion-list/div/label[3]/input")
      .click()
      .clear()
      .sendKeys("gree")


      .elementByXPath("/html/body/div[2]/div/div[2]/div/form/ion-list/div/div/div[1]/button")
      .click()

      .waitForElementByCss('.loading-container', asserters.isNotDisplayed , 10000)
  });
  

  it("logout",function(){
      return driver
      .contexts()
      .then(function (contexts) { // get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
          console.log('contextos',contexts);
          return driver.context(contexts[1]); // choose the webview context
      })
      

      //espera o loading sumir isDisplayed - isNotDisplayed - olhar asserters
      //.waitForElementByCss('.loading-container', asserters.isNotDisplayed , 10000)
      .waitForElementByCss('ion-header-bar button', asserters.isDisplayed , 10000)
      .then(function(el){
          el.click();
          // console.log("######");
      })
      .waitForElementByCss('button[menu-close]', asserters.isDisplayed , 10000)
      .then(function(el){
          el.click();
          // console.log("######");
      })
      .waitForElementByCss(".popup-buttons .button-positive", asserters.isDisplayed , 10000)
      .then(function(el){
          el.click();
          // console.log("######");
      })

      // .elementByXPath("/html/body/div[3]/div/div[3]/button[2]")
      // .click()
  })  

});
