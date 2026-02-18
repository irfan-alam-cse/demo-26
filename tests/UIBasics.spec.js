const {test, expect} = require('@playwright/test')

test('Browser Context Playwright Test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
});

test('Page Playwright Test', async ({page})=>{

    await page.goto('https://google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('Playwright Test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signIn = page.locator("[name='signin']");
    const cardTitles = page.locator('.card-body a');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('input#username').fill('rahuls');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await page.locator("[name='signin']").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    //console.log(await page.locator('.card-body a').first().textContent());
    await page.locator('.card-body a').first().waitFor();
    //console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.allTextContents());

});

test('Assignment 16', async ({page})=>{

    let userName = 'testemai3@example.com'
    let password = 'TestfirstName@1'
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    await page.locator('[href*="register"]').click();
    await page.locator('#firstName').fill('rajasuo');
    await page.locator('#lastName').fill('testlastName');
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userMobile').fill('9304209211');
    await page.locator('[formcontrolname="occupation"]').selectOption('Doctor');
    await page.locator('[value="Male"]').click();
    await page.locator('#userPassword').fill(password);
    await page.locator('#confirmPassword').fill(password);
    await page.locator('[formcontrolname="required"]').click();
    await page.locator('#login').click();
    await page.locator('[routerlink="/auth"]').click();
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle'); // not suggested as flaky
    await page.locator("div.card b").first().waitFor();
    console.log(await page.locator("div.card b").allTextContents())
});

test('Playwright Test 1', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signIn = page.locator("[name='signin']");
    const cardTitles = page.locator('.card-body a');
    const documentLink = page.locator('[href*="documents-request"]')
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await page.locator('select.form-control').selectOption('Teacher');
    await page.locator("span.checkmark").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator("span.checkmark").last().isChecked());
    await expect(page.locator("span.checkmark").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(page.locator("#terms")).not.toBeChecked();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

});

test('Child window handling Playwright Test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator('[href*="documents-request"]');
    const userName = page.locator('input#username');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),    //listen for any new page pending,rejected,fulfilled
        documentLink.click()
    ])
    console.log(await newPage.locator('.red').textContent());
    let text = await newPage.locator('.red').textContent();
    console.log(text.split(' ')[4]);
    console.log(text.split(' ')[4].split('@')[1]);
    const user = text.split(' ')[4].split('@')[1];
    await userName.fill(user);
    console.log("=--=--=--=--=")
    console.log(await userName.textContent()); // will not return any value as no value in DOM
    console.log(await userName.inputValue()); // will return the value entered in the input field

});

test(' dynamically find the product to buy from list of products', async ({page})=>{

    let userName = 'testemai3@example.com'
    let password = 'TestfirstName@1'
    const product = 'ZARA COAT 3'
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle'); // not suggested as flaky
    await page.locator("div.card b").first().waitFor();
    console.log(await page.locator("div.card b").allTextContents())
    const index = (await page.locator("div.card b").allTextContents()).indexOf(product);
    console.log(index)
    await page.locator('button.w-10').nth(index).click();
    await page.locator('[routerlink*="cart"]').click();
    expect(await page.locator('.cartSection h3').textContent()).toBe(product)
    await page.locator('li [type="button"]').click();
    expect(await page.locator('.user__name input[type]').inputValue()).toBe(userName)
    await page.locator('.small input').first().fill('245');
    await page.locator('div[class="field"] input[class="input txt"]').fill('First Last');
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind',{delay:150});
    await page.locator('section.ta-results button').first().waitFor();
    const country = await page.locator('section.ta-results button').allTextContents();
    const indexc = await country.indexOf(' India');
    await page.locator('section.ta-results button').nth(indexc).click();
    expect(await page.locator("[style*='lightgray']").textContent()).toBe(userName)
    await page.locator('.action__submit').click();
    const orderId = await page.locator('td label').last().textContent();
    await page.locator('li [routerlink*="myorders"]').click()
    await page.locator('tbody th').first().waitFor();
    const orderlist = await page.locator('tbody th').allTextContents();
    expect(orderlist).toContain(orderId.split(' ')[2]);

    const list = page.locator('tbody tr');
    const count = await list.count();
    for(let i=0; i<count; i++){
        const id = await list.locator('th').nth(i).textContent();
        if(id === orderId.split(' ')[2]){
            await list.nth(i).locator('button:has-text("View")').click();
            break;
        }
    }
    await expect(page.locator('div.email-title')).toHaveText(' order summary ');
    //(5000)
    
});

test(' pw special locators', async ({page})=>{

    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel('Employed').check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("qwerty");
    await page.getByRole("button",{name:"Submit"}).click();
    console.log(await page.getByText('Success! The Form has been submitted successfully!.').isVisible());
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator('app-card').filter({hasText:"Nokia Edge"}).getByRole('button').click();
    
    
    //(5000)
    
});

test("calender handling",async({page})=>{
    const d = '15';
    const m = '6';
    const y = '2028';
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(y).click();
    await page.locator('.react-calendar__year-view__months__month').nth(m-1).click();
    await page.locator('abbr').filter({hasText:d}).click();
    expect(await page.locator('input[class*="day"]').getAttribute("value")).toBe(d);
    expect(await page.locator('input[class*="month"]').getAttribute("value")).toBe(m);
    expect(await page.locator('input[class*="year"]').getAttribute("value")).toBe(y);
    //(1000);
})