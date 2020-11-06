const puppeteer = require('puppeteer');  

(async () => {                              
	const browser = await puppeteer.launch();   
	const page = await browser.newPage();  
	const url = 'https://twitter.com/kurteichenwald/status/1304228683067121666';
	const imgPath = url.split('/')[3] + '-' + url.split('/')[5]         
	await page.goto(url); 

	await page.waitForSelector('article.css-1dbjc4n.r-18u37iz.r-1ny4l3l');    
	const element = await page.$('article.css-1dbjc4n.r-18u37iz.r-1ny4l3l');  
	await element.screenshot({path: 'screenshots/' + imgPath + '.png'});
	await browser.close();                         
})();