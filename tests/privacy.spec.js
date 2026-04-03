const { test, expect } = require("@playwright/test");

test("privacy page renders with shared site styling", async ({ page }) => {
  await page.goto("/privacy.html");

  await expect(page).toHaveTitle(/Privacy Policy/i);
  await expect(
    page.getByRole("heading", { name: "Privacy Policy", level: 1 }),
  ).toBeVisible();
  await expect(page.getByText("Legal", { exact: true })).toBeVisible();

  const armLink = page.getByRole("link", { name: "Aircraft Records Management" });
  if (!(await armLink.isVisible())) {
    const menuToggle = page.getByRole("button", { name: "Toggle navigation" });
    if (await menuToggle.isVisible()) {
      await menuToggle.click({ force: true });
    }
  }

  await expect(armLink).toBeVisible();
});

test("privacy page footer links are present", async ({ page }) => {
  await page.goto("/privacy.html");

  const privacyLink = page.locator(".privacy-link a");
  await expect(privacyLink).toHaveAttribute("href", "privacy.html");

  const creditLink = page.locator(".credit a");
  await expect(creditLink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/phil7j",
  );
});
