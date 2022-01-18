function Swiper(option) {
    
    var module = function () {
        this.init()
        this.bind()
        option.autoplay && this.autoplay(option.interval)
    }

    module.prototype = {
        init: function () {
            this.elWrapper = document.querySelector(option.selector)
            this.currentIndex = 0
            this.elBtnRight = this.elWrapper.querySelector('.btn-right')
            this.elBtnLeft = this.elWrapper.querySelector('.btn-left')
            this.len = this.elWrapper.querySelectorAll('.swiper-item').length
        },
        bind: function () {
            var that = this
            this.elBtnLeft.addEventListener('click', function () {
                that.prev()
            })
            this.elBtnRight.addEventListener('click', function () {
                that.next()
            })
            var elListDot = this.elWrapper.querySelector('.dot-list')
            elListDot.addEventListener('click', function (e) {
                if (e.target.classList.contains('dot')) {
                    var index = e.target.dataset.index
                    console.log('现在点击的是第' + index + '个点点')
                    that.handleCurrentIndexChange(index)
                }
            })
            this.elWrapper.addEventListener('mouseenter', function() {
                clearInterval(that.timer)
            })
            this.elWrapper.addEventListener('mouseleave', function() {
                that.timer = setInterval(function () {
                    that.next();
                },option.interval);
            })
        },
        prev() {
            var to = this.currentIndex - 1;
            if (option.loop) {
                if(this.isBoundary(to) === 'left') {
                    to = this.len - 1
                }else {
                    to = to + 1
                }
            }
            this.handleCurrentIndexChange(to)
        },
        next() {
            var to = this.currentIndex + 1
            if(this.isBoundary(to) === 'right') {
                if (option.loop) {
                    var to = 0
                }else {
                    var to = to - 1
                }
            }
            this.handleCurrentIndexChange(to)
        },
        go(to) {
            if (to < 0 || to >= this.len) {
                return
            }
            this.handleCurrentIndexChange(to)
        },

        isBoundary(to) {
            if(to >= this.len) {
                return 'right'
            }
            if(to <= 0) {
                return 'left'
            }
            return false
        },

        autoplay: function (){
            var _this = this
            this.timer = setInterval(function () {
                _this.next();
            },option.interval);
        },

        handleCurrentIndexChange: function (to) {
            console.log('现在显示的是第', this.currentIndex, '个')
            console.log('把第', to, '显示出来，其他都隐藏')
            this.elWrapper.querySelectorAll('.swiper-item')[this.currentIndex].classList.remove('swiper-item-current')
            this.elWrapper.querySelectorAll('.swiper-item')[to].classList.add('swiper-item-current')
            this.currentIndex = to
        }
    }

    return new module()
}

