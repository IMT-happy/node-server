// 关闭弹幕

const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const ie = require('selenium-webdriver/ie');
const iedriver = require('iedriver');   //If this driver is already on your system, then no need to install using npm.

let options = new ie.Options()
    .addArguments('-headless')

var driver = new webdriver.Builder()
    .setIeOptions(options)
    .forBrowser('internet explorer')
    .build();

(async function () {  // https://www.bilibili.com/video/BV1154y1m7j1
    try {
        await driver.get('https://www.bilibili.com/video/BV1154y1m7j1')
        // await driver.manage().window().maximize();
        await driver.sleep(10000)
        let buttonstart = await driver.wait(until.elementLocated(By.className('bilibili-player-video-danmaku-switch')), 5000);
        await buttonstart.click()
        await driver.sleep(2000)
        const results = await driver.executeScript(function () {
            //调用JavaScript获取当前视频时长  window.player.getCurrentTime()
            var result = window.player.getPlayerState().danmaku.show
            return result
        })
        if (results) {
            const owncase = `
                        player.getPlayerState().danmaku.show
                                ` + '结果为： ' + results
            console.log(owncase)
        } else {
            console.log('实际值与预期值不符，实际值为：', results, ' 请检查原因')
        }
        await driver.sleep(1000)
        await driver.quit();
    } catch (e) {
        await driver.quit();
        console.log('执行失败 error: ', e)
    }
})()