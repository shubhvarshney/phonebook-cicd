const { test, describe, expect, beforeEach, afterEach } = require('@playwright/test')

const TEST_NAME = 'Test Person'
const TEST_NUMBER = '123-456789'

async function deleteTestPerson(request, name, number) {
  const res = await request.get('/api/persons')
  const persons = await res.json()
  const person = persons.find(p => p.name === name && p.number === number)
  if (person) {
    await request.delete(`/api/persons/${person.id}`)
  }
}

describe('Phonebook', () => {
  beforeEach(async ({ page, request }) => {
    await deleteTestPerson(request, TEST_NAME, TEST_NUMBER)
    await page.goto('/')
  })

  test('page allows adding a new person', async ({ page }) => {
    await page.getByTestId('name').fill(TEST_NAME)
    await page.getByTestId('number').fill(TEST_NUMBER)
    await page.getByRole('button', { name: 'add' }).click()

    const personItem = page.locator('[data-testid="person"]', {
      hasText: TEST_NAME,
    })

    await expect(personItem).toBeVisible()
    await expect(personItem).toContainText(TEST_NUMBER)
  })

  describe('when there are existing persons', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('name').fill(TEST_NAME)
      await page.getByTestId('number').fill(TEST_NUMBER)
      await page.getByRole('button', { name: 'add' }).click()
    })

    test('page allows deleting a person', async ({ page }) => {

      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })

      const personItem = page.locator('[data-testid="person"]', {
        hasText: TEST_NAME,
      })

      await personItem.getByRole('button', { name: 'delete' }).click()
      await expect(personItem).not.toBeVisible()
    })

    test('page shows existing persons', async ({ page }) => {
      const personItem = page.locator('[data-testid="person"]', {
        hasText: TEST_NAME,
      })

      await expect(personItem).toBeVisible()
      await expect(personItem).toContainText(TEST_NUMBER)

      await personItem.getByRole('button', { name: 'delete' }).click()
    })

    test('page allows filtering persons', async ({ page }) => {
      await page.getByTestId('filter').fill('Test')

      const personItem = page.locator('[data-testid="person"]', {
        hasText: TEST_NAME,
      })

      await expect(personItem).toBeVisible()
      await expect(personItem).toContainText(TEST_NUMBER)

      await page.getByTestId('filter').fill('Nonexistent')
      await expect(personItem).not.toBeVisible()

      await deleteTestPerson(page.request, TEST_NAME, TEST_NUMBER)
    })
  })

  afterEach(async ({ request }) => {
    await deleteTestPerson(request, TEST_NAME, TEST_NUMBER)
  })
})
