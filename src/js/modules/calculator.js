export default function caloryCalculator(calculatorSelector) {
    //Calculator by Harris Benedict formula
    class CalloryCalc {
        constructor (mainElement, keys, maleValues, activityValue, height, weight, age) {
            try {
                this.mainElement = mainElement;
                this.classSelector = this.mainElement.classList[0];
                if(!mainElement.querySelector(`.${this.classSelector}__choose-item`)) {
                    throw "choose-item not found";
                }

                if(this.keysChecker(keys)) {
                    this.keys = keys;
                } else
                    return undefined
                
                if (this.mainElement.querySelector(`#gender .${this.classSelector}__choose-item_active`)) {
                    this.maleValues = this.keys[this.mainElement.querySelector(`#gender .${this.classSelector}__choose-item_active`).getAttribute('data-key')];
                } else
                    this.maleValues = [];

                if (maleValues) {
                    for(let i in this.keys) {
                        if(JSON.stringify(this.keys[i]) === JSON.stringify(maleValues)) {
                            this.mainElement.querySelector(`#gender .${this.classSelector}__choose-item_active`).classList.remove(`${this.classSelector}__choose-item_active`);
                            this.mainElement.querySelector(`#gender [data-key="${i}"]`).classList.add(`${this.classSelector}__choose-item_active`);
                            this.maleValues = maleValues;
                            break;
                        }
                    }
                }

                if (this.mainElement.querySelector(`#activity .${this.classSelector}__choose-item_active`)) {
                    this.activityValue = this.keys[this.mainElement.querySelector(`#activity .${this.classSelector}__choose-item_active`).getAttribute('data-key')];
                } else
                    this.activityValue = 0;

                if (activityValue) {
                    for(let i in this.keys) {
                        if(JSON.stringify(this.keys[i]) === JSON.stringify(activityValue)) {
                            this.mainElement.querySelector(`#activity .${this.classSelector}__choose-item_active`).classList.remove(`${this.classSelector}__choose-item_active`);
                            this.mainElement.querySelector(`#activity [data-key="${i}"]`).classList.add(`${this.classSelector}__choose-item_active`);
                            this.activityValue = activityValue;
                            break;
                        }
                    }
                }

                this.mainElement.addEventListener('click', (e) => {
                    this.chooseKey(e);
                });

                this.paramInputs = mainElement.querySelectorAll(`input.${this.classSelector}__choose-item`);
                this.calcResult = mainElement.querySelector(`.${this.classSelector}__result span`);

                if (height) {
                    this.height = height;
                    this.mainElement.querySelector('#height').value = height;
                } else
                    this.height = 0;
                
                if (weight) {
                    this.weight = weight;
                    this.mainElement.querySelector('#weight').value = weight;
                } else
                    this.weight = 0;

                if (age) {
                    this.age = age;
                    this.mainElement.querySelector('#age').value = age;
                } else
                    this.age = 0;

                this.paramInputs.forEach(element => {
                    element.addEventListener('input', (e) => {
                        this.inputingParams(e);
                    });
                });

                this.calcData();
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }

        chooseKey (e) {
            if(e.target && e.target.matches(`.${this.classSelector}__choose-item`) && e.target.nodeName !== 'INPUT' && Object.keys(this.keys).includes(e.target.getAttribute('data-key'))) {
                if(e.target.getAttribute('data-key') === Object.keys(this.keys)[0] || e.target.getAttribute('data-key') === Object.keys(this.keys)[1]) {
                    this.maleValues = this.keys[e.target.getAttribute('data-key')];
                    
                    this.mainElement.querySelector(`#gender .${this.classSelector}__choose-item_active`).classList.remove(`${this.classSelector}__choose-item_active`);
                } else {
                    this.activityValue = this.keys[e.target.getAttribute('data-key')];

                    this.mainElement.querySelector(`#activity .${this.classSelector}__choose-item_active`).classList.remove(`${this.classSelector}__choose-item_active`);
                }
                e.target.classList.add(`${this.classSelector}__choose-item_active`);
                
                this.calcData();
            }
        }

        inputingParams (e) {
            try {
                const validatios = {
                    age: /^[1-9]$|^([1-9]\d)$|^(1[0-3]\d)$/,
                    weight: /^[1-9]$|^([1-9]\d)$|^([1-2][0-9]\d)$/,
                    height: /^([5-9]\d)$|^([1-2][0-9]\d)$/,
                }
        
                let attribute = e.target.getAttribute('id'),
                    validation = validatios[attribute];

                if(validation.test(e.target.value)) {
                    e.target.classList.remove(`${this.classSelector}__input_error`);
                    this[attribute] = +e.target.value;
                } else {
                    e.target.classList.add(`${this.classSelector}__input_error`);
                    this[attribute] = 0;
                }

                this.calcData();
            } catch (error) {
                console.error(error);
                return false;
            }
        }

        keysChecker (keys) {
            let counter = 0;
            try {
                for (let i in keys) {
                    if(this.mainElement.querySelector(`[data-key=${i}]`)) {
                        counter++;
                    } else
                        throw `Element with data-key attribute is not found`;
                }

                if(counter > 0)
                    return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }

        calcData() {
            if (this.maleValues[0] && this.activityValue > 0 && this.age > 0 && this.height > 0 && this.weight > 0) {
                let result = Math.floor(this.maleValues[0] + (this.maleValues[1] * this.weight) + (this.maleValues[2] * this.age) * this.activityValue);
                this.calcResult.textContent = result; 
            } else {
                this.calcResult.textContent = '___';
            }
            localStorage.setItem('calculator', JSON.stringify({
                maleValues: this.maleValues, 
                activityValue: this.activityValue,
                height: this.height,
                weight: this.weight,
                age: this.age,
            }));
        }
    }

    const calorySectElement = document.querySelector(calculatorSelector);

    let calculator;
    if (localStorage.getItem('calculator')) {
        calculator = new CalloryCalc (calorySectElement, {
            male: [ 66, 13.7 , 5 , 6.7 ],
            female: [ 665, 13.7 , 5 , 6.7],
            low: 1,
            small: 1.2,
            medium: 1.3,
            high: 1.8,
        }, ...Object.values(JSON.parse(localStorage.getItem('calculator'))) );
    } else {
        calculator = new CalloryCalc(calorySectElement, {
            male: [ 66, 13.7 , 5 , 6.7 ],
            female: [ 665, 13.7 , 5 , 6.7],
            low: 1,
            small: 1.2,
            medium: 1.3,
            high: 1.8,
        });
    }
}