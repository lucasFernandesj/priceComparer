const puppeteer = require("puppeteer");
const db = require("../connections/heroku-pg");
const { insertProductRami, delAllRami } = require("../modules/ramiModules");
let allProducts = [];

// const insertProductRami=(products)=>{
//     return db('rami_lewy')
//     .insert(products)
// }

let urls = [
  // "https://www.rami-levy.co.il/he/online/market/%D7%A4%D7%99%D7%A8%D7%95%D7%AA-%D7%95%D7%99%D7%A8%D7%A7%D7%95%D7%AA",
  // 'https://www.rami-levy.co.il/he/online/market/חלב-ביצים-וסלטים',
  // 'https://www.rami-levy.co.il/he/online/market/בשר-ודגים',
  // 'https://www.rami-levy.co.il/he/online/market/אורגני-ובריאות',
  // 'https://www.rami-levy.co.il/he/online/market/קפואים',
  // 'https://www.rami-levy.co.il/he/online/market/שימורים-בישול-ואפיה',
  // 'https://www.rami-levy.co.il/he/online/market/קטניות-ודגנים',
  // 'https://www.rami-levy.co.il/he/online/market/חטיפים-ומתוקים',
  // 'https://www.rami-levy.co.il/he/online/market/משקאות',
  // 'https://www.rami-levy.co.il/he/online/market/חד-פעמי-ומתכלה',
  // 'https://www.rami-levy.co.il/he/online/market/אחזקת-הבית-ובע-ח', // error the query is empty
  'https://www.rami-levy.co.il/he/online/market/פארם-ותינוקות',
  'https://www.rami-levy.co.il/he/online/market/לחם-מאפים-והמאפייה-הטריה'
];
async function scrapeRami() {
  // await delAllRami();

  //Loop through the URLs and get all of the products
  for (let i = 0; i < urls.length; i++) {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    try{
      await page.goto(urls[i]);

    }catch(err){
      console.log(err)
    }

    await page.setViewport({
      width: 1200,
      height: 800,
    });
    await delay(4000);

    //scroll to the bottom of the page and load all of the items
    await autoScroll(page);
    console.log('page is : '+urls[i])

    const data = await page.evaluate(() => {
      const list = [];
     
      let names = document.querySelectorAll(".inner-text.mt-2");
      let prices = document.querySelectorAll(
        ".position-relative.currency-wrap.overflow-ellipsis.lm-text.currency-product"
      );
      let images = document.querySelectorAll('.product-flex.focus-item.bg-white.border-radius-15.cursor-pointer.position-relative.mx-1.mx-md-2.px-2.pt-2.mb-2.mb-md-0.big-plus-minus.rl-boxshadow');
      for (let i = 0; i < names.length; i++) {
        let name;
        try{
           name = names[i].innerText;

        }catch(err){
          console.log(err)
        }

        let price;
        try{
           let priceScrapped = prices[i].innerText;
        let priceArr = priceScrapped.split(" ");
         price = Number(priceArr[0]);
        }catch(err){
          console.log(err)
        }
       
        let img;
        try{
            let imgTarget = images[i].children[0].children[0].getAttribute('style').split('("')[1].split('")')[0]
            img = imgTarget.replace(/'/g,'');
        }catch(err){
          console.log(err)
        }
        
        list.push({ name: name, price: price , img:img});
      }

      return list;
    });

    await insertProductRami(data);
    await browser.close();
  }
}
scrapeRami();

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
      var distance = 100;
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
  scrapeRami
}