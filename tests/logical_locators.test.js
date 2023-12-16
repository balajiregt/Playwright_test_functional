import { test, expect } from '@playwright/test';

test('test with locator.or', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/dialog-boxes/');
  const frame = page.frameLocator('.demo-frame >> nth=0');

  // Define the two locators
  const newUserButton = frame.locator('button:has-text("Create new user")')
  const createAccountButton = frame.locator('button:has-text("Create an account")')

  // Use locator.or to wait for either of the two buttons to be visible
  await expect(newUserButton.or(createAccountButton).first()).toBeVisible();

  // Click the visible button
  if (await newUserButton.isVisible()) {
    await newUserButton.click();
    await createAccountButton.click();
  } else if (await createAccountButton.isVisible()) {
    await createAccountButton.click();
  }
});


test('using locator.and',async({page})=>{
 await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
 const username=page.locator('#username')
 const password=page.locator('#password')
 const signin_defaultstate = page.getByRole('button').and(page.locator('[disabled="disabled"]'))
 await expect(signin_defaultstate).toBeVisible()
 await username.fill('test')
 await password.fill('test')
 const signin_newstate=page.getByRole('button')
 await expect(signin_newstate).not.toHaveProperty('disabled')
 if(signin_newstate.isVisible())
    await signin_newstate.click()
})