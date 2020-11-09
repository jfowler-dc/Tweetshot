const express = require('express')
const puppeteer = require('puppeteer')

const app = express()
const port = 3000

app.listen(port, () => {
	console.log('server running port 3000')
})

app.use(express.static('public'))

app.post('/', (req, res) => {
	
	req.on('data', function(chunk) {
			const formdata = chunk.toString()
			
			const url = decodeURIComponent(formdata.split('=')[1])

			let form = ''
			let result = ''  

			async function screenshot() {  
				const browser = await puppeteer.launch()   
				const page = await browser.newPage()  
				const imgPath = url.split('/')[3] + '-' + url.split('/')[5]         
				await page.goto(url) 
				
				await page.waitForSelector('article.css-1dbjc4n.r-18u37iz.r-1ny4l3l') 

				let div_selector_to_remove = ".css-1dbjc4n.r-aqfbo4.r-14lw9ot.r-my5ep6.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q";
				await page.evaluate((sel) => {
				    var elements = document.querySelectorAll(sel);
				    for(var i=0; i< elements.length; i++){
				        elements[i].parentNode.removeChild(elements[i]);
				    }
				}, div_selector_to_remove)

				let div_selector_to_remove1 = ".css-1dbjc4n.r-aqfbo4.r-1p0dtai.r-1d2f490.r-12vffkv.r-1xcajam.r-zchlnj";
				await page.evaluate((sel) => {
				    var elements = document.querySelectorAll(sel);
				    for(var i=0; i< elements.length; i++){
				        elements[i].parentNode.removeChild(elements[i]);
				    }
				}, div_selector_to_remove1)


				const element = await page.$('article.css-1dbjc4n.r-18u37iz.r-1ny4l3l')  
				await element.screenshot({path: 'public/screenshots/' + imgPath + '.png'})
				result = 'screenshots/' + imgPath + '.png'
				await browser.close()  

				form = `<!DOCTYPE html>
					<html lang="en">
						<head>
							<meta charset="UTF-8"> 
							<title>TweetShot</title>
							<style>
								html, body {margin:0}
								header {width:100%; box-shadow:0px 3px 6px rgba(0,0,0,.2); background:#fff;}
								form {width:100%; max-width:600px; margin:auto; display:flex; padding:20px; box-sizing:border-box;}
								input[type="text"] {width:100%; border:1px solid #000; box-sizing:border-box; padding:0 10px; margin-right:10px;}
								input[type="submit"] {border:0; padding:10px 20px; border:1px solid #000; box-sizing:border-box; cursor:pointer;}
								input[type="submit"]:hover {background:#888;}
								.img-container {width:400px; margin:auto; margin-top:50px; display:flex; box-shadow:0px 3px 6px rgba(0,0,0,.2);}
								.img-container img {max-width:100%; width:100%;}
							</style>
						</head>
						<body>
							<header>
								<form name="tweetshot" action="/" method="post">
									<input type="text" name="twurl" value="${url}">
									<input type="submit" value="Submit">
								</form>
							</header>
							<div class="img-container">
								<a target="_blank" href="${url}">
									<img src="${result}">
								</a>
							</div>
						</body>
					</html>`   

				res.setHeader('Content-Type', 'text/html')
				res.writeHead(200)
				res.end(form)                 
			};
			screenshot()
		})
});
