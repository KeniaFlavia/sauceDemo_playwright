// tests/login.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Login - SauceDemo', () => {
  
  test('Deve fazer login com sucesso', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // ✅ Validação estável com título "Products"
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Não deve logar com senha inválida', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'abcdef');
    await page.click('[data-test="login-button"]');

    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Não deve logar com username não cadastrado', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]', 'usarname_invalido');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Fluxo completo: login e logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // ✅ Verificação pelo título Products
    await expect(page.locator('.title')).toHaveText('Products');

    // Logout
    await page.click('#react-burger-menu-btn');
    await page.click('[data-test="logout-sidebar-link"]');

    // Verifica se voltou para a tela de login
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
