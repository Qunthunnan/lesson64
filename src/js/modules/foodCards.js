import axios from 'axios';

export default function cards({menuWrapperSelector, menuItemClass}) {
    //Cards

    class FoodItem {
        constructor (imagePath, imageAlt, title, descr, price, usdRate) {
            this.imagePath = imagePath;
            this.imageAlt = imageAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            if(usdRate && typeof(usdRate) === 'number') {
                this.usdRate = usdRate;
                this.price = Math.floor(this.usdRate * this.price);
            }
        }

        menuFiller(wrapper) {
            let menuItem = document.createElement('div');
            menuItem.classList.add(`${menuItemClass}`);
            menuItem.innerHTML = `
                <img src="${this.imagePath}" alt="${this.imageAlt}">
                <h3 class="${menuItemClass}-subtitle">${this.title}</h3>
                <div class="${menuItemClass}-descr">${this.descr}</div>
                <footer class="${menuItemClass}_footer">
                    <div class="${menuItemClass}-divider"></div>
                    <div class="${menuItemClass}-price">
                        <div class="${menuItemClass}-cost">Цена:</div>
                        <div class="${menuItemClass}-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </footer>
            `;
            wrapper.append(menuItem);
        }
    }

    function makeFoodMenu() {
        // getData('http://localhost:3000/menu')
        axios.get('http://localhost:3000/menu')
        .then(result => {
            result.data.forEach(({img, altimg, title, descr, price}) => {
                new FoodItem(img, altimg, title, descr, price, usdRate).menuFiller(foodMenuWrapper);
            });
        });
    }

    const foodMenuWrapper = document.querySelector(menuWrapperSelector);

    let usdRate; 

    axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=usd&json')
    .then(result => {
        usdRate = result.data[0]['rate'];
    })
    .finally(makeFoodMenu);
}