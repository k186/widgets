!function(){function o(o,a){this.id=o,this.options=a,this.canFire=!1,i.init.apply(this,[a,o])}o.prototype={dom:null,show:function(){this.dom.css("display","");var o=this;setTimeout(function(){o.dom.find(".Kmodal-box").addClass("Kmodal-show"),o.dom.find(".Kmodal-mask").addClass("active")},50)},close:function(){var o=this;o.dom.find(".Kmodal-box").removeClass("Kmodal-show"),o.dom.find(".Kmodal-mask").removeClass("active"),setTimeout(function(){o.dom.css("display","none")},400),i.reset.apply(this)},setMsg:function(o){this.canFire=o.canFire,this.canFire?(this.dom.find(".J_fire").data("working","false"),this.dom.find(".J_fire").addClass("Kmodal-fire")):(this.dom.find(".J_fire").data("working","true"),this.dom.find(".J_fire").removeClass("Kmodal-fire"));for(var i=["userName","phone","amount","userNo"],a=0;a<i.length;a++)this.dom.find($(".J_"+i[a]).html(o.userData[i[a]]||""));var e=["main","second"];this.dom.find($(".J_"+e[0]).html(o.error[e[0]]||"")),this.dom.find($(".J_"+e[1]).html(o.error[e[1]]||""))}};var i={init:function(o,a){this.dom=$('<div class="Kmodal" style="display: none;">    <div class="Kmodal-mask J_mask"></div>    <div class="Kmodal-box">        <div class="Kmodal-head">            <div class="Kmodal-title">抽奖资格验证</div>            <div class="Kmodal-cancel J_cancel"></div>        </div>        <div class="Kmodal-body">            <input class="Kmodal-input J_input" type="text" placeholder="请输入购物小票"/>            <div class="Kmodal-user">               <div class="Kmodal-row">                   <label class="Kmodal-label">会员姓名:</label>                   <div class="Kmodal-value J_userName"></div>                   <label class="Kmodal-label">手机号码:</label>                   <div class="Kmodal-value J_phone"></div>               </div>               <div class="Kmodal-row">                   <label class="Kmodal-label">小票金额:</label>                   <div class="Kmodal-value J_amount"></div>                   <label class="Kmodal-label">会员卡号:</label>                   <div class="Kmodal-value J_userNo"></div>               </div>            </div>            <div class="Kmodal-info">                <span class="Kmodal-info-text J_main"></span><span class="Kmodal-red J_second"></span>            </div>        </div>        <div class="Kmodal-foot">            <div class="Kmodal-btn Kmodal-query J_query">查询</div>            <div class="Kmodal-btn J_fire">抽奖</div>        </div>    </div></div>').clone(),this.dom.attr("data-Kmodal",a),i.options.apply(this,[o]),i.loadDom.apply(this),i.setIndex.apply(this)},options:function(o){this.options={queryEvt:o.queryEvt||null,fireEvt:o.fireEvt||null}},loadDom:function(){this.dom.appendTo($("body")),i.bind.apply(this)},bind:function(){var o=this;this.dom.find(".J_query").on("click",function(a){i.query.apply(o,[$(a.target)])}),this.dom.find(".J_cancel").on("click",function(){o.close()}),this.dom.find(".J_fire").on("click",function(){i.fire.apply(o)})},setIndex:function(){for(var o=window.document.getElementsByTagName("*"),i=0,a=0;a<o.length;a++)/^\d+$/.test(window.getComputedStyle(o[a])["z-index"])&&(i=Math.max(i,window.getComputedStyle(o[a])["z-index"]||0));this.dom.css("zIndex",i+1)},reset:function(){for(var o=["userName","phone","amount","userNo","main","second"],i=0;i<o.length;i++)this.dom.find($(".J_"+o[i]).html(""));this.dom.find(".J_fire").data("working","true"),this.dom.find(".J_fire").removeClass("Kmodal-fire"),this.dom.find(".J_reg").html("")},query:function(o){if("true"==$(o).data("working"))return!1;$(o).data("working","true");var a=this.dom.find(".J_input");o.html("查询中..."),i.reset.call(this),this.options.queryEvt?(this.options.queryEvt(a.val()),setTimeout(function(){$(o).data("working","false"),o.html("查询")},3e3)):console.warn("queryEvt 未定义")},fire:function(){if(!this.canFire)return!1;this.options.fireEvt?this.options.fireEvt():console.warn("fireEvt 未定义")},loadCss:function(){var o=document.createElement("style");o.innerHTML='@charset "UTF-8";.Kmodal{font-family:"PingFangSC-Semibold","PingFang SC Semibold","PingFang SC","微软雅黑";color:#666;}.Kmodal{position:absolute;top:0;right:0;bottom:0;left:0;}.Kmodal-mask{background:rgba(0,0,0,0.3);transition:all .3s ease-in-out;opacity:0;}.Kmodal-mask{position:absolute;top:0;right:0;bottom:0;left:0;}.Kmodal-mask.active{opacity:1;}.Kmodal-box{transition:all .3s ease-in-out;transform:translate(-50%,-60%);opacity:0;position:relative;display:inline-block;overflow:hidden;border-radius:4px;top:50%;right:50%;bottom:50%;left:50%;background:white;width:500px;padding:25px 25px 10px 25px;}.Kmodal-show{transform:translate(-50%,-50%);opacity:1;}.Kmodal-head{padding:5px;}.Kmodal-title{font-size:18px;text-align:center;}.Kmodal-cancel{position:absolute;right:10px;top:10px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAQVJREFUOBGtkwsKwjAMhtdOPZYgCh5DJsoeB9oDFdk9RMFjKdvMr+vourQyMVCaNfm/pVkmsixbSykfYRjevB+sKIpFXdczSdonrXOapquxnFZzBkPGcXytqmpHVR3GwJALDbRgCFWFClCZ+yRJLuqc27ncDgQBl2CCbDk90DeYDQLdAGSDuSBWkA4jf4NnstLVP7aij87z8jyfA9A+b6IouquYuWOO/mJWEHpCb0A1uBpW2Z6ROzQWpDcW18FCf1xDO+iRDjEH0xXrgVyJ6jK2nA5kS1AAfedy3yAuoAs539QImpWlEOKEv9jsCQfQzwDzff9IH2Irm6aZUDAYCwGw1QTkTl+Nbdsq+36o9QAAAABJRU5ErkJggg==");background-repeat:no-repeat;background-position:center;width:13px;height:13px;cursor:pointer;}.Kmodal-input{width:100%;height:34px;border:1px solid #d9d9d9;border-radius:3px;text-indent:10px;padding:10px 0;margin:20px 0;}.Kmodal-user{display:flex;flex-direction:column;border:1px dashed #e1e1e1;padding:10px;border-radius:5px;color:#999;font-size:14px;font-weight:400;}.Kmodal-row{display:flex;justify-content:space-around;}.Kmodal-label{white-space:nowrap;padding:10px;}.Kmodal-value{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:10px;width:100%;cursor:pointer;}.Kmodal-info{padding:20px 0;font-size:34px;text-align:center;}.Kmodal-red{color:red;}.Kmodal-foot{display:flex;justify-content:center;}.Kmodal-btn{padding:5px;width:90px;text-align:center;color:white;background:#a7a7a7;border-radius:5px;margin:0 10px;font-size:14px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.Kmodal-query{background:#00aaee;}.Kmodal-fire{background:red;}',document.getElementsByTagName("head")[0].appendChild(o)}};i.loadCss(),window.Kmodal=o}();