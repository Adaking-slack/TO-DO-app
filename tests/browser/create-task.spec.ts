import { test, expect, type Page } from '@playwright/test';

const day = (offset = 0) => { const date = new Date(); date.setDate(date.getDate() + offset); return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'); };
const stored = (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem('little-magic.tasks.v1') ?? '[]'));
async function open(page: Page, title = '') {
  await page.getByRole('button', { name: 'Create task', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Create Task', exact: true })).toBeVisible();
  if (title) await page.getByLabel('Task title', { exact: true }).fill(title);
}
async function create(page: Page) { await page.getByRole('dialog').getByRole('button', { name: 'Create Task', exact: true }).click(); }
async function schedule(page: Page, date: string, time?: string) {
  await page.getByRole('button', { name: 'Date and time', exact: true }).click();
  await page.getByLabel('Due date', { exact: true }).fill(date);
  if (time) await page.getByLabel('Due time', { exact: true }).fill(time);
  await page.getByRole('button', { name: 'Apply date and time', exact: true }).click();
}

test('reference composer validates, persists to Inbox, edits and completes', async ({ page }) => {
  await page.goto('/'); await open(page);
  await expect(page.getByLabel('Description', { exact: true })).toBeVisible();
  await expect(page.locator('.task-details-group > *')).toHaveCount(3);
  await expect(page.getByText(/Add details|Hide details|Priority|Category|Recurrence/)).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Cancel', exact: true })).toHaveCount(0);
  await expect(page.locator('.task-composer button[type=submit]')).toHaveCount(0);
  await page.screenshot({ path: 'test-results/create-task-reference.png' });
  await page.getByLabel('Task title', { exact: true }).fill('   '); await create(page);
  await expect(page.getByText('Enter a task title.')).toBeVisible(); expect(await stored(page)).toHaveLength(0);
  await page.getByLabel('Task title', { exact: true }).fill('  Buy groceries  '); await create(page);
  await expect(page.getByRole('dialog')).toHaveCount(0); await expect(page.locator('.task-row')).toHaveCount(0);
  await page.getByRole('link', { name: 'Inbox' }).click();
  await expect(page.getByText('Buy groceries', { exact: true })).toBeVisible(); await expect(page.locator('.task-metadata')).toHaveCount(0);
  await page.reload(); await page.getByRole('checkbox', { name: 'Complete Buy groceries', exact: true }).check();
  await page.reload(); await expect(page.getByRole('checkbox')).toBeChecked(); await page.getByRole('checkbox').uncheck();
  await page.getByRole('button', { name: 'Open task: Buy groceries' }).click();
  await page.getByLabel('Task title', { exact: true }).fill('Buy fruit');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  expect((await stored(page))[0]).toMatchObject({ title: 'Buy fruit', completed: false }); expect((await stored(page))[0].createdAt).toBeTruthy();
});

test('Today picker, reminder, inline subtasks and independent completion work end to end', async ({ page }) => {
  await page.goto('/'); await open(page, 'Plan dinner');
  await page.getByLabel('Description', { exact: true }).fill('Use the vegetables in the fridge.');
  await page.getByRole('button', { name: 'Date and time', exact: true }).click();
  expect(await page.locator('dialog[data-covered]').evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  await expect(page.getByLabel('Due time', { exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Today', exact: true }).click();
  await page.getByLabel('Due time', { exact: true }).fill('23:59');
  await page.screenshot({ path: 'test-results/create-task-schedule.png' });
  await page.getByRole('button', { name: 'Apply date and time', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Date and time', exact: true })).toBeFocused();
  await expect(page.locator('#schedule-summary')).toContainText('Today');
  await page.getByRole('button', { name: 'Reminder', exact: true }).click();
  await page.getByLabel('Remind me at', { exact: true }).fill(`${day()}T18:00`);
  await page.getByRole('button', { name: 'Apply reminder', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Reminder', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Add sub-task', exact: true }).click();
  await expect(page.getByLabel('Sub-task 1', { exact: true })).toBeFocused();
  await page.getByLabel('Sub-task 1', { exact: true }).fill('Chop vegetables');
  await page.getByRole('button', { name: 'Add sub-task', exact: true }).click();
  await expect(page.getByLabel('Sub-task 2', { exact: true })).toBeFocused();
  await page.getByLabel('Sub-task 2', { exact: true }).fill('Set table');
  await page.getByRole('button', { name: 'Remove sub-task 2', exact: true }).click();
  await create(page);
  await expect(page.getByRole('heading', { name: 'Today · 1' })).toBeVisible();
  await expect(page.locator('.task-row')).toContainText('0 of 1 subtasks');
  await expect(page.locator('.task-row')).not.toContainText('Use the vegetables');
  const task = (await stored(page))[0];
  expect(task).toMatchObject({ date: day(), time: '23:59', description: 'Use the vegetables in the fridge.', reminder: `${day()}T18:00` });
  await page.getByRole('checkbox').click();
  await expect(page.getByRole('dialog', { name: 'Complete task?' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click(); await expect(page.getByRole('checkbox')).not.toBeChecked();
  await page.getByRole('checkbox').click(); await page.getByRole('button', { name: 'Complete task', exact: true }).click();
  expect((await stored(page))[0].subtasks[0].completed).toBe(false);
  await page.getByRole('checkbox').uncheck(); await page.getByRole('button', { name: 'Open task: Plan dinner' }).click();
  await page.getByRole('checkbox', { name: 'Complete subtask: Chop vegetables', exact: true }).check();
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.locator('.task-row')).toContainText('1 of 1 subtasks'); await expect(page.getByRole('checkbox')).not.toBeChecked();
  await page.reload(); await expect(page.locator('.task-row')).toContainText('1 of 1 subtasks');
});

test('future dates stay out of Today; removing schedule clears time', async ({ page }) => {
  await page.goto('/');
  for (const [title, date] of [['Future', day(2)], ['Past', day(-2)]]) {
    await open(page, title); await schedule(page, date); await create(page);
  }
  expect(await stored(page)).toHaveLength(2); await expect(page.locator('.task-row')).toHaveCount(0);
  await open(page, 'Undated'); await schedule(page, day(), '12:00');
  await page.getByRole('button', { name: 'Date and time', exact: true }).click();
  await page.getByRole('button', { name: 'Remove date and time', exact: true }).click(); await create(page);
  const task = (await stored(page)).find((t: any) => t.title === 'Undated');
  expect(task.date).toBeUndefined(); expect(task.time).toBeUndefined();
  await page.getByRole('link', { name: 'Inbox' }).click(); await expect(page.locator('.task-row')).toHaveCount(1);
});

test('floating geometry, scrim, transparent file assets and modal focus are correct', async ({ page }) => {
  await page.goto('/'); await open(page, 'Draft');
  const sheet = page.getByRole('dialog'); const bounds = await sheet.boundingBox();
  expect(bounds!.x).toBe(16); expect(390 - bounds!.x - bounds!.width).toBe(16); expect(844 - bounds!.y - bounds!.height).toBe(16);
  expect(await sheet.evaluate(el => getComputedStyle(el).borderRadius)).toBe('32px');
  expect(await sheet.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor)).toBe('rgba(26, 15, 46, 0.4)');
  for (let index = 0; index < 12; index++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true); }
  const source = await page.locator('.description-icon').getAttribute('src'); expect(source).toContain('description.svg'); expect(source).not.toContain('data:');
  const assets = await page.locator('.sheet-decoration img').evaluateAll(async images => Promise.all(images.map(async element => {
    const img = element as HTMLImageElement; await img.decode();
    const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!; ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    return { src: img.src, cornerAlpha: data[3], hasInk: data.some((v, i) => i % 4 === 3 && v > 0), events: getComputedStyle(img).pointerEvents, alt: img.alt };
  })));
  expect(assets).toHaveLength(3);
  for (const asset of assets) { expect(asset.cornerAlpha).toBe(0); expect(asset.hasInk).toBe(true); expect(asset.events).toBe('none'); expect(asset.alt).toBe(''); }
  await page.getByRole('button', { name: 'Date and time', exact: true }).click();
  await page.getByRole('button', { name: 'Today', exact: true }).click(); await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Create Task', exact: true })).toBeVisible();
  await expect(page.locator('#schedule-summary')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Date and time', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  expect(await stored(page)).toHaveLength(0); await expect(page.getByRole('button', { name: 'Create task', exact: true })).toBeFocused();
});

test('small viewport keeps focused subtasks accessible and preserves failed drafts', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 }); await page.goto('/'); await open(page, 'Keep this draft');
  await page.getByLabel('Description', { exact: true }).fill('A long description. '.repeat(30));
  for (let index = 1; index <= 4; index++) {
    await page.getByRole('button', { name: 'Add sub-task', exact: true }).click();
    await page.getByLabel(`Sub-task ${index}`, { exact: true }).fill(`Step ${index}`);
  }
  await page.setViewportSize({ width: 320, height: 340 });
  await expect.poll(async () => {
    const field = await page.getByLabel('Sub-task 4', { exact: true }).boundingBox();
    return field!.y >= 16 && field!.y + field!.height <= 324;
  }).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/create-task-small.png' });
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new DOMException('Full', 'QuotaExceededError'); }; });
  await create(page); await expect(page.getByRole('alert')).toContainText('could not be saved');
  await expect(page.getByLabel('Task title', { exact: true })).toHaveValue('Keep this draft'); expect(await stored(page)).toHaveLength(0);
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('editing preserves properties excluded from the new composer', async ({ page }) => {
  await page.goto('/'); await page.evaluate(() => localStorage.setItem('little-magic.tasks.v1', JSON.stringify([{ id: 'old', title: 'Existing', completed: false, priority: 'high', category: 'Personal', recurrence: 'Daily' }])));
  await page.reload(); await page.getByRole('link', { name: 'Inbox' }).click();
  await page.getByRole('button', { name: 'Open task: Existing' }).click();
  await page.getByLabel('Description', { exact: true }).fill('Updated description');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  expect((await stored(page))[0]).toMatchObject({ priority: 'high', category: 'Personal', recurrence: 'Daily', description: 'Updated description' });
});
