class Slider {
    constructor(props) {
        const { slider, sliderLine, nextBtn, prevBtn, sliderTransition, dir, autoplay } = props
        this.slider = document.querySelector(slider)
        this.sliderLine = document.querySelector(sliderLine)
        this.nextBtn = document.querySelector(nextBtn)
        this.prevBtn = document.querySelector(prevBtn)
        this.slides = this.sliderLine.children

        this.height = this.slider.clientHeight
        this.width = this.slider.clientWidth
        this.activeSlide = 0
        this.dir = dir ? dir : 'X'
        this.moveSize = this.dir == 'Y' ? this.height : this.width
        this.sliderTransition = sliderTransition

        this.sliderLine.style = `position: relative;
                                 height: 100%;
                                 overflow: hidden
                                 
                                `

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style = `position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    `

            if (i !== this.activeSlide) {
                this.slides[i].style.transform = `translate${this.dir}(${this.moveSize}px)`;
            }
            if (i === this.slides.length - 1) {
                this.slides[i].style.transform = `translate${this.dir}(${-this.moveSize}px)`;
            }
        }
        // autoplay
        if (autoplay) this.startInterval()
        this.slider.addEventListener('mouseenter', () => clearInterval(this.interval))
        this.slider.addEventListener('mouseleave', () => this.startInterval())

        // btn
        this.nextBtn.addEventListener('click', () => this.move(this.nextBtn))
        this.prevBtn.addEventListener('click', () => this.move(this.prevBtn))
    }
    startInterval() {
        this.interval = setInterval(() => {
            this.move(this.nextBtn)
        }, this.sliderTransition * 2);
    }
    move(btn) {
        let moveSize = btn === this.nextBtn ? -this.moveSize : this.moveSize

        btn.disabled = true
        setTimeout(() => {
            btn.disabled = false
        }, this.sliderTransition * 2);

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = '0ms'
            if (i !== this.activeSlide) {
                this.slides[i].style.transform = `translate${this.dir}(${-moveSize}px)`
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${moveSize}px)`
        this.slides[this.activeSlide].style.transition = `${this.sliderTransition}ms`

        if (btn == this.nextBtn) {
            if (this.activeSlide < this.slides.length - 1) {
                this.activeSlide++
            } else {
                this.activeSlide = 0
            }
        } else {
            if (this.activeSlide == 0) {
                this.activeSlide = this.slides.length - 1
            } else {
                this.activeSlide--
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`
        this.slides[this.activeSlide].style.transition = `${this.sliderTransition}ms`
    }
}

new Slider({
    slider: '.slider',
    sliderLine: '.slider__line',
    nextBtn: '.slider__next',
    prevBtn: '.slider__prev',
    sliderTransition: 2000,
    dir: 'X',
    autoplay: true
})


const hamburger = document.querySelector(' .hamburger')
const mobileMenu = document.querySelector(' .nav__list ul')
const menuItem = document.querySelectorAll('.nav__list ul li a')
const nav = document.querySelector('.nav')

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    mobileMenu.classList.toggle('active')
})


document.addEventListener('scroll', () => {
    var scrollPosition = window.scrollY;
    if(scrollPosition > 250){
      nav.style.backgroundColor = '#29323c'  
    } else{
      nav.style.backgroundColor = 'transparent'  
    }
   
})



menuItem.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active')
    })
})