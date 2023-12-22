import tabs from './modules/tabs';
import modals from './modules/modal';
import sliders from './modules/slider';
import cards from './modules/foodCards';
import caloryCalculator from './modules/calculator';
import timers from './modules/timer';

tabs({tabcontentSelector: '.tabcontent', tabheaderSelector: '.tabheader'});
modals({modalFormSelector: '.modal--form', modalDoneSelector: '.modal--done', modalErrorSelector: '.modal--error', closeBtnsSelector: '.modal__close', showBtnsSelector: '[data-modal]', clientFormSelector: '.modal--form form', recalFormSelector: '.order__form'});
sliders({sliderSelector: '.offer__slider', slidesSelector: '.offer__slide', curentSelector: '#current', totalSelector: '#total'});
cards({menuWrapperSelector: '.menu__wrapper', menuItemClass: 'menu__item'});
caloryCalculator('.calculating');
timers({days: '#days', hours: '#hours', minutes: '#minutes', seconds: '#seconds', endDate: '2024-01-01 00:00'});


// trash

// const getData = async (url) => {
//     const result = await fetch(url);

//     if(!result.ok) {
//         throw new Error(`Could not get data from ${url}, request status: ${result.status}`);
//     }

//     return await result.json();
// }

// const postData = async (data, url) => {
//     const result = await fetch(url, {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: data,
//     });

//     return await result.json();
// }



// class Slider {
//     constructor (slides, nextBtn, prevBtn, curentCounter, totalCounter) {
//         this.slides = [];
//         slides.forEach(item => {
//             this.slides.push(item);
//         });
//         this.activeSlide = 0;
//         this.nextBtn = nextBtn;
//         this.prevBtn = prevBtn;
//         this.curentCounter = curentCounter;
//         this.totalCounter = totalCounter;
//         this.size = slides.length;
//         this.totalCounter.innerText = this.size;

//         nextBtn.addEventListener('click', ()=>{
//             this.nextSlide();
//         });
//         prevBtn.addEventListener('click', ()=>{
//             this.prevSlide();
//         });
//         this.updateSlider();
//     }

//     updateSlider () {
//         this.slides.forEach(element => {
//             element.classList.remove('offer__slide--start');
//             element.classList.remove('offer__slide--active');
//         });
//         this.slides[this.activeSlide].classList.add('offer__slide--active');
//         this.curentCounter.innerText = this.activeSlide + 1;
//     }

//     nextSlide () {
//         if(this.activeSlide >= this.slides.length - 1) {
//             this.activeSlide = 0;
//         } else {
//             this.activeSlide++;
//         }
//         this.updateSlider();
//     }

//     prevSlide () {
//         if(this.activeSlide === 0) {
//             this.activeSlide = this.slides.length - 1;
//         } else {
//             this.activeSlide--;
//         }
//         this.updateSlider();
//     }
// }



//    offerSlides = document.querySelectorAll('.offer__slide'),






