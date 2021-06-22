const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

let options = new firefox.Options()
    .setProfile('C:\\Users\\guchenghuan\\AppData\\Local\\Mozilla\\Firefox\\Profiles')
    .setBinary('C:\\Program Files\\Mozilla Firefox\\firefox.exe')
    .addArguments('-headless')
let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

(async function () {  // https://www.bilibili.com/video/BV1154y1m7j1
    try {
        await driver.get('https://www.bilibili.com/video/BV1154y1m7j1')
        // await driver.manage().window().maximize();
        await driver.sleep(5000)
        // 获取播放按钮
        let buttonstart = await driver.wait(until.elementLocated(By.className('bilibili-player-iconfont-start')), 5000);
        // console.log('buttonstart-click')
        // 开始播放
        await buttonstart.click()
        // 播放进行两秒
        await driver.sleep(2000)
        // 再次获取播放内部暂停按钮
        let buttonstop = await driver.wait(until.elementLocated(By.className('bilibili-player-video-wrap')), 5000);
        // console.log('buttonstop-click')
        // 暂停播放
        await buttonstop.click()
        // 等待一秒
        // await driver.sleep(5000)
        // 获取当前播放时长
        const results = await driver.executeScript(function () {
            //调用JavaScript获取当前视频时长
            var result = window.player.getCurrentTime()
            return result
        })
        if (results > 1) {
            const owncase = `
            获取页面元素 page.$('.bilibili-player-video-state'); 
            执行 click 事件
            获取页面元素 page.$('.bilibili-player-video'); 
            执行 click 事件
            断言取值：player.getCurrentTime()
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