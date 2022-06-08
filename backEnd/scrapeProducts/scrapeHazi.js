const puppeteer = require('puppeteer');
const db = require('../connections/heroku-pg');
const { getAllProductsHazi, insertProductsHazi, delAllHazi} = require('../modules/haziModules.js')
let allProducts =[]
let URLs=[
'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=45&subCategoryId=10883',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=45&subCategoryId=10884',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=45&subCategoryId=10885',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=45&subCategoryId=10886',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=45&subCategoryId=10887',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11211',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10864',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11582',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11486',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10865',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10866',
  'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10867',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10868',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10869',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=10870',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11592',
  'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11213',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11750',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11751',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11752',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=78&subCategoryId=11753',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=46&subCategoryId=10888',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=46&subCategoryId=11690',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=46&subCategoryId=10889',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=46&subCategoryId=10890',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=46&subCategoryId=11663',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=87&subCategoryId=11233',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=41&subCategoryId=10891',
     'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=41&subCategoryId=10892',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=41&subCategoryId=10893',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=41&subCategoryId=10894',
      'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=44&subCategoryId=10896',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=44&subCategoryId=10897',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=82&subCategoryId=11141',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=67&subCategoryId=11237',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=67&subCategoryId=10847',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=67&subCategoryId=11485',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=67&subCategoryId=10859',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=67&subCategoryId=11238',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=67&subCategoryId=11239',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=72&subCategoryId=10853',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=72&subCategoryId=10854',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=72&subCategoryId=10855',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=72&subCategoryId=10856',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=72&subCategoryId=11666',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=70&subCategoryId=10845',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=70&subCategoryId=11595',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=70&subCategoryId=10846',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=70&subCategoryId=11620',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=74&subCategoryId=10838',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=74&subCategoryId=10839',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=74&subCategoryId=11539',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=74&subCategoryId=11540',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=74&subCategoryId=10840',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=74&subCategoryId=10857',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=77&subCategoryId=10835',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=77&subCategoryId=10836',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=77&subCategoryId=11203',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=77&subCategoryId=11204',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=69&subCategoryId=10841',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=69&subCategoryId=11205',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=69&subCategoryId=11206',
     'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=10842',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=10843',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=10844',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=11207',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=11583',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=11208',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=66&subCategoryId=11579',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10875',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10876',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10877',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10878',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10879',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10882',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=10948',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=80&subCategoryId=11217',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=84&subCategoryId=11180',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=84&subCategoryId=11181',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=84&subCategoryId=11182',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=84&subCategoryId=11183',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=84&subCategoryId=11184',
    
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=84&subCategoryId=11186',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=10852',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11424',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=10851',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11210',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11209',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=10850',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11384',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11385',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11386',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=79&subCategoryId=11387',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=83&subCategoryId=11142',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=83&subCategoryId=11143',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=83&subCategoryId=11144',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=63&subCategoryId=11598',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=63&subCategoryId=10873',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=63&subCategoryId=11577',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=63&subCategoryId=10874',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=63&subCategoryId=11573',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=71&subCategoryId=10861',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=71&subCategoryId=10862',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=71&subCategoryId=10863',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=71&subCategoryId=11138',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=71&subCategoryId=11139',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=71&subCategoryId=11140',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10824',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10825',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10826',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10827',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=11409',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=11599',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10828',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10829',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10830',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10831',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=68&subCategoryId=10832',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=11600',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=11219',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10813',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10814',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10815',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10816',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10817',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10818',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10819',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10820',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=11199',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10822',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=10946',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=11269',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=11270',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=64&subCategoryId=11271',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=62&subCategoryId=10834',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=62&subCategoryId=10812',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=65&subCategoryId=10899',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=65&subCategoryId=11136',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=65&subCategoryId=11137',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=129&subCategoryId=11436',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=129&subCategoryId=11437',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=129&subCategoryId=11438',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=129&subCategoryId=11439',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=129&subCategoryId=11755',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=130&subCategoryId=11214',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=130&subCategoryId=11215',
    'https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=130&subCategoryId=11216',

    

]


async function scrapeHazi(){
    //delete whole table before scrapping new
    // await delAllHazi()

    for(let i = 0 ; i < URLs.length ; i++){

   
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    try{
        await page.goto(URLs[i]);

    }catch(err){
        console.log(err)
    }
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await delay(6000)
    
    //scroll to the bottom of the page and load all of the items
    await autoScroll(page);
    console.log('page is : '+URLs[i])
    //get all names and prices
    const data = await page.evaluate(()=>{
        
        const list=[]
         
        let names = document.querySelectorAll('.product-cube-name');
        let prices = document.querySelectorAll('.product_cube-price');
        let images = document.querySelectorAll('.product_cube-image');
        
        
        for(let i = 0 ; i < names.length ; i++){

            let price;
            let name;
            try{
                    let str = names[i].innerText
                    let arr =str.split('לחיצה')
                    let name1 = arr[0]
                    if(name1.includes('\n')){
                        let strArr = name1.split('\n')
                        name = strArr[1]
                    }else{
                        name = name1
                    }


                    // if(prices[i].innerText.includes('\n')){
                    //     let str = prices[i].innerText
                    //     let strArr = str.split('\n')
                    //     let primitivePrice = strArr[1]
                    //     let primitivePriceArr = primitivePrice.split('₪')
                    //     let target = primitivePriceArr[1]
                    //     price = Number(target)
                        
                    // }else{
                    //     let str = prices[i].innerText
                    //     let strArr = str.split(' ')
                    //     let target = strArr[1]
                    //     let primitive = target.split('₪')
                    //     let target2 = primitive[1]
                    //     price = Number(target2)
                    // }
            }catch(err){
                console.log(err)
            }

            try{
                if(prices[i].innerText.includes('\n')){
                    let str = prices[i].innerText
                    let strArr = str.split('\n')
                    let primitivePrice = strArr[1]
                    let primitivePriceArr = primitivePrice.split('₪')
                    let target = primitivePriceArr[1]
                    price = Number(target)
                    
                }else{
                    let str = prices[i].innerText
                    let strArr = str.split(' ')
                    let target = strArr[1]
                    let primitive = target.split('₪')
                    let target2 = primitive[1]
                    price = Number(target2)
                }
            }catch(err){
                console.log(err)
            }









           
                let img;
                let thisImg;
            try{
                 thisImg = images[i]
                   img = thisImg.children[0].getAttribute('src')
            }catch(err){
                console.log(err)
            }

           

           
            // let obj={
            //     name:name,
            //     price:price
            // }
            list.push({name:name , price : price , img:img})
            // insertProduct(obj)
            
        }
        
        return list 
    });

    await insertProductsHazi(data);
    await browser.close();

}
console.log('*******FINISHED********')
}
scrapeHazi()


















function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }


 //Function to scroll to bottom of the page and load all items in it
 async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}




module.exports={
    scrapeHazi
}