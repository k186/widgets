/**
 * Created by K186 on 2017/6/27.
 *
 * 基于bootstrap 模态框二次封装
 *
 * id 必传 配置部分项必传
 *
 * 主要方法 show hide
 *
 */
(function () {
    var OPTION = {
        width: null,
        title: '标题',
        ok: '确认',
        cancel: '取消',
        body: '',
        clickEvt: null
    };
    var styleT = ".Kalert{padding:0 30px}.Kalert-title{text-align:center;font-size:1pc;font-weight:700;margin:10px}.Kalert-info{margin:10px 0}.Kalert-red{color:red}.Kalert-scroll{height:150px;overflow-y:auto;border:1px solid #d8d8d8;border-radius:4px;padding:10px}.Kalert-scroll>ul{list-style:none;padding:0;margin:0;font-size:13px}.Kalert-scroll>ul>li{line-height:1.5;vertical-align:middle;margin-left:20px;position:relative}.Kalert-scroll>ul>li:before{display:inline-block;content:'';height:8px;width:8px;border-radius:50%;background:#48a7f2;position:absolute;left:-15px;top:5px}";
    var mytpl = '<div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">' +
        '        <div class="modal-dialog J_width">' +
        '            <div class="modal-content">' +
        '                <div class="modal-header" style="height: 40px;background: white;">' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin: 3px 10px;color:#6b6b6b"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAQVJREFUOBGtkwsKwjAMhtdOPZYgCh5DJsoeB9oDFdk9RMFjKdvMr+vourQyMVCaNfm/pVkmsixbSykfYRjevB+sKIpFXdczSdonrXOapquxnFZzBkPGcXytqmpHVR3GwJALDbRgCFWFClCZ+yRJLuqc27ncDgQBl2CCbDk90DeYDQLdAGSDuSBWkA4jf4NnstLVP7aij87z8jyfA9A+b6IouquYuWOO/mJWEHpCb0A1uBpW2Z6ROzQWpDcW18FCf1xDO+iRDjEH0xXrgVyJ6jK2nA5kS1AAfedy3yAuoAs539QImpWlEOKEv9jsCQfQzwDzff9IH2Irm6aZUDAYCwGw1QTkTl+Nbdsq+36o9QAAAABJRU5ErkJggg==" alt=""/></button>' +
        '                    <h4 class="modal-title J_title" style="color: #47a7f3;height: 40px;line-height: 40px;font-size: 14px"></h4>' +
        '                </div>' +
        '                <div class="modal-body">' +
        '                   <div style="text-align: center"> ' +
        '                     <img src="data:image/png;base64,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" alt=""/> ' +
        '                   </div>' +
        '                   <div class="J_body"></div>' +
        '                </div>' +
        '                <div class="modal-footer" style="text-align: center">' +
        '                    <button type="button" class="btn btn-lg btn-info J_ok" ></button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>';

    function kBootModal(id, opt) {
        this.id = id;
        var dom = $(mytpl).clone();
        dom.attr('id', id);
        this.dom = dom;
        this.options = _fn.options.apply(this, [opt]);
        _fn.init.apply(this);
    }

    kBootModal.prototype = {
        show: function () {
            $('#' + this.id).modal('show');
        },
        hide: function () {
            $('#' + this.id).modal('hide');
        }
    };
    var _fn = {
        init: function () {
            this.dom.appendTo($('body'));
            _fn.bind.apply(this);
        },
        options: function (opt) {
            if (!opt) {
                opt = {}
            }
            var Options = {};
            for (var i = 0; i < Object.keys(OPTION).length; i++) {
                if (opt[Object.keys(OPTION)[i]]) {
                    Options[Object.keys(OPTION)[i]] = opt[Object.keys(OPTION)[i]];
                } else {
                    Options[Object.keys(OPTION)[i]] = OPTION[Object.keys(OPTION)[i]];
                }
            }
            return Options;
        },
        bind: function () {
            var arrName = ['title', 'body', 'ok'];
            for (var i = 0; i < arrName.length; i++) {
                this.dom.find('.J_' + arrName[i]).html(this.options[arrName[i]]);
            }
            if (this.options.width) {
                this.dom.find('.J_width').css('width', this.options['width'] + 'px');
            }
            var that = this;
            this.dom.find('.J_ok').on('click', function () {
                if (that.options.clickEvt && typeof  that.options.clickEvt == 'function') {
                    that.options.clickEvt();
                }
                that.hide();
            });
        },
        loadCss: function () {
            var styleBox = document.createElement('style');
            styleBox.innerHTML =styleT;
            document.getElementsByTagName('head')[0].appendChild(styleBox);
        }
    };
    _fn.loadCss();
    window.kBootModal = kBootModal;
})();