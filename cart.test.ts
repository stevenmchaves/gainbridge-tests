import { test } from './fixtures';
import { expect } from '@playwright/test';

test('Cart page title check', async ({ page }) => {
  await expect(page).toHaveTitle(/Cart Page/);
});

test('Cart page Look and feel', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Your Shopping Cart' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('section')).toBeVisible();
  await expect(page.locator('#checkoutBtn')).toHaveText('Checkout');
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
  await expect(page.locator('.cart-item')).toHaveCount(3); // Defaults to 3 items in the cart
  await expect(page.getByText('Kid’s T-shirt – Size M')).toBeVisible();
  await expect(page.locator('#cartContainer')).toContainText('$85.00');
  await expect(page.locator('#cartContainer')).toContainText('$14.50');
  await expect(page.locator('#cartTotal')).toContainText('Total: $105.99');
});

test.describe('Cart page functionality', () => {
  
  test('Remove Items functionality', async ({ page }) => {
    await page.getByTestId('123').getByRole('button').click();
    await expect(page.locator('#remove-confirm-modal')).toContainText(
      'Are you sure you want to remove this item?',
    );
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator('.cart-item')).toHaveCount(2); // Now 2 items in the cart
    await page.getByTestId('456').getByRole('button').click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator('.cart-item')).toHaveCount(1); // Now 1 items in the cart
    await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator('.cart-item')).toHaveCount(0); // Now 0 items in the cart
    await expect.soft(page.locator('#cartTotal')).toContainText('Total: $0.00');
  });

  test('Remove Item Out of Stock functionality', async ({ page }) => {
    await page.getByTestId('789').getByRole('button').click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeEnabled();
  });

  test('Limited availability item', async ({ page }) => {
    test.slow();
    const limited_stock = page.getByText('Kid’s T-shirt – Size M');
    limited_stock.locator('span.availability-warning').hover();
    await expect(page.locator('span.icon-warning')).toBeVisible();
    await expect(page.getByText('Limited availability')).toBeVisible();
  });

  test('Discount pricing - 2+ minute test', async ({ page }) => {
    test.setTimeout(180000);
    // await page.getByText('!').click();
    await expect(
      page.locator('div').filter({ hasText: /^Bluetooth Headphones15% off/ }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page
      .locator('div')
      .filter({ hasText: /^Kid’s T-shirt – Size M/ })
      .getByRole('button')
      .click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page
      .locator('div')
      .filter({ hasText: /^Kid’s T-shirt – Size M!\$19\.99Remove$/ })
      .getByRole('button')
      .click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeEnabled();
  });

  test('Increment quantity', async ({ page }) => {
    const bluetooth_item = page.locator('div').filter({ hasText: /^Bluetooth Headphones15% off/ });
    await bluetooth_item.getByRole('spinbutton').clear();
    await bluetooth_item.getByRole('spinbutton').fill('2');
    await expect.soft(bluetooth_item.getByRole('spinbutton')).toHaveValue('2');
    await expect.soft(page.locator('#cartTotal')).toContainText('Total: $189.99');
    await bluetooth_item.getByRole('spinbutton').fill('10');
    await expect(bluetooth_item.getByRole('spinbutton')).toHaveValue('10');
    await expect.soft(page.locator('#cartTotal')).toContainText('Total: $869.99');
  });

  test('Decrement quantity', async ({ page }) => {
    const bluetooth_item = page.locator('div').filter({ hasText: /^Bluetooth Headphones15% off/ });
    await bluetooth_item.getByRole('spinbutton').clear();
    await bluetooth_item.getByRole('spinbutton').fill('0');
    await expect.soft(bluetooth_item.getByRole('spinbutton')).toHaveValue('0');
    await expect.soft(page.locator('#cartTotal')).toContainText('Total: $19.99');
  });
});
