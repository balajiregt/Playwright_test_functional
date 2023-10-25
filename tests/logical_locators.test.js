import { test, expect } from '@playwright/test';

test('using locator.or', async ({ context, page }) => {
    const pageTwo = await context.newPage();
    await pageTwo.goto('https://www.google.com/')
    expect(pageTwo.url()).toContain('google')

    const signinalert = await pageTwo.frameLocator('iframe').getByText('No Thanks')
    const searchbar = await pageTwo.locator('textarea[title="Search"]')

//assert to check the visibility of signinalert or searchbar
   await expect(signinalert.or(searchbar)).toBeVisible();
    if (await signinalert.isVisible())
        signinalert.click();
    else
        await searchbar.type('playwright.dev').press('Enter')

    await searchbar.type('playwright.dev')
    await searchbar.press('Enter')
});

test('using locator.and',async({page})=>{
 await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
 const username=page.locator('#username')
 const password=page.locator('#password')
 const signin_defaultstate = page.getByRole('button').and(page.locator('[disabled="disabled"]'))
 await expect(signin_defaultstate).toBeVisible()
 await username.type('test')
 await password.type('test')
 const signin_newstate=page.getByRole('button')
 await expect(signin_newstate).not.toHaveProperty('disabled')
 if(signin_newstate.isVisible())
    await signin_newstate.click()
})