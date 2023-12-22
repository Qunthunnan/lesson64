export default function sliders({sliderSelector, slidesSelector, curentSelector, totalSelector}) {
    //Slider

    class Slider {
        constructor (sliderTrack, nextBtn, prevBtn, curentCounter, totalCounter) {
            this.sliderTrack = sliderTrack;
            this.activeSlide = 1;
            this.trackPositionX = 0;
            this.originalSliderContent = sliderTrack.querySelectorAll(slidesSelector);
            this.size = this.originalSliderContent.length;
            this.sliderWidth = +getComputedStyle(sliderTrack.querySelector(slidesSelector)).width.slice(0, -2);
            this.nextBtn = nextBtn;
            this.prevBtn = prevBtn;
            this.curentCounter = curentCounter;
            this.curentCounter.textContent = this.activeSlide;
            this.totalCounter = totalCounter;
            this.totalCounter.textContent = this.size;
            this.fillSliderTrack();
            this.sliderTrack.style.transition = 'all 0.5s ease 0s';
            this.createPagination();
            this.pagination = document.querySelector(`${sliderSelector}_pagination`);
            this.paginationItems = this.pagination.querySelectorAll(`${sliderSelector}_pagination li`);


            nextBtn.addEventListener('click', ()=>{
                this.nextSlide();
            });
            prevBtn.addEventListener('click', ()=>{
                this.prevSlide();
            });
            this.pagination.addEventListener('click', (e) => {
                if(e.target && e.target.matches(`${sliderSelector}_pagination li`)) {
                    let dotIndex = +e.target.getAttribute('data-slide');
                    if(this.activeSlide !== dotIndex + 1) {
                        this.trackPositionX = this.sliderWidth*-dotIndex - this.sliderWidth;
                        this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
                        this.activeSlide = dotIndex + 1;
                        this.curentCounter.textContent = this.activeSlide;
                        this.updatePagination();
                    }
                }
            });
        }

        fillSliderTrack () {
            for(let i = this.size - 1; i >= this.size - 1; i--) {
                this.sliderTrack.prepend(this.originalSliderContent[i].cloneNode(true));
            }
            for(let i = 0; i < 1; i++) {
                this.sliderTrack.append(this.originalSliderContent[i].cloneNode(true));
            }
            this.trackPositionX = this.sliderWidth * -1;
            this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
        }

        createPagination () {
            let pagination = document.createElement('ul');
            pagination.classList.add(`${sliderSelector.slice(1)}_pagination`);
            for(let i = 0; i < this.size; i++) {
                let dot = document.createElement('li');
                dot.setAttribute('data-slide', i);
                if(i + 1 === this.activeSlide) {
                    dot.classList.add('offer__dot_active');
                }
                pagination.append(dot);
            }
            this.sliderTrack.parentNode.parentNode.append(pagination);
        }

        // negativeRefill() {
        //     for(let i = this.size - 1; i >= 0; i--) {
        //         this.sliderTrack.lastChild.remove();
        //         this.sliderTrack.prepend(this.originalSliderContent[i].cloneNode(true));
        //     }
        // }

        // positiveRefill() {
        //     for(let i = 0; i < this.size; i++) {
        //         this.sliderTrack.firstChild.remove();
        //         this.sliderTrack.append(this.originalSliderContent[i].cloneNode(true));
        //     }
        // }

        updatePagination () {
            this.pagination.querySelector('.offer__dot_active').classList.remove('offer__dot_active');
            this.paginationItems[this.activeSlide - 1].classList.add('offer__dot_active');
        }

        nextSlide () {
            if(this.activeSlide === this.size) {
                this.activeSlide = 0;
                this.fakeTrackMove(true);
            } else {
                this.activeSlide++;
                this.curentCounter.textContent = this.activeSlide;
                this.trackPositionX -= this.sliderWidth;
                this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
                this.updatePagination();
            }
        }

        prevSlide () {
            if(this.activeSlide === 1) {
                this.activeSlide = this.size + 1;
                this.fakeTrackMove(false);
            } else {
                this.activeSlide--;
                this.curentCounter.textContent = this.activeSlide;
                this.trackPositionX += this.sliderWidth;
                this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
                this.updatePagination();
            }
        }

        // rebuildCounter (direction) {
        //     if (direction) {
        //         if(this.activeSlide === this.size) {
        //             this.activeSlide = 1;
        //             this.curentCounter.textContent = this.activeSlide;
        //         } else {
        //             this.activeSlide++;
        //             this.curentCounter.textContent = this.activeSlide;
        //         }
        //     } else {
        //         if(this.activeSlide === 1) {
        //             this.activeSlide = this.size;
        //             this.curentCounter.textContent = this.activeSlide;
        //         } else {
        //             this.activeSlide--;
        //             this.curentCounter.textContent = this.activeSlide;
        //         }
        //     }
        // }

        fakeTrackMove(direction) {
            this.sliderTrack.style.transition = 'none';
            if (direction) {
                this.trackPositionX = 0;
                this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
                setTimeout(() => {
                    this.sliderTrack.style.transition = 'all 0.5s ease 0s';
                    this.nextSlide();
                }, 1);
            } else {
                this.trackPositionX = this.sliderWidth * -this.size - this.sliderWidth;
                this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
                setTimeout(() => {
                    this.sliderTrack.style.transition = 'all 0.5s ease 0s';
                    this.prevSlide();
                }, 1);
            }
        }
    }

    const   sliderTrack = document.querySelector(`${sliderSelector}_track`),
            nextSlideBtn = document.querySelector(`${sliderSelector}-next`),
            prevSlideBtn = document.querySelector(`${sliderSelector}-prev`),
            curSliderCounter = document.querySelector(`${curentSelector}`),
            totalSliderCounter = document.querySelector(`${totalSelector}`),
            slider = new Slider(sliderTrack, nextSlideBtn, prevSlideBtn, curSliderCounter, totalSliderCounter);
}