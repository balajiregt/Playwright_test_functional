import { test, expect } from '@playwright/test';

test('interact with a new window', async ({ browser }) => {
  // Launch a new browser context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to your target page
  await page.goto('https://practice-automation.com/window-operations/');
  
  // Set up an event listener for the 'popup' event before triggering the new window
  const [newWindow] = await Promise.all([
    context.waitForEvent('page'), // Waits for the popup event
    page.click('button[onclick="newWindow()"] b') // Replace with the selector that causes a new window to open
  ]);

  // Now you can interact with the new window
  //await newWindow.waitForLoadState(); // Wait for the new page to load
  await expect(newWindow).toHaveURL('https://automatenow.io'); // Replace with the expected URL of the new window

  // Interact with the new window
  await newWindow.locator('#search_toggle').click();
  await newWindow.getByPlaceholder('Search', { exact: true }).fill('playwright');

  // Close the new window if needed
  await newWindow.close();

  // Continue with other interactions on the original page
  //await page.click('another-selector');

  // Clean up
  await context.close();
});

test('new tab accessing', async ({ context }) => {
  const page = await context.newPage()
  await page.goto('https://automationpanda.com/bdd/')

  const [newtab] = await Promise.all([
    context.waitForEvent('page'),                          //listener
    page.locator('a[href="https://cucumber.io/"]').click()//event on the promise page
  ])

  console.log(await newtab.title()) //child tab
  console.log(await page.title()) //parent tab
})

test('new alert accessing-click ok', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://practice-automation.com/popups/');

  // Add an event listener for the dialog
  page.once('dialog', async (dialog) => {
    await dialog.accept(); // Clicks 'OK' on the dialog
  });

  // Trigger the confirm dialog
  await page.locator('#confirm').click();

  // Wait for the text 'OK it is!' to be visible and assert its presence
  await expect(page.locator('text=OK it is!')).toBeVisible();
});


test('new prompt accessing', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://practice-automation.com/popups/');
  var prompttext = 'hello world';
  // Add an event listener for the dialog
  page.on('dialog', async (dialog) => {
    
    await dialog.accept(prompttext);  // Respond to the dialog
  });

  // Trigger the prompt dialog
  await page.locator('#prompt').click();

  // Wait for the text to be visible and assert its presence
  const responseText = `Nice to meet you, ${prompttext}!`;
  await expect(page.locator(`text=${responseText}`)).toBeVisible();
});

