import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
const root=process.cwd();
const server=http.createServer(async(req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
  if(!file.startsWith(root+path.sep))throw new Error('Forbidden');
  const data=await fs.readFile(file);
  res.writeHead(200,{'Content-Type':file.endsWith('.webp')?'image/webp':'text/html; charset=utf-8'});
  res.end(data);
 }catch(e){res.writeHead(404);res.end('Not found')}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+server.address().port+'/preview/rome-v04/';
const browser=await chromium.launch({headless:true});
let failed=false;
try{
 for(const cfg of [
  {name:'desktop',viewport:{width:1280,height:800},hasTouch:false,isMobile:false},
  {name:'mobile',viewport:{width:390,height:844},hasTouch:true,isMobile:true},
  {name:'tablet',viewport:{width:800,height:600},hasTouch:true,isMobile:true}
 ]){
  const context=await browser.newContext({viewport:cfg.viewport,hasTouch:cfg.hasTouch,isMobile:cfg.isMobile,deviceScaleFactor:cfg.hasTouch?2:1});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(base,{waitUntil:'load'});
  await page.waitForFunction(()=>window.MM_TEST?.getState().ready,{timeout:15000});
  assert.equal((await page.evaluate(()=>MM_TEST.getState())).district,'forum');
  assert.equal(await page.locator('.target').count(),8);
  assert.equal(await page.locator('#districts button').count(),3);
  await page.locator('.target').nth(1).getByRole('button',{name:'Trouvé'}).click();
  assert.equal((await page.evaluate(()=>MM_TEST.getState().found)).length,1);
  await page.reload({waitUntil:'load'});
  await page.waitForFunction(()=>window.MM_TEST?.getState().ready);
  assert.equal((await page.evaluate(()=>MM_TEST.getState().found)).length,1,'Progress saved');
  const old=await page.evaluate(()=>MM_TEST.getState().scale);
  await page.locator('#plus').click();
  assert.ok((await page.evaluate(()=>MM_TEST.getState().scale))>old);
  await page.locator('#home').click();
  await page.locator('#touch').click();
  assert.equal(await page.evaluate(()=>MM_TEST.getState().mode),'touch');
  await page.locator('.target').first().getByRole('button',{name:'Montrer'}).click();
  const rect=await page.locator('#scene').boundingBox();
  if(cfg.hasTouch)await page.touchscreen.tap(rect.x+rect.width/2,rect.y+rect.height/2);
  else await page.mouse.click(rect.x+rect.width/2,rect.y+rect.height/2);
  assert.equal((await page.evaluate(()=>MM_TEST.getState().found)).length,2,'Tapping highlighted statue works');
  await page.getByRole('button',{name:'Continuer'}).click();
  await page.locator('#observe').click();
  assert.equal(await page.evaluate(()=>MM_TEST.getState().mode),'observe');
  for(const [i,id] of [[1,'port'],[2,'marche']]){
    await page.locator('#districts button').nth(i).click();
    await page.waitForFunction(id=>MM_TEST.getState().ready&&MM_TEST.getState().district===id,id);
    assert.equal(await page.locator('.target').count(),8);
  }
  await page.locator('#difficulty').click();
  assert.equal(await page.locator('#modal-buttons button').count(),5);
  await page.getByRole('button',{name:'Adulte · expert'}).click();
  assert.equal(await page.evaluate(()=>MM_TEST.getState().profile),'expert');
  await page.locator('#show-all').click();
  assert.equal(await page.locator('#show-all').textContent(),'Masquer');
  await fs.mkdir('screenshots/v04',{recursive:true});
  await page.screenshot({path:'screenshots/v04/'+cfg.name+'.png',fullPage:true});
  assert.deepEqual(errors,[],'No JavaScript errors');
  console.log('PASS '+cfg.name+': art, zoom, touch, observation, profiles, persistence, districts');
  await context.close();
 }
}catch(e){failed=true;console.error(e)}
finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
if(failed)process.exitCode=1;
