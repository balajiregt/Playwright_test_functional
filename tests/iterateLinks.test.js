import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://reference-tryout-api.herokuapp.com/docs');
});

test.describe('Iterate and validate the landing page urls', () => {
    test('test1-Iterate the links and validate the url paths in the destination url', async ({ page }) => {

        //save the ul[2] list count numbers
        var linkcount = await page.locator('//ul[2] //li').count()
        console.log('link count is: ', linkcount)
        for (let i = 1; i <= linkcount + 1; i++) {
            if (i === linkcount + 1) {
                console.log('Iteration is over')
                break;
            }

            //save the ul[2] list href text content   
            var link_innertext = await page.locator(`//ul[2] //li[${i}] /a[@href]`).innerText()

            console.log('list item href: ', link_innertext)

            //click the list href link- index
            await page.locator('ul li a[href]').nth(i).click()

            //assert the navigated new page url ->>> with the href link text
            await expect(page).toHaveURL('https://reference-tryout-api.herokuapp.com' + link_innertext);
            await page.goBack()
        }
        await page.close()
    })
});
