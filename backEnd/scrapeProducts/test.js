//price par
// let str = 'מחיר\n₪3.90'
// let arr = str.split('\n')
// let thisPrice = (arr[1])
// let price = thisPrice.split('')
// price.splice(0,1)
// price = Number(price.join(''))
// console.log(price)

// let str = 'מחיר\n₪12.90'
// let arr = str.split('\n')[1].split('')
// let out = arr.splice(0,1)
//  let price = Number(arr.join(''))
// console.log(price)





//price impar
// let str = 'מחיר ₪5.90 '
// let word = str.split(' ')[1]
// let arr = word.split('')
// arr.splice(0,1)
// let price = Number(arr.join(''))
// console.log(price)
// let str = 'מחיר ₪7.90 '
// let arr = str.split(' ')[1]
// let arr2 = arr.split('')
// let out = arr2.splice(0,1)
// arr2 = arr2.join('')
// let price = Number(arr2)
// console.log(price)

//name
// let str = 'בצלי שאלוט\nלחיצה תעביר את הפוקוס לאזור הרחבה בהמשך הדף'
// let thisName = str.split('\n')[0]
// console.log(thisName)
// let str =  ' עגבניה   לחיצה תעביר את הפוקוס לאזור הרחבה בהמשך הדף נמכר במשקל'
// let name = str.split(' ')[1]
// console.log(name)
// let str = 'דלעת ערמונים\nלחיצה תעביר את הפוקוס לאזור הרחבה בהמשך הדף'
// let thisword = str.split('\n')[0]
// console.log(thisword)
//'₪8.90 / ק"ג'
//WORKS
// let getPrice = '₪10.90'
// let getPrice2 =getPrice.split('₪')
// let price = Number(getPrice2[1])
// console.log(price)

// let getPrice = '₪3.50'
// // '₪3.50' '₪8.90 / ק"ג'
// let price;
// if(getPrice.includes('ק"ג')){
//     let getPrice2 =getPrice.split('₪')
//     price = Number(getPrice2[1].split('/')[0])
// }else{
//     let getPrice2 =getPrice.split('₪')
//     price = Number(getPrice2[1])
// }

// console.log(price)

// let str = 'background-image: url("https://img.rami-levy.co.il/product/103/5/medium.jpg");'
// let url = str.indexOf('url("')
// let finalUrl = str.indexOf('");')
// console.log(str.substring( url+5 , finalUrl))


// let str = 'background-image: url("https://storage.googleapis.com/sp-public/product-images/global/17011/1245811/medium.jpg");'
// let firstPart = str.indexOf('url("')
// let final = str.indexOf('");')
// console.log(str.substring( firstPart+5 , final))

// let str = 'מחיר מבצע\n₪2.90 / ק"ג\nמחיר מחירון\n₪3.90'
// let str = '₪8.90\n₪2.97 ל-100 גרם'
let str = '₪3.50 / 100 גרם'
if (str.includes('מחיר מבצע')){
    let strArr = str.split('\n')
    let target = strArr[1]
    let target1 = target.split('/')[0].split('₪')[1]
    let price=Number(target1)
    
}
else if(str.includes('ל-100 גרם')){
    let target=str.split('\n')[0].split('₪')[1]
     let price = Number(target) 
    
}
else if(str.includes('/ 100 גרם')){
    let target = str.split('/')[0].split('₪')[1]
    let price = Number(target) 
    
}
else{
      let getPrice2 = str.split("₪");
      price = Number(getPrice2[1]);
    }





    const puppeteer = require('puppeteer');
const db = require('../connections/heroku-pg');
const { getAllProductsHazi, insertProductsHazi, delAllHazi} = require('../modules/haziModules.js')
let allProducts =[]

let URLs=[1]


async function scrapeHazi(){
    //delete whole table before scrapping new
    await delAllHazi()

    for(let i = 0 ; i < URLs.length ; i++){

   
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://shop.hazi-hinam.co.il/#/catalog?viewMode=category_targeting&categoryId=45&subCategoryId=10883');
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await delay(6000)
    
    //scroll to the bottom of the page and load all of the items
    await autoScroll(page);
    
    //get all names and prices
    const data = await page.evaluate(()=>{
        
        const list=[]
         
        let names = document.querySelectorAll('.product-cube-name');
        let prices = document.querySelectorAll('.product_cube-price');
        let images = document.querySelectorAll('.product_cube-image');
        for(let i = 0 ; i < names.length ; i++){
            let price;
            let str = names[i].innerText
            let arr =str.split('לחיצה')
            let name = arr[0]
            if(name.includes('\n')){
                let strArr = name.split('\n')
                name = strArr[1]
            }

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

            let thisImg = images[i]
            let img = thisImg.children[0].getAttribute('src')

           
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
}
scrapeHazi()
