const {test,expect} = require('@playwright/test')

test.describe.configure({mode:'parallel'});
test('popup',async function({page}){

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.pause()
    // for accepting the popup
    page.on('dialog', d=>d.accept());
    await page.locator('#confirmbtn').click();
    //to hover
    await page.locator('#mousehover').hover();
    //frame handling
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('li [href*="access"]:visible').click();
    const text = await frame.locator('.content-side h2').textContent();
    console.log(text.split(" ")[1]);

})

test('screen shots',async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partial.png'});
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.screenshot({path:'ss.png'});

})

test('visual testing',async ({page})=>{

    await page.goto('https://www.timeanddate.com/worldclock/india/new-delhi');
    expect(await page.screenshot()).toMatchSnapshot('tester.png');
    
})