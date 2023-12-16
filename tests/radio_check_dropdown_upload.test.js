const { test, expect } = require('@playwright/test');

test.describe('Checkbox-Radio-Dropdowns', () => {

  test('test - checkbox', async ({ page }) => {
    await page.goto('https://letcode.in/test')
    await page.locator('body > app-root:nth-child(1) > app-test-site:nth-child(3) > section:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > app-menu:nth-child(1) > div:nth-child(1) > footer:nth-child(3) > a:nth-child(1)').click()

    //first checkbox- remember me
    //defaultly it is checked
    const terms = await page.locator('(//input[@type="checkbox"])[1]')
    //assert for checked
    await terms.isChecked()
    //now uncheck by using setchecked
    await terms.setChecked()

    //second checkbox- terms and conditions
    //now check the box
    await page.check('(//input[@type="checkbox"])[2]')

    //uncheck the box
    await page.locator('(//input[@type="checkbox"])[2]').uncheck()

    //now check by using setchecked
    await page.locator('(//input[@type="checkbox"])[2]').setChecked(true)
  });

  test('test - radiobox', async ({ page }) => {
    await page.goto('https://letcode.in/test')
    await page.getByRole('link', { name: 'Toggle' }).click();
    
    //first radibutton- bar
    const selectedradio = await page.locator('//input[@id="notfoo"]')
    await selectedradio.isChecked()

    //second radiobutton- foo
    await page.check('//input[@id="foo"]')
    await page.locator('//input[@id="foo"]').isChecked()
  });

  test('test - dropdown- iterate the option values ', async ({ page }) => {   
    // page.on('console', msg => {
    //   if (msg.type() === 'error')
    //     console.log(`Error text: "${msg.text()}"`);

    //   else{
    //     console.log('console messages:',msg.text())
    //   }
    // });
     
    // Listen for all console logs
    await page.goto('https://letcode.in/test')
    await page.locator('//a[normalize-space()="Drop-Down"]').click()

    //first dropdown- values list once down arrow is clicked
    const dropdownOne = await page.locator('#fruits')
    await dropdownOne.click()

    //version 1.29: locator.selectOption() matches now by value or label:
    //select by id [0==Apple]
    await dropdownOne.selectOption('0')
    await page.waitForTimeout(5000)
    await page.locator('.subtitle').getByText('You have selected Apple').isVisible()

    //select by label [1==Apple]
    await dropdownOne.selectOption('Mango')
    await page.locator('.subtitle').getByText('You have selected Mango').isVisible()

      var langlist = []
      for (const row of await page.locator('#lang > option').all())
      langlist.push(await row.innerText());
      console.log('The languages are',langlist)
      console.log('The languages length:',langlist.length)
})

})