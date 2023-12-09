import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://cloudtesting.contosotraders.com/');
  await page.getByRole('link', { name: 'Laptops' }).first().click();
  await page.getByRole('heading', { name: 'Microsoft Surface Pro 7 PUV-' }).click();
  await page.getByRole('button', { name: 'Add To Bag' }).click();
  await expect(page.getByLabel('cart')).toContainText('1');
  await page.getByLabel('cart').click();
  await page.getByRole('button', { name: '+' }).click();
  await expect(page.locator('#root')).toContainText('Qty : 2');
  await page.getByRole('button', { name: '-' }).click();
  await expect(page.locator('#root')).toContainText('Qty : 1'); 
});