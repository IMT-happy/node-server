// 弹出音量并且调整音量
const { Builder, By, Key, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const edgedriver = require('msedgedriver');   //If this driver is already on your system, then no need to install using npm.

(async function () {  // https://www.bilibili.com/video/BV1154y1m7j1
    try {
        let options = new edge.Options()
            .addArguments('-headless')
        let service = await new edge.ServiceBuilder(edgedriver.path);
        let driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .setEdgeService(service).build();

        await driver.get('https://www.bilibili.com/video/BV1154y1m7j1')
        // await driver.manage().window().maximize();
        await driver.sleep(5000)
        let button = await driver.wait(until.elementLocated(By.className('bilibili-player-iconfont-volume-max')), 5000);
        const actions = driver.actions({ bridge: true });
        actions.move({ origin: button }).perform();
        await driver.sleep(1000)
        const list = await driver.findElement({ className: 'bilibili-player-video-volumebar' })
        await list.click()
        await driver.sleep(2000)
        const results = await driver.executeScript(function () {
            //调用JavaScript获取当前视频时长
            const data1 = localStorage.getItem('bilibili_player_settings');
            var data = JSON.parse(data1);
            var result = data.video_status.volume;
            return result
        })
        if (results === 0.5) {
            const owncase = `
            获取页面元素 page.$('.bilibili-player-iconfont-volume-max'); 
            执行 hover 事件
            获取页面元素 page.$('.bilibili-player-video-volumebar'); 
            进行 boundingBox 块级元素坐标获取
            执行 mouse.click(x, y) 事件
            断言取值：localStorage.bilibili_player_settings.video_status.volume
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