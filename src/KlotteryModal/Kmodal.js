/**
 * Created by k186 on 2017/6/26.
 */
(function () {
    function Kmodal(id, opt) {
        this.id = id;
        this.options = opt;
        this.canFire = false;
        _fn.init.apply(this, [opt, id]);
    }

    /*
     * Kmodal
     * opt {Object} 初始化配置
     *
     * opt @param queryEvt {Function} 查询小票信息方法
     * opt @param fireEvt  {Function} 抽奖
     *
     * queryEvt 回调参数
     * @param canFire {Bool}
     * @param data {Object} 用户信息 包含  userName  phone  amount userNo message
     *
     * 主要方法
     *
     * @method show {Function} 弹窗显示
     * @method hide {Function} 弹窗关闭
     * @method setMsg {Function} 设置弹窗信息
     * */
    /* var a = {
     canFire: true,
     userData: {
     userName: '水电工',
     phone: '32432423',
     amount: '44',
     userNo: '432432fgdgfd'
     },
     error: {
     main: '543',
     second: '43543'
     }
     }*/
    // example


    /* 模板 */
    var styleT = '@charset "UTF-8";.Kmodal{font-family:"PingFangSC-Semibold","PingFang SC Semibold","PingFang SC","微软雅黑";color:#666;}.Kmodal{position:absolute;top:0;right:0;bottom:0;left:0;}.Kmodal-mask{background:rgba(0,0,0,0.3);transition:all .3s ease-in-out;opacity:0;}.Kmodal-mask{position:absolute;top:0;right:0;bottom:0;left:0;}.Kmodal-mask.active{opacity:1;}.Kmodal-box{transition:all .3s ease-in-out;transform:translate(-50%,-60%);opacity:0;position:relative;display:inline-block;overflow:hidden;border-radius:4px;top:50%;right:50%;bottom:50%;left:50%;background:white;width:500px;padding:25px 25px 10px 25px;}.Kmodal-show{transform:translate(-50%,-50%);opacity:1;}.Kmodal-head{padding:5px;}.Kmodal-title{font-size:18px;text-align:center;}.Kmodal-cancel{position:absolute;right:10px;top:10px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAQVJREFUOBGtkwsKwjAMhtdOPZYgCh5DJsoeB9oDFdk9RMFjKdvMr+vourQyMVCaNfm/pVkmsixbSykfYRjevB+sKIpFXdczSdonrXOapquxnFZzBkPGcXytqmpHVR3GwJALDbRgCFWFClCZ+yRJLuqc27ncDgQBl2CCbDk90DeYDQLdAGSDuSBWkA4jf4NnstLVP7aij87z8jyfA9A+b6IouquYuWOO/mJWEHpCb0A1uBpW2Z6ROzQWpDcW18FCf1xDO+iRDjEH0xXrgVyJ6jK2nA5kS1AAfedy3yAuoAs539QImpWlEOKEv9jsCQfQzwDzff9IH2Irm6aZUDAYCwGw1QTkTl+Nbdsq+36o9QAAAABJRU5ErkJggg==");background-repeat:no-repeat;background-position:center;width:13px;height:13px;cursor:pointer;}.Kmodal-input{width:100%;height:34px;border:1px solid #d9d9d9;border-radius:3px;text-indent:10px;padding:10px 0;margin:20px 0;}.Kmodal-user{display:flex;flex-direction:column;border:1px dashed #e1e1e1;padding:10px;border-radius:5px;color:#999;font-size:14px;font-weight:400;}.Kmodal-row{display:flex;justify-content:space-around;}.Kmodal-label{white-space:nowrap;padding:10px;}.Kmodal-value{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:10px;width:100%;cursor:pointer;}.Kmodal-info{padding:20px 0;font-size:34px;text-align:center;}.Kmodal-red{color:red;}.Kmodal-foot{display:flex;justify-content:center;}.Kmodal-btn{padding:5px;width:90px;text-align:center;color:white;background:#a7a7a7;border-radius:5px;margin:0 10px;font-size:14px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.Kmodal-query{background:#00aaee;}.Kmodal-fire{background:red;}';
    var modalDom = '<div class="Kmodal" style="display: none;">' +
        '    <div class="Kmodal-mask J_mask"></div>' +
        '    <div class="Kmodal-box">' +
        '        <div class="Kmodal-head">' +
        '            <div class="Kmodal-title">抽奖资格验证</div>' +
        '            <div class="Kmodal-cancel J_cancel"></div>' +
        '        </div>' +
        '        <div class="Kmodal-body">' +
        '            <input class="Kmodal-input J_input" type="text" placeholder="请输入购物小票"/>' +
        '            <div class="Kmodal-user">' +
        '               <div class="Kmodal-row">' +
        '                   <label class="Kmodal-label">会员姓名:</label>' +
        '                   <div class="Kmodal-value J_userName"></div>' +
        '                   <label class="Kmodal-label">手机号码:</label>' +
        '                   <div class="Kmodal-value J_phone"></div>' +
        '               </div>' +
        '               <div class="Kmodal-row">' +
        '                   <label class="Kmodal-label">小票金额:</label>' +
        '                   <div class="Kmodal-value J_amount"></div>' +
        '                   <label class="Kmodal-label">会员卡号:</label>' +
        '                   <div class="Kmodal-value J_userNo"></div>' +
        '               </div>' +
        '            </div>' +
        '            <div class="Kmodal-info">' +
        '                <span class="Kmodal-info-text J_main"></span><span class="Kmodal-red J_second"></span>' +
        '            </div>' +
        '        </div>' +
        '        <div class="Kmodal-foot">' +
        '            <div class="Kmodal-btn Kmodal-query J_query">查询</div>' +
        '            <div class="Kmodal-btn J_fire">抽奖</div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    Kmodal.prototype = {
        dom: null,
        /* 弹出 */
        show: function () {
            this.dom.css('display', '');
            var that = this;
            setTimeout(function () {
                that.dom.find('.Kmodal-box').addClass('Kmodal-show');
                that.dom.find('.Kmodal-mask').addClass('active');
            }, 50);
        },
        /* 关闭 */
        close: function () {
            var that = this;
            that.dom.find('.Kmodal-box').removeClass('Kmodal-show');
            that.dom.find('.Kmodal-mask').removeClass('active');
            setTimeout(function () {
                that.dom.css('display', 'none');
            }, 400);
            _fn.reset.apply(this);
        },
        /*设置值*/
        setMsg: function (message) {
            this.canFire = message.canFire;
            if (!this.canFire) {
                this.dom.find('.J_fire').data('working', 'true');
                this.dom.find('.J_fire').removeClass('Kmodal-fire');
            } else {
                this.dom.find('.J_fire').data('working', 'false');
                this.dom.find('.J_fire').addClass('Kmodal-fire');
            }
            var nameArr = ['userName', 'phone', 'amount', 'userNo'];
            for (var i = 0; i < nameArr.length; i++) {
                this.dom.find($('.J_' + nameArr[i]).html(message.userData[nameArr[i]] || ''));
            }
            var errorArr = ['main', 'second'];
            this.dom.find($('.J_' + errorArr[0]).html(message.error[errorArr[0]] || ''));
            this.dom.find($('.J_' + errorArr[1]).html(message.error[errorArr[1]] || ''));
        }
    };

    var _fn = {
        init: function (opt, id) {
            this.dom = $(modalDom).clone();
            this.dom.attr('data-Kmodal', id);
            _fn.options.apply(this, [opt]);
            _fn.loadDom.apply(this);
            _fn.setIndex.apply(this);

        },
        options: function (opt) {
            this.options = {
                queryEvt: opt.queryEvt || null,
                fireEvt: opt.fireEvt || null
            }
        },
        /*load DOM*/
        loadDom: function () {
            this.dom.appendTo($('body'));
            _fn.bind.apply(this);
        },
        /*方法绑定*/
        bind: function () {
            var that = this;
            this.dom.find('.J_query').on('click', function (e) {
                _fn.query.apply(that, [$(e.target)]);
            });
            this.dom.find('.J_cancel').on('click', function () {
                that.close();
            });
            this.dom.find('.J_fire').on('click', function () {
                _fn.fire.apply(that);
            });
        },
        /* 动态设置Z-index */
        setIndex: function () {
            var divs = window.document.getElementsByTagName('*');
            var max = 0;
            for (var i = 0; i < divs.length; i++) {
                if (/^\d+$/.test(window.getComputedStyle(divs[i])['z-index'])) {
                    max = Math.max(max, window.getComputedStyle(divs[i])['z-index'] || 0);
                }
            }
            this.dom.css('zIndex', max + 1);
        },
        /* 重置数据 */
        reset: function () {
            var nameArr = ['userName', 'phone', 'amount', 'userNo', 'main', 'second'];
            for (var i = 0; i < nameArr.length; i++) {
                this.dom.find($('.J_' + nameArr[i]).html(''));
            }
            this.dom.find('.J_fire').data('working', 'true');
            this.dom.find('.J_fire').removeClass('Kmodal-fire');
            this.dom.find('.J_reg').html('');
        },
        /* 查询 */
        query: function (Jdom) {
            if ($(Jdom).data('working') == 'true') {
                return false
            }
            $(Jdom).data('working', 'true');
            var input = this.dom.find('.J_input');
            Jdom.html('查询中...');
            _fn.reset.call(this);
            if (this.options.queryEvt) {
                this.options.queryEvt(input.val());
                setTimeout(function () {
                    $(Jdom).data('working', 'false');
                    Jdom.html('查询');
                }, 3000)
            } else {
                console.warn('queryEvt 未定义');
            }
        },
        /* 抽奖 */
        fire: function () {
            if (!this.canFire) {
                return false
            }
            if (this.options.fireEvt) {
                this.options.fireEvt();
            } else {
                console.warn('fireEvt 未定义');
            }
            //this.close();
        },
        loadCss: function () {
            var styleBox = document.createElement('style');
            styleBox.innerHTML = styleT;
            document.getElementsByTagName('head')[0].appendChild(styleBox);
        }
    };
    _fn.loadCss();
    window.Kmodal = Kmodal;
})();