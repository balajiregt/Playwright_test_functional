const { test, expect } = require('@playwright/test');
//const { projects, name } = require('../playwright.config');

test.describe('conditional test for validating the element visibility for all the config viewports', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://magento.softwaretestingboard.com/')
    });

    test('Config viewport has- DesktopchromiumView, DesktopFirefoxView, MobilandroidView', async ({ page }) => {
       // await page.locator('a[id="ui-id-4"] span:nth-child(2)').isVisible()
       await expect(page.locator('a[id="ui-id-4"] span:nth-child(2)')).toBeInViewport()
       
        let headermenu = await page.locator('a[id="ui-id-4"] span:nth-child(2)').innerText()
        if ((headermenu == 'Women')) {
            console.log("The tab 'Women' is visible in this viewport")
        }

        else {
            console.log("The tab 'Women' is not visible in this viewport.Click 'Categories' to view 'Women' tab")
          //  await page.locator('.action.nav-toggle').isVisible()
          await expect(page.locator('a[id="ui-id-4"] span:nth-child(2)')).not.toBeInViewport()
        
            await page.locator('.action.nav-toggle').click()
            await page.locator('a[id="ui-id-4"] span:nth-child(2)').isVisible()

        }

    })

});