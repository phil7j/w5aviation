const { test, expect } = require("@playwright/test");

test("homepage smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/W5 Aviation/i);
  await expect(
    page.getByRole("heading", { name: "Aircraft Records Management" }),
  ).toBeVisible();
});
