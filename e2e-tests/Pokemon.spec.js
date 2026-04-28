const { describe, test, expect } = require("@playwright/test");

describe("Navigation from the Home page is Possible", () => {
  test("Clicking kakuna changes the page", async ({ page }) => {
    await page.goto("/");
    await page.getByText("kakuna").locator("..").click();

    await expect(page.getByText("shed skin")).toBeVisible();
  });
});
