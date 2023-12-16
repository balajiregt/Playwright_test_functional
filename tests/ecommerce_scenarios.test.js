// @ts-check
import { test, expect } from '@playwright/test';


//test.use({ viewport: { width: 1280, height: 721 } ,browserName: 'chromium'});

test('to verify that the user is not login- "sign in" button is available- cart is empty', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/')
  await page.locator('div[class="panel header"] li[data-label="or"]').isVisible()
  await expect(page.locator('div[class="panel header"] li[data-label="or"]')).toContainText('Sign In')
  await page.locator('.action.showcart').click()
  const prelogincartmessage = page.locator('.subtitle.empty');
  await expect(prelogincartmessage).toContainText('You have no items in your shopping cart.')
  await page.close()
});

test('to verify the- add to cart in prelogin', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/')
  let validsearchvalue = "shirt"
  await page.locator('#search').fill(validsearchvalue)
  await page.locator('#search').press('Enter')

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
  await expect(page.locator('.items-total .count')).toHaveText('1')

  //checkout the cart, but site navigates to shipping screen
  await page.locator('#top-cart-btn-checkout').click()
  await page.locator('.opc-progress-bar-item._active').isVisible();
  await page.locator('.opc-progress-bar-item._active').isVisible()
});

test('to verify that when searching some dress data and no results found', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/',{ waitUntil: 'networkidle' })
  let invalidsearchvalue = "iphone"
  await page.locator('#search').fill(invalidsearchvalue)
  await page.locator('#search').press('Enter')
  const errormessage = page.locator('div[class="message notice"] div:nth-child(1)')
  await expect(errormessage).toContainText('Your search returned no results.')
  await page.close()
});