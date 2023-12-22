import axios from 'axios';

export default function modals({modalFormSelector, modalDoneSelector, modalErrorSelector, closeBtnsSelector, showBtnsSelector, clientFormSelector, recalFormSelector}) {
    //Modal

    function eventCloseModal(e) {
        if(e.target && e.target.matches(`.${modal.classList[0]}`)) {
            closeModal(e.target);
        }
    }

    function eventCloseKey(e, modal) {
        if (e.code == 'Escape') {
            closeModal(modal);
        }
    }

    function showModal(modal) {
        if (getComputedStyle(modal).display == 'none' || modal.style.display == 'none') {
            modal.style.opacity = '0';
            modal.style.display = 'block';
            function addVisability() {
                let opacity = +getComputedStyle(modal).opacity;
                if(opacity >= 1) {
                    document.body.style.overflow = 'hidden';
                    modal.addEventListener('click', eventCloseModal);
                    document.addEventListener('keydown', (e) => eventCloseKey(e, modal));
                    clearTimeout(autoOpenTimId);
                    clearInterval(showModalInvId);
                } else {
                    opacity += 0.03;
                    modal.style.opacity = opacity;
                }
            }

            showModalInvId = setInterval(addVisability, 16);
        }
    }

    function closeModal(modal, action) {
        if (modal.style.display !== 'none' || getComputedStyle(modal).display !== 'none') {
            function removeVisability(action) {
                let opacity = +getComputedStyle(modal).opacity;
                if(opacity <= 0) {
                    modal.style.display = 'none';
                    modal.removeEventListener('click', eventCloseModal);
                    document.removeEventListener('keydown', eventCloseKey);
                    document.body.style.overflow = '';
                    if(action) {
                        action();
                    }
                    clearInterval(closeModalInvId);
                } else {
                    opacity -= 0.03;
                    modal.style.opacity = opacity;
                }
            }

            if(action) {
                closeModalInvId = setInterval(()=>{
                    removeVisability(action);
                }, 16);
            } else {
                closeModalInvId = setInterval(removeVisability, 16);
            }
        }
    }

    function openOnBottom() {
        if(window.scrollY+1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modal);
            window.removeEventListener('scroll', openOnBottom);
        }
    } //Openning modal--form when user scrolls to bottom page

    const modal = document.querySelector(modalFormSelector),
        modalDone = document.querySelector(modalDoneSelector),
        modalError = document.querySelector(modalErrorSelector),
        closeModalBtns = document.querySelectorAll(closeBtnsSelector),
        showModalBtns = document.querySelectorAll(showBtnsSelector),
        clientForm = modal.querySelector(clientFormSelector),
        recalForm = document.querySelector(recalFormSelector);
    let showModalInvId,
        closeModalInvId,
        autoOpenTimId;

    closeModalBtns.forEach((btn) => {
        btn.addEventListener('click', (e)=>{
            closeModal(e.target.closest(`.${modal.classList[0]}`));
        });
    });

    showModalBtns.forEach((btn) => {
        btn.addEventListener('click', (e)=>{
            showModal(modal);
        });
    });

    clientForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const userData = new FormData(e.target);

        // postData(JSON.stringify(Object.fromEntries(userData)), 'http://localhost:3000/requests')
        axios.post('http://localhost:3000/requests', Object.fromEntries(userData))
        .then((response)=>{
            console.log(response);
            closeModal(modal, () => {
                showModal(modalDone);
            });
        }).catch(()=>{
            closeModal(modal, () => {
                showModal(modalError);
            });
            console.error(response);
        })
        .finally(()=>{
            e.target.reset();
        });
    });

    recalForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const userData = new FormData(e.target);
        // postData(JSON.stringify(Object.fromEntries(userData)), 'http://localhost:3000/requests')
        axios.post('http://localhost:3000/requests', Object.fromEntries(userData))
        .then((response)=>{
            console.log(response);
            showModal(modalDone);
        }).catch(()=>{
            showModal(modalError);
            console.error(response);
        })
        .finally(()=>{
            e.target.reset();
        });
    });

    window.addEventListener('scroll', openOnBottom);

    autoOpenTimId = setTimeout(()=>{
        showModal(modal);
    }, 1000*60*10);
}