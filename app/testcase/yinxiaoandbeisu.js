// 右键-音效调节 2级 选择音效 + 倍速

const puppeteer = require('puppeteer');

puppeteer.launch(
    {
        headless: true, // 开启界面,
        timeout: 30 * 1000,
        // devtools: true,  // 开启开发者控制台  
        //设置每个步骤放慢200毫秒
        slowMo: 200,
        //设置打开页面在浏览器中的宽高
        defaultViewport: null,
        args: ['--start-maximized'],
        ignoreDefaultArgs: ['--enable-automation'],
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    }
).then(async browser => {
    const page = await browser.newPage();
    // console.log(puppeteer.executablePath())
    try {
        // 设置 浏览器视窗
        // await page.setViewport({
        //     width: 1920,
        //     height: 960,
        // });
        await page.goto('https://www.bilibili.com/video/BV1154y1m7j1');

        await page
            .waitForSelector('.bilibili-player-video-btn-speed-name')
            .then(async () => {
                try {
                    const timer = await page.$('.bilibili-player-video-btn-speed-name');
                    await timer.hover({
                        delay: 1500
                    })
                } catch (e) {
                    console.log('执行失败 error: ', e)
                }
            });

        await page
            .waitForSelector('.bilibili-player-video-btn-speed-menu-wrap')
            .then(async () => {
                try {
                    const timer = await page.$('.bilibili-player-video-btn-speed-menu-wrap');
                    let box = await timer.boundingBox();
                    const x = box.x// + (box.width / 3);
                    const y = box.y + (box.height / 2) - 100;
                    await page.mouse.click(x, y, {
                        delay: 1500
                    });
                } catch (e) {
                    console.log('执行失败 error: ', e)
                }
            });

        await page
            .waitForSelector('.bilibili-player-video-top')
            .then(async () => {
                try {
                    const playtype = await page.$('.bilibili-player-video-top');
                    let box = await playtype.boundingBox();
                    // console.log(box)
                    const x = box.x + (box.width / 2);
                    // console.log(x)
                    const y = box.y + (box.height / 2);
                    // console.log(y)
                    await page.mouse.click(x, y, {
                        button: "right",
                        delay: 1500
                    });
                } catch (e) {
                    console.log('执行失败 error: ', e)
                }
            });

        await page
            .waitForSelector('.bilibili-player-context-menu-origin')
            .then(async () => {
                try {
                    const playtype = await page.$('.bilibili-player-context-menu-origin');
                    let box = await playtype.boundingBox();
                    // console.log(box)
                    const x = box.x + (box.width / 2);
                    // console.log(x)
                    const y = box.y + (box.height / 2) - 30;
                    // console.log(y)
                    await page.mouse.click(x, y, {
                        // button: "right",
                        delay: 1500
                    });
                } catch (e) {
                    console.log('执行失败 error: ', e)
                }
            });

        await page
            .waitForSelector('.bl-audio-panel-left')
            .then(async () => {
                try {
                    const playtype = await page.$('.bl-audio-panel-left');
                    let box = await playtype.boundingBox();
                    // console.log(box)
                    const x = box.x + (box.width / 2);
                    // console.log(x)
                    const y = box.y + (box.height / 2) - 30;
                    // console.log(y)
                    await page.mouse.click(x, y, {
                        // button: "right",
                        delay: 1500
                    });

                    // 音效倍速
                    const result = await page.evaluate('player.getPlayerState().audioEffect.gain');

                    if (result !== 0) {
                        const owncase = `
                        获取页面元素 page.$('.bilibili-player-context-menu-origin'); 
                        执行 hover 事件
                        获取页面元素 page.$('.bl-audio-panel-left'); 
                        执行 click 事件
                        断言取值：player.getPlayerState().audioEffect.gain
                        ` + '结果为： ' + result
                        console.log(owncase)
                    } else {
                        console.log('实际值与预期值不符，实际值为：', result, ' 请检查原因')
                    }
                } catch (e) {
                    console.log('执行失败 error: ', e)
                }
            });


        await browser.close({
            delay: 3000
        });

        // await page.screenshot({ path: 'D:/bilibili/imt-server/uploads/screenshot.png' });
        // await browser.close();

    } catch (error) {
        console.log('error: ', error);
    }

});


