const express = require('express')

const app = express()
const port = 3000

app.listen(port, () => {
	console.log('server running port 3000')
})

app.use(express.static('public'))
let response = '';

// const https = require('https');
// const nasaURL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

// https.get(nasaURL, (resp) => {
// 	let data = '';

// 	// A chunk of data has been recieved.
// 	resp.on('data', (chunk) => {
// 		data += chunk;
// 	});

// 	// The whole response has been received. Print out the result.
// 	resp.on('end', () => {
// 		response = JSON.parse(data).explanation;
// 		console.log(JSON.parse(data).explanation);
// 	});

// }).on("error", (err) => {
// 	console.log("Error: " + err.message);
// });

const puppeteer = require('puppeteer');  

(async () => {                              
	const browser = await puppeteer.launch();   
	const page = await browser.newPage();  
	const url = 'https://twitter.com/kurteichenwald/status/1304228683067121666';
	const imgPath = url.split('/')[3] + '-' + url.split('/')[5]         
	await page.goto(url); 

	await page.waitForSelector('article.css-1dbjc4n.r-18u37iz.r-1ny4l3l');    
	const element = await page.$('article.css-1dbjc4n.r-18u37iz.r-1ny4l3l');  
	await element.screenshot({path: 'public/screenshots/' + imgPath + '.png'});
	response = 'screenshots/' + imgPath + '.png';
	await browser.close();                         
})();

app.get('/url', (req, res, next) => {
	res.send(`<img src="${response}">`)
});




// app.get('/', (req, res) => {
// 	res.send('Hello World!')
// })

// app.listen(port, () => {
// 	console.log(`Example app listening at http://localhost:${port}`)
// })