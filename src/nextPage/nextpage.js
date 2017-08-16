(function (factory) {
    if (typeof define === 'function' && define.amd)
        define(['jQuery'], factory);
    else if (typeof exports === 'object')
        factory(require('jQuery'));
    else
        factory(jQuery);
})(function ($) {
    var template, _fn,
        OPTION = {
            pageSize: 30, //每页大小,
            currentPage: 1, //当前页
            totalCount: 0, //总条数
            callback: null, //点击回调
            container: null, //插入id
            pageRange: 9,    //间隔多少个
            select: [30, 60, 100], //下拉选项
            position: null //位置
        }
    ;
    var styleBox = document.createElement('style');
    styleBox.innerHTML = '.nextpage{font-size:13px;height:40px;display:flex;flex-wrap:nowrap;justify-content:flex-end;align-items:center}.nextpage *{box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.nextpage.right{justify-content:flex-start}.nextpage.center{justify-content:center}.nextpage .nextpage-page{display:flex;flex-wrap:nowrap;align-items:center;margin:0 10px}.nextpage .nextpage-page:hover{cursor:pointer}.nextpage .nextpage-page .nextpage-btn{color:#666}.nextpage .nextpage-page .nextpage-btn:hover{text-decoration:none}.nextpage .nextpage-page .nextpage-btn.disabled{color:#ccc}.nextpage .nextpage-page .nextpage-btn.disabled:hover{cursor:not-allowed}.nextpage .nextpage-page .nextpage-pagelist{margin:0 10px;display:flex;flex-wrap:nowrap;list-style:none}.nextpage .nextpage-page .nextpage-pagelist>li{margin:0 5px;font-size:13px;font-weight:lighter;color:#666}.nextpage .nextpage-page .nextpage-pagelist>li:hover{color:rgba(96,93,212,.8)}.nextpage .nextpage-page .nextpage-pagelist>li.active{color:#605DD4}.nextpage .nextpage-control{display:flex;flex-wrap:nowrap;align-items:center}.nextpage .nextpage-control .nextpage-input{margin:0 10px;padding:5px;border-radius:4px;border:2px solid #f5f5f5;height:24px;width:60px;font-size:13px}.nextpage .nextpage-control .nextpage-select{position:relative;width:60px;height:24px;margin-right:30px}.nextpage .nextpage-control .nextpage-select-input{width:60px;height:24px;line-height:22px;padding:0 10px;position:absolute;border:2px solid #f5f5f5;border-radius:4px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAALFJREFUSA1jYBgFoyEwGgLDPARu3bo199GjR1LYvHn37l01oPxWbHLIYkzIHHT2////k75//37r9u3b9S9evOAGyQPZfECDu//8+XMFKO+Frgedz4gugMwHGnQMaIglVOwZExPTAiA/GYjFQWKMjIzH1dTUrJD1oLPxWgBSDHRxKNDADiBWgmkGGnwPiCtUVVVXw8QoooGGswEtKgT66A6QLgLxKTJwVPNoCIyGAHVDAAAMAFEdDMtzWQAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position-x:right;background-position-y:center}.nextpage .nextpage-control .nextpage-select-input:hover{cursor:pointer}.nextpage .nextpage-control .nextpage-select-input.active{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAKFJREFUSEtjGAWjYBQMIvD//3+227dvF966desOiAbxoVJ4ASOUxguABoYCDewAYiWoEAMjI+M9IK5QVVVdDRXCCghaAHTxMaDBliA20MCXQDz3379/CUCuFFTsuJqamhWIjQ0wQWmcAGr4b6BBPUCsBnRxNT8/vxoTE1MDUPwrzHKyAdAHW+/evasG5aKAR48eSQHl50K5o2AUjIJhChgYAJk8PzvIh+lJAAAAAElFTkSuQmCC)}.nextpage .nextpage-control .nextpage-select-chosen{margin:0;display:none;position:absolute;font-size:13px;width:80px;background:#fff;border:2px solid #f5f5f5;border-radius:4px;box-shadow:0 5px 30px rgba(0,0,0,.05);padding:3px}.nextpage .nextpage-control .nextpage-select-chosen.active{display:block}.nextpage .nextpage-control .nextpage-select-chosen.top{bottom:34px;top:auto}.nextpage .nextpage-control .nextpage-select-chosen.bottom{top:34px;bottom:auto}.nextpage .nextpage-control .nextpage-select-chosen>li{color:#999;height:28px;line-height:28px;padding:0 10px;border-radius:4px;margin:2px 0}.nextpage .nextpage-control .nextpage-select-chosen>li:hover{background:#f5f5f5;cursor:pointer}.nextpage .nextpage-control .nextpage-select-chosen>li.active{background:#f5f5f5}';
    document.getElementsByTagName('head')[0].appendChild(styleBox);
    $.fn.NextPage = function (option) {
        var id = this.prop('id');
        return new NextPage(id, option);
    };

    function NextPage(id, option) {
        this.opt = null;
        this.id = id;
        this.spin = {
            head: 1,
            end: 9
        };
        this.init(option);
    }

    NextPage.prototype = {
        init: function (option) {
            if (!this.id) {
                console.warn('请设置分页id');
                return
            }
            if (typeof option.callback !== 'function') {
                console.warn('分页配置callback 不是一个方法');
                return
            }
            var container = $('#' + this.id);
            var DOM = $(template).clone();
            this.opt = {
                pageSize: option.pageSize ? option.pageSize : OPTION.pageSize,
                currentPage: option.currentPage ? option.currentPage : OPTION.currentPage,
                totalCount: option.totalCount ? option.totalCount : OPTION.totalCount,
                callback: option.callback ? option.callback : OPTION.callback,
                select: option.select ? option.select : OPTION.select,
                pageRange: option.pageRange ? option.pageRange : OPTION.pageRange,
                position: option.position ? option.position : OPTION.position

            };
            container.html('');
            if (this.opt.position) {
                DOM.addClass(this.opt.position)
            }
            container.append(DOM);
            _fn.formatOptions.apply(this);
            _fn.updateSpin.apply(this);
            _fn.render.apply(this);
            _fn.bind.apply(this);
        },
        update: function (option) {
            for (k in option) {
                this.opt[k] = option[k];
            }
            _fn.formatOptions.apply(this);
            _fn.updateSpin.apply(this);
            _fn.render.apply(this);
        },
        next: function (e) {
            if ($(e.target).hasClass('disabled')) {
                return
            }
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            if (this.opt.currentPage + 1 > totalPage) {
                this.opt.currentPage = totalPage;
            } else {
                this.opt.currentPage += 1;
            }
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
        },
        prev: function (e) {
            if ($(e.target).hasClass('disabled')) {
                return
            }
            if (this.opt.currentPage - 1 < 1) {
                this.opt.currentPage = 1;
            } else {
                this.opt.currentPage -= 1;
            }
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
        }
    };
    _fn = {
        bind: function () {
            var container = $('#' + this.id);
            var pageContainer = container.find('.nextpage-pagelist');
            var input = container.find('.nextpage-input');
            var prev = container.find('.prev');
            var next = container.find('.next');
            var select = container.find('.nextpage-select-input');
            var chosen = container.find('.nextpage-select-chosen');
            var that = this;
            pageContainer.on('click', function (e) {
                e.stopPropagation();
                _fn.checkPage.apply(that, [e])
            });
            prev.on('click', function (e) {
                e.stopPropagation();
                that.prev(e)
            });
            next.on('click', function (e) {
                e.stopPropagation();
                that.next(e);
            });
            input.on('click', function (e) {
                e.stopPropagation();
            });
            input.on('keyup', function (e) {
                _fn.setCurrentPage.apply(that, [e])
            });
            select.on('click', function (e) {
                e.stopPropagation();
                _fn.showSelect.apply(that, [e]);
            });
            chosen.on('click', function (e) {
                e.stopPropagation();
                _fn.chosenCheck.apply(that, [e]);
            });
            $('body').on('click', function (e) {
                e.stopPropagation();
                _fn.hideSelect.apply(that, [e]);
            });
        },
        render: function (isCallback) {
            var container = $('#' + this.id);
            var pageContainer = container.find('.nextpage-pagelist');
            var select = container.find('.nextpage-select-input');
            var input = container.find('.nextpage-input');
            var prev = container.find('.prev');
            var next = container.find('.next');
            var chosen = container.find('.nextpage-select-chosen');
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            var pages = '';
            var chosens = '';
            var i = 1;
            for (i = this.spin.head; i < this.spin.end + 1; i++) {
                if (this.opt.currentPage === i) {
                    pages += '<li class="active" data-page="' + i + '">' + i + '</li>';
                } else {
                    pages += '<li data-page="' + i + '">' + i + '</li>';
                }
            }
            if (this.opt.currentPage < this.opt.pageRange) {
                pages += '<li>...</li>';
                pages += '<li data-page="' + totalPage + '">' + totalPage + '</li>';
                pageContainer.html('');
                pageContainer.html(pages);
            } else {
                if (this.spin.end < totalPage) {
                    pages = '<li data-page="1">1</li></li><li data-page="' + i + '">...</li>' + pages;
                    pages += '<li>...</li>';
                    pages += '<li data-page="' + totalPage + '">' + totalPage + '</li>';
                    pageContainer.html('');
                    pageContainer.html(pages);
                } else {
                    pages = '<li data-page="1">1</li></li><li>...</li>' + pages;
                    pageContainer.html('');
                    pageContainer.html(pages)
                }
            }

            for (i = 0; i < this.opt.select.length; i++) {
                if (this.opt.pageSize === this.opt.select[i]) {
                    chosens += '<li class="active" data-size="' + this.opt.select[i] + '">' + this.opt.select[i] + '</li>';
                } else {
                    chosens += '<li data-size="' + this.opt.select[i] + '">' + this.opt.select[i] + '</li>';
                }

            }
            input.val(this.opt.currentPage);
            select.html(this.opt.pageSize);
            chosen.html(chosens);
            prev.removeClass('disabled');
            next.removeClass('disabled');
            if (this.opt.currentPage === 1) {
                prev.addClass('disabled')
            }
            if (this.opt.currentPage === totalPage) {
                next.addClass('disabled')
            }
            if (isCallback) {
                this.opt.callback(JSON.parse(JSON.stringify(this.opt)));
            }
        },
        checkPage: function (e) {
            var li = $(e.target);
            var value = li.attr('data-page');
            if (!value) {
                return
            }
            value = Number(value);
            if (isNaN(value)) {
                value = 1
            }
            if (this.opt.currentPage === value) {
                return
            }
            this.opt.currentPage = value;
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
        },
        updateSpin: function () {
            var totalPage = Math.ceil(this.opt.totalCount / this.opt.pageSize);
            if (this.opt.currentPage > this.opt.pageRange - 1) {
                this.spin.head = this.opt.currentPage - 4;
                this.spin.end = this.opt.currentPage + 4;
                if (this.spin.end > totalPage) {
                    this.spin.end = totalPage;
                    this.spin.head = this.spin.end - 8;
                }
            } else {
                this.spin.head = 1;
                this.spin.end = 9
            }
        },
        setCurrentPage: function (e) {
            var input = $(e.target);
            var value = input.val();
            if (!value) {
                return
            }
            value = Number(value);
            if (isNaN(value)) {
                value = 1
            }
            if (e.keyCode === 13) {
                this.opt.currentPage = value;
                _fn.updateSpin.apply(this);
                _fn.render.apply(this, [true]);
            }
        },
        showSelect: function (e) {
            var container = $('#' + this.id);
            var select = container.find('.nextpage-select-input');
            var chosen = container.find('.nextpage-select-chosen');
            var top = select.offset().top;
            var height = $(document).height();
            var border = height - top;
            chosen.removeClass('top bottom');
            if (border > 150) {
                chosen.addClass('bottom active')
            } else {
                chosen.addClass('top active')
            }
        },
        hideSelect: function (e) {
            var container = $('#' + this.id);
            var chosen = container.find('.nextpage-select-chosen');
            chosen.removeClass('active');
        },
        chosenCheck: function (e) {
            var li = $(e.target);
            var value = li.attr('data-size');
            if (!value) {
                return
            }
            value = Number(value);
            if (isNaN(value)) {
                value = this.opt.select[0];
            }
            if (this.opt.pageSize === value) {
                return
            }
            this.opt.pageSize = value;
            this.opt.currentPage = 1;
            _fn.updateSpin.apply(this);
            _fn.render.apply(this, [true]);
            _fn.hideSelect.apply(this);
        },
        formatOptions: function () {
            this.opt.pageSize = isNaN(Number(this.opt.pageSize)) ? OPTION.pageSize : Number(this.opt.pageSize);
            this.opt.currentPage = isNaN(Number(this.opt.currentPage)) ? OPTION.currentPage : Number(this.opt.currentPage);
            this.opt.totalCount = isNaN(Number(this.opt.totalCount)) ? OPTION.totalCount : Number(this.opt.totalCount);
            this.opt.pageRange = isNaN(Number(this.opt.pageRange)) ? OPTION.pageRange : Number(this.opt.pageRange);
            var that = this;
            $.each(this.opt.select, function (index, el) {
                if (isNaN(Number(el))) {
                    that.opt.select[index] = OPTION.select[index];
                } else {
                    that.opt.select[index] = Number(el)
                }
            })
        }
    };

    template='<div class="nextpage">'+
        '    <div class="nextpage-page">'+
        '        <a class="nextpage-btn prev">上一页</a>'+
        '        <ul class="nextpage-pagelist">'+
        '        </ul>'+
        '        <a class="nextpage-btn next">下一页</a>'+
        '    </div>'+
        '   <div class="nextpage-control">'+
        '       <input type="text" class="nextpage-input"/>'+
        '       <div class="nextpage-select">'+
        '           <div class="nextpage-select-input">100</div>'+
        '           <ul class="nextpage-select-chosen">'+
        '               <li>30</li>'+
        '               <li class="active">60</li>'+
        '               <li>100</li>'+
        '           </ul>'+
        '       </div>'+
        '   </div>'+
        '</div>';
});