import { test, expect } from '@playwright/test';

// Define a global variable to hold context.
let context;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext({
    storageState: 'C:/Users/kbala/OneDrive/Desktop/Playwright_projects/project1_functional/tests/Sanity_testing/auth.json', 
  });
})

//utility function for newpage and the baseurl
async function setupPage(context) {
  const page = await context.newPage();
  await page.goto('https://bookcart.azurewebsites.net/');
  return page;
}

test('check the username', async () => {
  const page = await context.newPage(); 
  await page.goto('https://bookcart.azurewebsites.net/');
  await page.getByText('waheedahiya').isVisible()
  await page.locator('.mat-focus-indicator.mat-menu-trigger.mat-button.mat-button-base.ng-star-inserted').click();
  await page.getByRole('menuitem', { name: 'My Orders' }).click();
  await page.close()
});

test('Verify the shopping cart-CheckOut', async () => {
  const page = await setupPage(context); //call the setupPage func to reuse newPage() for this test
  await page.locator('button[class="mat-focus-indicator mat-icon-button mat-button-base"] mat-icon:nth-child(1)').click();
  let emptycart=await page.getByText('Shopping cart is empty')
  let cartitems=await page.getByRole('heading', { name: 'Cart Items' }).nth(0)
  await expect(emptycart.or(cartitems)).toBeVisible();
  if(cartitems)
  await page.getByRole('button', { name: 'CheckOut' }).click()
  await expect(page.getByRole('heading', { name: 'Check Out' })).toBeVisible()
  await page.close()
});

test('Verify the shopping cart-Clearcart', async () => {
  const page = await setupPage(context);//call the setupPage func to reuse newPage() for this test
  await page.locator('button[class="mat-focus-indicator mat-icon-button mat-button-base"] mat-icon:nth-child(1)').click()
  let cartitems=await page.getByRole('heading', { name: 'Cart Items' })
  if(cartitems)
  await page.getByText('Clear cart').click()
  expect(await page.getByText(' Shopping cart is empty')).toBeVisible()
  await page.close()
});

test('Verify the- Add to cart', async () => {
  const page = await setupPage(context); //call the setupPage func to reuse newPage() for this test
  await page.locator('mat-card-content').filter({ hasText: 'HP2₹235.00shopping_cart Add to Cart' }).getByRole('button', { name: 'Add to Cart' }).click()
  await page.locator('mat-card-content').filter({ hasText: 'HP3₹213.00shopping_cart Add to Cart' }).getByRole('button', { name: 'Add to Cart' }).click()
  await page.close()
});