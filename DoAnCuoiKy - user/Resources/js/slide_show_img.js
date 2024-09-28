
const listImg = document.querySelector('.list-img');
const imgs = document.getElementsByClassName('slide-img');
const lengh = imgs.length;

const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
let curr = 0


const handleChangeSlide = () => {
    if(curr == lengh-1 ){
        curr = 0
        let width = imgs[0].offsetWidth
        listImg.style.transform = `translateX(0px)`;
        document.querySelector('.active').classList.remove('active')
        document.querySelector('.index-item-'+ curr).classList.add('active')
    }else{
        curr ++
        let width = imgs[0].offsetWidth
        listImg.style.transform = `translateX(${-width * curr}px)`;
        document.querySelector('.active').classList.remove('active')
        document.querySelector('.index-item-'+ curr).classList.add('active')
    }
}

let handleEventChangeSlide = setInterval(handleChangeSlide,3000);

btnRight.addEventListener('click',() => {
    clearInterval(handleEventChangeSlide);
    handleChangeSlide();
    handleEventChangeSlide = setInterval(handleChangeSlide,4000);
})

btnLeft.addEventListener('click', () =>{
    clearInterval(handleEventChangeSlide);
    if(curr == 0 ){
        curr = lengh-1
        let width = imgs[0].offsetWidth
        listImg.style.transform = `translateX(${-width*curr}px)`;
        document.querySelector('.active').classList.remove('active')
        document.querySelector('.index-item-'+ curr).classList.add('active')
    }else{
        curr --
        let width = imgs[0].offsetWidth
        listImg.style.transform = `translateX(${-width * curr}px)`;
        document.querySelector('.active').classList.remove('active')
        document.querySelector('.index-item-'+ curr).classList.add('active')
    }
    handleEventChangeSlide = setInterval(handleChangeSlide,3000);
})