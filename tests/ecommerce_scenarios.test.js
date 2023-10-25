// @ts-check
import { test, expect } from '@playwright/test';


//test.use({ viewport: { width: 1280, height: 721 } ,browserName: 'chromium'});

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('https://magento.softwaretestingboard.com/');
});

test('to verify that the user is not login- "sign in" button is available- cart is empty', async ({ page }) => {
  await page.locator('div[class="panel header"] li[data-label="or"]').isVisible()
  await expect(page.locator('div[class="panel header"] li[data-label="or"]')).toContainText('Sign In')
  await page.locator('.action.showcart').click()
  const prelogincartmessage = page.locator('.subtitle.empty');
  await expect(prelogincartmessage).toContainText('You have no items in your shopping cart.')
});

test('to verify that when searching some dress data and no results found', async ({ page }) => {
  let invalidsearchvalue = "iphone"
  await page.locator('#search').type(invalidsearchvalue)
  await page.locator('#search').press('Enter')

  const errormessage = page.locator('div[class="message notice"] div:nth-child(1)')
  await expect(errormessage).toContainText('Your search returned no results.')

});

test('to verify the- add to cart in prelogin', async ({ page }) => {
  let validsearchvalue = "shirt"
  await page.locator('#search').type(validsearchvalue)
  await page.locator('#search').press('Enter')
  await page.waitForTimeout(10000)

  //select the first product in the list
  await page.locator('.products.list.items.product-items li').first().click()
  await page.locator('#option-label-size-143-item-166').click()
  await page.locator('#option-label-color-93-item-50').click()
  await page.locator('button[id="product-addtocart-button"] span').click()
  const cart1 = await page.locator('.action.showcart')
  cart1.click()
  await expect(page.locator('.items-total .count')).toHaveText('1')

  //select the second product in the list
  await page.locator('.products.list.items.product-items li').nth(1).click()
  await page.locator('#option-label-size-143-item-166').click()
  await page.locator('#option-label-color-93-item-50').click()
  await page.locator('button[id="product-addtocart-button"] span').click()
  const cart2 = await page.locator('.action.showcart')
  cart2.click()
  await expect(page.locator('.items-total .count')).toHaveText('2')

  //checkout the cart, but site navigates to shipping screen
  await page.locator('#top-cart-btn-checkout').click()
  expect(await page.waitForSelector('.opc-progress-bar-item._active')).toBeTruthy()
  await page.locator('.opc-progress-bar-item._active').isVisible()
});