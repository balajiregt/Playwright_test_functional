import { test, expect } from '@playwright/test';

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

// Create window one object
test('new window-when second window resource url is known', async ({ context,page }) => {
  const pageOne = await context.newPage();
  await pageOne.goto('https://practice-automation.com/window-operations/')
  await pageOne.locator('button[onclick="newWindow()"] b').click()

  // Create window two object
  const pageTwo = await context.newPage();
  await pageTwo.goto('https://automatenow.io/')
  await pageTwo.locator('#nav_toggle').click()
  await pageTwo.getByText('Training').isVisible()
});

test('new window accessing-when second window resource url is not known', async ({ page }) => {
  // Create window one object
  await page.goto('https://practice-automation.com/window-operations/')

  const [pageTwo] = await Promise.all([
    page.waitForEvent('popup'),                                      //listener
    await page.locator('button[onclick="newWindow()"] b').click()    //event on the promise page    
  ])
  expect(pageTwo.url()).toContain('automatenow')
  await pageTwo.locator('#nav_toggle').click()
  await pageTwo.getByText('Training').isVisible()
});

test('new alert accessing-click ok', async ({ page }) => {
  // Create window one object
  await page.goto('https://practice-automation.com/popups/')
  await page.locator('#confirm').click()

  page.on('dialog', (dialog) => {
    dialog.accept()
    expect(page.getByText('OK it is!')).toBeVisible()
  })
  page.on('dialog', (dialog) => {
    dialog.dismiss()
    expect(page.getByText('Cancel it is!')).toBeVisible()
  })
});

test('new prompt accessing', async ({ page }) => {
  // Create window one object
  await page.goto('https://practice-automation.com/popups/')
  await page.locator('button[id="prompt"] b').click()

  page.on('dialog', (dialog) => {
    dialog.accept('hello world')
    expect(page.getByText('Nice to meet you, hello world!')).toBeVisible()
  })
  page.on('dialog', (dialog) => {
    dialog.dismiss()
    expect(page.getByText('Fine, be that way..')).toBeVisible()
  })
});

