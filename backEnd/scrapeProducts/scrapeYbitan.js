const puppeteer = require("puppeteer");
const db = require("../connections/heroku-pg");
const {
  getAllProductsYbitan,
  insertProductsYbitan,
  delAllYbitan,
} = require("../modules/yBitanModules.js");
let allProducts = [];
let URLs = [
  "https://www.ybitan.co.il/categories/79706/products",
  'https://www.ybitan.co.il/categories/79705/products',
  'https://www.ybitan.co.il/categories/79707/products',
  'https://www.ybitan.co.il/categories/79822/products',
  'https://www.ybitan.co.il/categories/79823/products',
  'https://www.ybitan.co.il/categories/93710/products',
  'https://www.ybitan.co.il/categories/93709/products',
  'https://www.ybitan.co.il/categories/79720/products',
  'https://www.ybitan.co.il/categories/95012/products',
  'https://www.ybitan.co.il/categories/95010/products',
  'https://www.ybitan.co.il/categories/95012/products',
  'https://www.ybitan.co.il/categories/95011/products',
  'https://www.ybitan.co.il/categories/95013/products',
  'https://www.ybitan.co.il/categories/95809/products',
  'https://www.ybitan.co.il/categories/79689/products', //THE QUERY IS EMPTY
  'https://www.ybitan.co.il/categories/79688/products',
  'https://www.ybitan.co.il/categories/79690/products',
  'https://www.ybitan.co.il/categories/79621/products',
  'https://www.ybitan.co.il/categories/79622/products',
  'https://www.ybitan.co.il/categories/79624/products',
  'https://www.ybitan.co.il/categories/79620/products',
  'https://www.ybitan.co.il/categories/79732/products',
  'https://www.ybitan.co.il/categories/79733/products',
  'https://www.ybitan.co.il/categories/95814/products',
  'https://www.ybitan.co.il/categories/79605/products',
  'https://www.ybitan.co.il/categories/79604/products',
  'https://www.ybitan.co.il/categories/79606/products',
  'https://www.ybitan.co.il/categories/81224/products',
  'https://www.ybitan.co.il/categories/95816/products',
  'https://www.ybitan.co.il/categories/95824/products',
  'https://www.ybitan.co.il/categories/95828/products',
  'https://www.ybitan.co.il/categories/79670/products',
  'https://www.ybitan.co.il/categories/79668/products',
  'https://www.ybitan.co.il/categories/79669/products',
  'https://www.ybitan.co.il/categories/94570/products',
  'https://www.ybitan.co.il/categories/94571/products',
  'https://www.ybitan.co.il/categories/94568/products',
  'https://www.ybitan.co.il/categories/79840/products',
  'https://www.ybitan.co.il/categories/79654/products',
  'https://www.ybitan.co.il/categories/79655/products',
  'https://www.ybitan.co.il/categories/79742/products',
  'https://www.ybitan.co.il/categories/79744/products',
  'https://www.ybitan.co.il/categories/79741/products',
  'https://www.ybitan.co.il/categories/79743/products',
  'https://www.ybitan.co.il/categories/79572/products',
  'https://www.ybitan.co.il/categories/95186/products',
  'https://www.ybitan.co.il/categories/79573/products',
  'https://www.ybitan.co.il/categories/79574/products',
  'https://www.ybitan.co.il/categories/95797/products',
  'https://www.ybitan.co.il/categories/79769/products',
];

async function scrapeYBitan() {
  // await delAllYbitan();

  for (let i = 0; i < URLs.length; i++) {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    try {
      await page.goto(URLs[i]);
    } catch (err) {
      console.log(err);
    }
    // await delay(4000)
    await page.setViewport({
      width: 1200,
      height: 800,
    });
    await delay(4000);

    //scroll to the bottom of the page and load all of the items
    await autoScroll(page);
    await delay(1000);
    await autoScroll(page);
    await delay(1000);
    await autoScroll(page);
    
   

    console.log('scraping  '+URLs[i])
    const data = await page.evaluate(() => {
      const list = [];
      let names = document.querySelectorAll("#product_name");
      let prices = document.querySelectorAll(".sp-product-price");
      let images = document.querySelectorAll('sp-product');

      for (let i = 0; i < names.length; i++) {
       
        let name = names[i].innerText;
        let str = prices[i].innerText;
        let price;
        

        if (str.includes('מחיר מבצע')){
          let strArr = str.split('\n')
          let target = strArr[1]
          let target1 = target.split('/')[0].split('₪')[1]
           price=Number(target1)
          
      }
      else if (str.includes('ק"ג')) {
          let getPrice2 = str.split("₪");
          price = Number(getPrice2[1].split("/")[0]);
      }
      else if(str.includes('ל-100 גרם')){
          let target=str.split('\n')[0].split('₪')[1]
            price = Number(target) 
          
      }
      else if(str.includes('/ 100 גרם')){
          let target = str.split('/')[0].split('₪')[1]
           price = Number(target) 
          
      }
      else{
            let getPrice2 = str.split("₪");
            price = Number(getPrice2[1]);
          }
          let img;
       try{
         let thisImg=images[i].children[1].children[1].getAttribute('style').split('("')[1].split('")')[0]
           img = thisImg.replace(/'/g,'');
       }catch(err){
         console.log(err)
       }
          

        list.push({name:name , price:price, img:img });
      }
      return list;
    });

    await insertProductsYbitan(data);
    await browser.close();
  }

  console.log('****FINISHED******')
}
scrapeYBitan();

//Function to create delay
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

//Function to scroll to bottom of the page and load all items in it
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 120;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}


module.exports={
  scrapeYBitan
}