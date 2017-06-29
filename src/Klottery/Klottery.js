/**
 * Created by k186 on 2017/6/26.
 */
(function () {
    /*
     * Klottery 宫格抽奖
     *
     * id {String} 装游戏的盒子
     * opt {Object} 配置
     *
     * @param speed {Number} 最大间隔时间
     * @param BoxWidth {PX} 盒子宽度
     * @param BoxHeight {PX} 盒子高度
     * @param CellCount {Number} 几行
     * @param ColumnCount {Number} 几列
     * @param margin {px} 盒子之间距离

     * @param backgroundUrl {String} 背景图路径前缀 必填
     * @param imgType{String} 背景图类型 必填
     * @param color {rgba}  激活颜色
     * @param callback {Function} 抽完后的回调
     *
     * @method fire {Function} 抽奖触发 需要参数 Number 几等奖
     *
     * todo 增加参数类型适配不同风格游戏
     * */
    var styleT = ".Klottery{display:inline-flex;flex-wrap:wrap}.Klottery *{box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.Klottery-box{position:relative}.Klottery-box.Klottery-active{box-shadow:0 1px 2px 0 rgba(0,0,0,.1),0 4px 8px 0 rgba(0,0,0,.2)}.Klottery-item{position:absolute;top:0;right:0;bottom:0;left:0;background:#bbb8b8;background-repeat:no-repeat;background-position:center;background-size:100%}.Klottery-item.active{box-shadow:inset 0 0 625pc 20px rgba(210,255,100,.77)}.Klottery-mask{position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.3)}.Klottery-img{background-repeat:no-repeat;background-position:center;background-size:100%}.Klottery-modal{z-index:2;transform:translateY(20%)}.Klottery-modalBox{display:flex;justify-content:center;align-items:center;position:absolute;top:0;bottom:0;left:0;right:0}.Klottery-btn{border-radius:5px;border:2px solid #fff;color:#fff;text-align:center;font-size:18px;height:40px;line-height:40px;margin:10px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
    var templateMain = '<div class="Klottery"></div>';
    var templateBox = '<div class="Klottery-box">' +
        '                <div class="Klottery-item"></div>' +
        '              </div>';
    var templateModal = '<div class="Klottery-modalBox">' +
        '                 <div class="Klottery-mask"></div>' +
        '                 <div class="Klottery-modal">' +
        '                    <img class="Klottery-img" src="">' +
        '                    <div class="Klottery-btn J_ok">确认</div>' +
        '                 </div>' +
        '              </div>';

    function Klottery(id, opt) {
        this.id = id;
        this.dom = null;
        this.modalDom = null;
        this.options = _fn.initOptions(opt);
        this.isFire = false;
        _fn.init.apply(this);
    }

    Klottery.prototype = {
        fire: function () {
            if (this.isFire) {
                return
            }
            var Max = 100;
            var Min = 0;
            var Range = Max - Min;
            var Rand = Math.random();
            var start = Min + Math.round(Rand * Range);
            //随机初始速度
            _fn.reset.apply(this);
            var that = this;
            setTimeout(function () {
                _fn.animation.apply(that, [0, start]);
            }, 1000);
        },
        showModal: function (opt) {
            this.modalDom = $(templateModal).clone();
            this.modalDom.attr('id', 'sfsdafdsa');
            this.modalDom.find('img').attr('src', opt.src);
            var that = this;
            this.modalDom.find('.J_ok').on('click', function () {
                that.hideModal();
            });
            this.modalDom.appendTo($('body'));
        },
        hideModal: function () {
            this.modalDom.remove();
            _fn.reset.apply(this);
        }
    };

    var _fn = {
        loadDom: function () {
            this.dom = $(templateMain).clone();
            this.dom.css('width', (this.options.BoxWidth + this.options.margin * 2) * this.options.ColumnCount + 'px');
            this.dom.css('height', (this.options.BoxHeight + this.options.margin * 2) * this.options.CellCount + 'px');
            //box
            // for (var i = 1; i < this.options.BoxCount+1; i++) {
            //     var box = $(templateBox).clone();
            //     box.css('width', this.options.BoxWidth + 'px');
            //     box.css('height', this.options.BoxHeight + 'px');
            //     box.css('margin', this.options.margin + 'px');

            //     box.attr('data-Klottery', i);
            //     box.find('.Klottery-item').css('backgroundImage', 'url(' + this.options.backgroundUrl + (i) + this.options.imgType + ')');
            //     box.appendTo(this.dom);
            // }
            var dataK = 1;
            for (var i = 1; i < this.options.CellCount + 1; i++) {
                var cell = [];
                for (var k = 1; k < this.options.ColumnCount + 1; k++) {
                    var box = $(templateBox).clone();
                    box.css('width', this.options.BoxWidth + 'px');
                    box.css('height', this.options.BoxHeight + 'px');
                    box.css('margin', this.options.margin + 'px');

                    box.attr('data-Klottery', dataK);
                    box.find('.Klottery-item').css('backgroundImage', 'url(' + this.options.backgroundUrl + (dataK) + this.options.imgType + ')');
                    dataK += 1;
                    cell.push(box);
                }
                //偶数行 反转
                if (i % 2 == 0) {
                    cell.reverse();
                }
                var that = this;
                cell.forEach(function (val, index) {
                    val.appendTo(that.dom);
                });
            }

            if (!this.id) {
                console.warn('必须输入挂载ID');
                return false
            }
            this.dom.appendTo($('#' + this.id));
        },
        initOptions: function (opt) {
            return {
                speed: opt.speed || 300,
                BoxCount: opt.CellCount * opt.ColumnCount || 9,
                BoxWidth: opt.BoxWidth || 20,
                BoxHeight: opt.BoxHeight || 20,
                CellCount: opt.CellCount || 3,
                ColumnCount: opt.ColumnCount || 3,
                margin: opt.margin || 1,
                backgroundUrl: opt.backgroundUrl || '',
                imgType: opt.imgType || '',
                color: opt.color || 'rgba(210, 255, 100, 0.77)',
                callback: opt.callback || false
            }
        },
        init: function () {
            _fn.loadDom.apply(this);
        },
        animation: function (i, speed) {
            this.isFire = true;
            if (i >= this.options.BoxCount) {
                i = 0;
            }
            //console.log(i);
            //this.dom.find("div[data-Klottery=" + (i + 1) + "]").addClass('Klottery-active');
            this.dom.find("div[data-Klottery=" + (i + 1) + "]").find('.Klottery-item').addClass('active');
            this.dom.find("div[data-Klottery=" + (i + 1) + "]").find('.Klottery-item').css('boxShadow', 'inset 0 0 10000px 20px ' + this.options.color);
            var that = this;
            setTimeout(function () {
                var spd = speed + 8;
                if (that.options.speed < Math.abs(speed)) {
                    that.isFire = false;
                    if (typeof that.options.callback == 'function') {
                        that.options.callback();
                    }
                    return
                }
                //that.dom.find("div[data-Klottery=" + (i + 1) + "]").removeClass('Klottery-active');
                that.dom.find("div[data-Klottery=" + (i + 1) + "]").find('.Klottery-item').removeClass('active');
                that.dom.find("div[data-Klottery=" + (i + 1) + "]").find('.Klottery-item').css('boxShadow', '');
                i += 1;
                _fn.animation.apply(that, [i, spd]);
            }, Math.abs(speed))
        },
        reset: function () {
            this.dom.find(".active").css('boxShadow', '');
            this.dom.find(".active").removeClass('active');
        },
        loadCss: function () {
            var styleBox = document.createElement('style');
            styleBox.innerHTML = styleT;
            document.getElementsByTagName('head')[0].appendChild(styleBox);
        }
    };
    _fn.loadCss();
    window.Klottery = Klottery
})();