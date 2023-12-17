// Importing the required modules using ES6 syntax
import { test, expect } from "@playwright/test";

test.describe('qbank server login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://qbank.accelq.com/')
        await page.fill('#qb-username','qbankadmin')
        await page.fill('#qb-password','qbTrnPass1&')
        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test('verify the user name', async ({ page }) => {
      
        await page.waitForURL('**\/account/acsum')

        // Validate successful login
        await page.getByRole('link', { name: 'Thomas' }).isVisible()
        const logoutButton = await page.getByText('Log out')
        expect(await logoutButton.isVisible()).toBeTruthy();
    });
});