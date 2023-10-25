import { test, expect } from '@playwright/test';

const authFile = 'C:/Users/kbala/OneDrive/Desktop/Playwright_projects/project1_functional/tests/Sanity_testing/auth.json';

test('authenticate user', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://bookcart.azurewebsites.net/login');
  await page.locator('#mat-input-0').fill('waheedahiya');
  await page.locator('#mat-input-1').fill('Pass123#');
  await page.locator('.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary').click();
  
  // Wait until the page receives the cookies.
  await page.waitForTimeout(10000)

  // End of authentication steps-save the session states in the json file
  await page.context().storageState({ path: authFile });
})


