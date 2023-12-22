export default function tabs({tabheaderSelector, tabcontentSelector}) {
    //Tabs
    function tabsHide() {
        sliders.forEach((element) => {
            element.classList.remove(`${tabcontentSelector.slice(1)}--active`);
            element.classList.remove(`${tabcontentSelector.slice(1)}--show`);
        });
    }

    function menuSwitch(item) {
        tabItems.forEach((element)=>{
            element.classList.remove(`${tabheaderSelector.slice(1)}__item--active`);
        });
        item.classList.add(`${tabheaderSelector.slice(1)}__item--active`);
    }

    function tabShow(item) {
        item.classList.add(`${tabcontentSelector.slice(1)}--show`);
    }

    const sliders = document.querySelectorAll(tabcontentSelector),
        tabItems = document.querySelectorAll(`${tabheaderSelector}__item`),
        tabWrapper = document.querySelector(`${tabheaderSelector}__items`);

    tabWrapper.addEventListener('click', (e)=>{
    const target = e.target;
    if(target && target.matches(`${tabheaderSelector}__item`)) {
        tabItems.forEach((element, i)=>{
            if(element == target) {
                menuSwitch(element);
                tabsHide();
                tabShow(sliders[i]);
            }
        });
    }
    });
}