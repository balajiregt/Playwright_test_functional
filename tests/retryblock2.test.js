// @ts-check
const { test, expect } = require('@playwright/test');

test('testing blocks of code without topass()', async ({ page }) => {
    //to use block retry
        await page.goto('http://www.uitestingplayground.com/clientdelay');
        await page.getByText('Button Triggering Client Side Logic').click()
        await page.locator('#spinner').isVisible()
        await page.locator('#content').isVisible()
        //await page.getByText('Data calculated on the client side.').isVisible()
})
