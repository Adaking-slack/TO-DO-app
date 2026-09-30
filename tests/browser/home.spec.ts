import { test, expect } from '@playwright/test';
test('empty Home is truthful, note limits and refresh persistence work', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Today · 0' })).toBeVisible();
  await expect(page.locator('.task-row')).toHaveCount(0);
  const note = page.getByRole('textbox', { name: 'Personal note' });
  await note.fill(Array.from({length:26}, (_,i)=>'word'+i).join(' '));
  await expect(page.locator('.note-counter')).toHaveText('26/30 words');
  await page.reload(); await expect(note).not.toBeEmpty();
  await note.fill(''); await expect(page.locator('.note-counter')).toHaveCount(0);
  await note.evaluate(el => {
    const data = new DataTransfer(); data.setData('text/plain', Array.from({length:35},(_,i)=>'word'+i).join(' '));
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles:true, cancelable:true }));
  });
  await expect(page.locator('.note-counter')).toHaveText('30/30 words');
  await note.press('End'); await note.pressSequentially(' extra');
  expect((await note.inputValue()).trim().split(/\s+/)).toHaveLength(30);
  await note.fill(''); await page.reload(); await expect(note).toHaveValue('');
  await expect(page.locator('nav a')).toHaveCount(4);
  await expect(page.getByRole('link', {name:'Home'})).toHaveAttribute('aria-current', 'page');
  const nav = await page.locator('nav').boundingBox(), fab = await page.getByRole('button',{name:'Create task',exact:true}).boundingBox();
  expect(nav!.height).toBe(64); expect(fab!.width).toBe(56);
  expect(nav!.y-(fab!.y+fab!.height)).toBe(16);
  await page.screenshot({path:'test-results/home-empty.png'});
});
test('today filtering, completion, long-list clearance and action boundary', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const date = new Date(), day = [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
    const tasks = Array.from({length:18}, (_,i)=>({id:String(i),title:i===0?'A long task title that can wrap naturally without clipping any of its words':'Task '+i,date:day,completed:false}));
    localStorage.setItem('little-magic.tasks.v1',JSON.stringify([...tasks,{id:'later',title:'Not today',date:'2099-01-01',completed:false}]));
  });
  await page.reload();
  await expect(page.getByRole('heading', { name:'Today · 18' })).toBeVisible();
  await expect(page.getByText('Not today',{exact:true})).toHaveCount(0);
  await page.locator('input[type=checkbox]').first().check();
  await page.locator('input[type=checkbox]').nth(1).check();
  await expect(page.locator('input[type=checkbox]').nth(1)).toBeChecked();
  await page.locator('input[type=checkbox]').nth(1).uncheck();
  await expect(page.locator('input[type=checkbox]').nth(1)).not.toBeChecked();
  await page.reload(); await expect(page.locator('input[type=checkbox]').first()).toBeChecked();
  await expect(page.locator('.task-row').first()).toHaveClass(/completed/);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  const last = await page.locator('.task-row').last().boundingBox(), fab = await page.locator('.fab').boundingBox();
  expect(last!.y + last!.height).toBeLessThanOrEqual(fab!.y - 24);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(()=>window.addEventListener('little-magic:action',e=>{ (window as any).lastAction=(e as CustomEvent).detail; }));
  await page.getByRole('button',{name:'Create task',exact:true}).click();
  expect(await page.evaluate(()=>(window as any).lastAction)).toEqual({type:'create-task'});
  await page.screenshot({path:'test-results/home-long-list.png'});
});
test('narrow phone, growing note, keyboard focus and reduced motion', async ({ page }) => {
  await page.setViewportSize({width:320,height:568}); await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const note=page.getByRole('textbox',{name:'Personal note'});
  await note.fill(Array(30).fill('longwordexample').join(' '));
  expect(await note.evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const writing = await note.boundingBox(), floating = await page.locator('.fab').boundingBox();
  expect(writing!.y + writing!.height).toBeLessThanOrEqual(floating!.y - 24 + 1);
  await page.keyboard.press('Tab');
  expect(await page.locator('.fab').evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0s');
  await page.screenshot({path:'test-results/home-narrow.png'});
});

