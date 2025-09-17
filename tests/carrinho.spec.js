import { test, expect } from '@playwright/test';

test.describe('Carrinho de Compras', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Garante que entrou na tela de inventário
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Deve adicionar produtos ao carrinho e finalizar compra com sucesso', async ({ page }) => {
    // Adiciona 3 produtos ao carrinho
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();


    // Acessa o carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();
    const cartHeader = page.getByText('Your Cart');
    await expect(cartHeader).toBeVisible();
    
    // Verifica se os produtos estão no carrinho
    await expect(page.locator('#item_4_title_link > .inventory_item_name')).toBeVisible();
    await expect(page.locator('#item_0_title_link > .inventory_item_name')).toBeVisible();
    await expect(page.locator('#item_1_title_link > .inventory_item_name')).toBeVisible();

    // Clicar no botão checkout
    await page.locator('[data-test="checkout"]').click();
    const checkoutHeader = page.getByText('Checkout: Your Information');
    await expect(checkoutHeader).toBeVisible();
    

    // Preencher informações
    await page.locator('[data-test="firstName"]').fill('Kenia');
    await page.locator('[data-test="lastName"]').fill('Reis');
    await page.locator('[data-test="postalCode"]').fill('12345000');

    // Continuar
    await page.locator('.btn_primary').click();
    const subheader = page.getByText('Checkout: Overview');
    await expect(subheader).toBeVisible();


    // Finalizar compra
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});