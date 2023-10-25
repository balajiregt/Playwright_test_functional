import { test, expect } from '@playwright/test';
test.beforeEach(async ({page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').type('standard_user')
    await page.locator('#password').type('secret_sauce')
    await page.locator('#login-button').click();
});

test('using filter.has locator',async({page})=>{
    await page.locator('.inventory_list button').nth(0).click()
    await page.locator('.inventory_list button').nth(1).click()
    await page.locator('.shopping_cart_link').click()
    const cartlist=await page.locator('div.cart_list')
    await cartlist
            .filter({has:page.locator('div.cart_item')})
            .isVisible()
})

//comes from version 1.33
test('using filter.hasNot locator',async({page})=>{
    //await page.locator('.inventory_list button').nth(0).click()
    //await page.locator('.inventory_list button').nth(1).click()
    await page.locator('.shopping_cart_link').click()
    const cartlist=await page.locator('div.cart_list')
    await cartlist
            .filter({hasNot:page.locator('div.cart_item')})
            .isVisible()
})

test('using filter.hasText locator',async({page})=>{
    await page.locator('.inventory_list button').nth(0).click()
    await page.locator('.inventory_list button').nth(1).click()
    await page.locator('.shopping_cart_link').click()
    const cartlist=await page.locator('div.cart_list')
    await cartlist
            .filter({has:page.locator('div.cart_item')})
            .filter({hasText: 'Backpack'})
            .click()
})

//comes from version 1.33
test('using filter.hasNotText locator',async({page})=>{
    //await page.locator('.inventory_list button').nth(0).click()
    await page.locator('.inventory_list button').nth(1).click()
    await page.locator('.shopping_cart_link').click()
    const cartlist=await page.locator('div.cart_list')
    await cartlist
            .filter({has:page.locator('div.cart_item')})
            .filter({hasNotText: 'Backpack'})
            .click()
})