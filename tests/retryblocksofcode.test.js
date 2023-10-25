// @ts-check
const { test, expect } = require('@playwright/test');

test('testing blocks of code untill they pass', async ({ page }) => {
    //to use block retry
await expect(async ()=>{
        await page.goto('http://www.uitestingplayground.com/clientdelay');
        await page.getByText('Button Triggering Client Side Logic').click()
        await page.locator('#spinner').isVisible()
        await (await page.waitForSelector('#content')).isVisible() 
    }).toPass()
    await page.getByText('Data calculated on the client side.').isVisible()
})

