import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';

const root=process.cwd(), errors=[];
const server=http.createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(root+path.sep))throw new Error('Forbidden');
    const bytes=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':file.endsWith('.webp')?'image/webp':'text/html; charset=utf-8'});
    res.end(bytes);
  }catch(e){res.writeHead(404);res.end('Not found')}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const port=server.address().port, base='http://127.0.0.1:'+port;
const browser=await chromium.launch({headless:true});
async function runScenario(label,options){
  const context=await browser.newContext(options),page=await context.newPage();
  page.on('pageerror',e=>errors.push(label+': '+e.message));
  await page.goto(base+'/?debug=1');
  await page.waitForFunction(()=>typeof imageReady!=='undefined'&&imageReady,{timeout:15000});
  assert.match(await page.locator('#progress').innerText(),/0 \/ 6/);
  const img=await page.evaluate(()=>({w:img.width,h:img.height}));
  assert.ok(img.w>=1000&&img.h>=500,'Image loaded');
  const zoomBefore=await page.evaluate(()=>scale);
  await page.locator('#plus').click();
  assert.ok((await page.evaluate(()=>scale))>zoomBefore,'Zoom increases');
  await page.locator('#reset').click();
  const clickTarget=async(id)=>{
    const point=await page.evaluate(target=>{
      const el=ITEMS.find(it=>it.id===target),r=canvas.getBoundingClientRect();
      return{x:r.left+ox+el.x*img.width*scale,y:r.top+oy+el.y*img.height*scale};
    },id);
    if(options.hasTouch)await page.touchscreen.tap(point.x,point.y);
    else await page.mouse.click(point.x,point.y);
  };
  await clickTarget('arc');
  assert.match(await page.locator('#progress').innerText(),/1 \/ 6/,'Arc tap registered');
  await page.locator('#modalButtons button').first().click();
  for(const [i,id] of ['temple','navires','fontaine','statue','etals'].entries()){
    await clickTarget(id);
    assert.match(await page.locator('#progress').innerText(),new RegExp((i+2)+' \\/ 6'));
    if(i<4)await page.locator('#modalButtons button').first().click();
  }
  await page.getByRole('button',{name:'Voir mon bilan'}).click();
  assert.match(await page.locator('#modalTitle').innerText(),/Rome explorée/);
  await page.locator('#modalButtons button').last().click();
  await page.reload();
  await page.waitForFunction(()=>imageReady);
  assert.match(await page.locator('#progress').innerText(),/6 \/ 6/,'Progress persists');
  await page.locator('#modeBtn').click();
  assert.equal(await page.locator('#modalButtons button').count(),5);
  await page.getByRole('button',{name:'Adultes · expert'}).click();
  assert.match(await page.locator('#progress').innerText(),/0 \/ 6/,'Distinct expert progress');
  assert.ok((await page.locator('#targets').innerText()).includes('Un réseau hydraulique aboutit ici'));
  await fs.mkdir('screenshots',{recursive:true});
  await page.screenshot({path:'screenshots/'+label+'.png',fullPage:true});
  await context.close();
}
try{
  await runScenario('desktop',{viewport:{width:1280,height:800}});
  await runScenario('mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  assert.deepEqual(errors,[],'No uncaught browser errors');
  console.log('PASS: 6 clickable targets, 5 modes, completion modal, storage, zoom, desktop/mobile');
}catch(err){console.error(err);process.exitCode=1}
finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
