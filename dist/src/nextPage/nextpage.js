!function(e){"function"==typeof define&&define.amd?define(["jQuery"],e):e("object"==typeof exports?require("jQuery"):jQuery)}(function(e){function t(e,t){this.opt=null,this.id=e,this.spin={head:1,end:9},this.init(t)}var a,n,i={pageSize:30,currentPage:1,totalCount:0,callback:null,container:null,pageRange:9,select:[30,60,100],position:null},p=document.createElement("style");p.innerHTML=".nextpage{font-size:13px;height:40px;display:flex;flex-wrap:nowrap;justify-content:flex-end;align-items:center}.nextpage *{box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.nextpage.right{justify-content:flex-start}.nextpage.center{justify-content:center}.nextpage .nextpage-page{display:flex;flex-wrap:nowrap;align-items:center;margin:0 10px}.nextpage .nextpage-page:hover{cursor:pointer}.nextpage .nextpage-page .nextpage-btn{color:#666}.nextpage .nextpage-page .nextpage-btn:hover{text-decoration:none}.nextpage .nextpage-page .nextpage-btn.disabled{color:#ccc}.nextpage .nextpage-page .nextpage-btn.disabled:hover{cursor:not-allowed}.nextpage .nextpage-page .nextpage-pagelist{margin:0 10px;display:flex;flex-wrap:nowrap;list-style:none}.nextpage .nextpage-page .nextpage-pagelist>li{margin:0 5px;font-size:13px;font-weight:lighter;color:#666}.nextpage .nextpage-page .nextpage-pagelist>li:hover{color:rgba(96,93,212,.8)}.nextpage .nextpage-page .nextpage-pagelist>li.active{color:#605DD4}.nextpage .nextpage-control{display:flex;flex-wrap:nowrap;align-items:center}.nextpage .nextpage-control .nextpage-input{margin:0 10px;padding:5px;border-radius:4px;border:2px solid #f5f5f5;height:24px;width:60px;font-size:13px}.nextpage .nextpage-control .nextpage-select{position:relative;width:60px;height:24px;margin-right:30px}.nextpage .nextpage-control .nextpage-select-input{width:60px;height:24px;line-height:22px;padding:0 10px;position:absolute;border:2px solid #f5f5f5;border-radius:4px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAALFJREFUSA1jYBgFoyEwGgLDPARu3bo199GjR1LYvHn37l01oPxWbHLIYkzIHHT2////k75//37r9u3b9S9evOAGyQPZfECDu//8+XMFKO+Frgedz4gugMwHGnQMaIglVOwZExPTAiA/GYjFQWKMjIzH1dTUrJD1oLPxWgBSDHRxKNDADiBWgmkGGnwPiCtUVVVXw8QoooGGswEtKgT66A6QLgLxKTJwVPNoCIyGAHVDAAAMAFEdDMtzWQAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position-x:right;background-position-y:center}.nextpage .nextpage-control .nextpage-select-input:hover{cursor:pointer}.nextpage .nextpage-control .nextpage-select-input.active{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAKFJREFUSEtjGAWjYBQMIvD//3+227dvF966desOiAbxoVJ4ASOUxguABoYCDewAYiWoEAMjI+M9IK5QVVVdDRXCCghaAHTxMaDBliA20MCXQDz3379/CUCuFFTsuJqamhWIjQ0wQWmcAGr4b6BBPUCsBnRxNT8/vxoTE1MDUPwrzHKyAdAHW+/evasG5aKAR48eSQHl50K5o2AUjIJhChgYAJk8PzvIh+lJAAAAAElFTkSuQmCC)}.nextpage .nextpage-control .nextpage-select-chosen{margin:0;display:none;position:absolute;font-size:13px;width:80px;background:#fff;border:2px solid #f5f5f5;border-radius:4px;box-shadow:0 5px 30px rgba(0,0,0,.05);padding:3px}.nextpage .nextpage-control .nextpage-select-chosen.active{display:block}.nextpage .nextpage-control .nextpage-select-chosen.top{bottom:34px;top:auto}.nextpage .nextpage-control .nextpage-select-chosen.bottom{top:34px;bottom:auto}.nextpage .nextpage-control .nextpage-select-chosen>li{color:#999;height:28px;line-height:28px;padding:0 10px;border-radius:4px;margin:2px 0}.nextpage .nextpage-control .nextpage-select-chosen>li:hover{background:#f5f5f5;cursor:pointer}.nextpage .nextpage-control .nextpage-select-chosen>li.active{background:#f5f5f5}",document.getElementsByTagName("head")[0].appendChild(p),e.fn.NextPage=function(e){return new t(this.prop("id"),e)},t.prototype={init:function(t){if(this.id)if("function"==typeof t.callback){var p=e("#"+this.id),o=e(a).clone();this.opt={pageSize:t.pageSize?t.pageSize:i.pageSize,currentPage:t.currentPage?t.currentPage:i.currentPage,totalCount:t.totalCount?t.totalCount:i.totalCount,callback:t.callback?t.callback:i.callback,select:t.select?t.select:i.select,pageRange:t.pageRange?t.pageRange:i.pageRange,position:t.position?t.position:i.position},p.html(""),this.opt.position&&o.addClass(this.opt.position),p.append(o),n.formatOptions.apply(this),n.updateSpin.apply(this),n.render.apply(this),n.bind.apply(this)}else console.warn("分页配置callback 不是一个方法");else console.warn("请设置分页id")},update:function(e){for(k in e)this.opt[k]=e[k];n.formatOptions.apply(this),n.updateSpin.apply(this),n.render.apply(this)},next:function(t){if(!e(t.target).hasClass("disabled")){var a=Math.ceil(this.opt.totalCount/this.opt.pageSize);this.opt.currentPage+1>a?this.opt.currentPage=a:this.opt.currentPage+=1,n.updateSpin.apply(this),n.render.apply(this,[!0])}},prev:function(t){e(t.target).hasClass("disabled")||(this.opt.currentPage-1<1?this.opt.currentPage=1:this.opt.currentPage-=1,n.updateSpin.apply(this),n.render.apply(this,[!0]))}},n={bind:function(){var t=e("#"+this.id),a=t.find(".nextpage-pagelist"),i=t.find(".nextpage-input"),p=t.find(".prev"),o=t.find(".next"),s=t.find(".nextpage-select-input"),l=t.find(".nextpage-select-chosen"),g=this;a.on("click",function(e){e.stopPropagation(),n.checkPage.apply(g,[e])}),p.on("click",function(e){e.stopPropagation(),g.prev(e)}),o.on("click",function(e){e.stopPropagation(),g.next(e)}),i.on("click",function(e){e.stopPropagation()}),i.on("keyup",function(e){n.setCurrentPage.apply(g,[e])}),s.on("click",function(e){e.stopPropagation(),n.showSelect.apply(g,[e])}),l.on("click",function(e){e.stopPropagation(),n.chosenCheck.apply(g,[e])}),e("body").on("click",function(e){e.stopPropagation(),n.hideSelect.apply(g,[e])})},render:function(t){var a=e("#"+this.id),n=a.find(".nextpage-pagelist"),i=a.find(".nextpage-select-input"),p=a.find(".nextpage-input"),o=a.find(".prev"),s=a.find(".next"),l=a.find(".nextpage-select-chosen"),g=Math.ceil(this.opt.totalCount/this.opt.pageSize),r="",c="",h=1;for(h=this.spin.head;h<this.spin.end+1;h++)this.opt.currentPage===h?r+='<li class="active" data-page="'+h+'">'+h+"</li>":r+='<li data-page="'+h+'">'+h+"</li>";for(this.opt.currentPage<this.opt.pageRange?(r+="<li>...</li>",r+='<li data-page="'+g+'">'+g+"</li>",n.html(""),n.html(r)):this.spin.end<g?(r='<li data-page="1">1</li></li><li data-page="'+h+'">...</li>'+r,r+="<li>...</li>",r+='<li data-page="'+g+'">'+g+"</li>",n.html(""),n.html(r)):(r='<li data-page="1">1</li></li><li>...</li>'+r,n.html(""),n.html(r)),h=0;h<this.opt.select.length;h++)this.opt.pageSize===this.opt.select[h]?c+='<li class="active" data-size="'+this.opt.select[h]+'">'+this.opt.select[h]+"</li>":c+='<li data-size="'+this.opt.select[h]+'">'+this.opt.select[h]+"</li>";p.val(this.opt.currentPage),i.html(this.opt.pageSize),l.html(c),o.removeClass("disabled"),s.removeClass("disabled"),1===this.opt.currentPage&&o.addClass("disabled"),this.opt.currentPage===g&&s.addClass("disabled"),t&&this.opt.callback(JSON.parse(JSON.stringify(this.opt)))},checkPage:function(t){var a=e(t.target).attr("data-page");a&&(a=Number(a),isNaN(a)&&(a=1),this.opt.currentPage!==a&&(this.opt.currentPage=a,n.updateSpin.apply(this),n.render.apply(this,[!0])))},updateSpin:function(){var e=Math.ceil(this.opt.totalCount/this.opt.pageSize);this.opt.currentPage>this.opt.pageRange-1?(this.spin.head=this.opt.currentPage-4,this.spin.end=this.opt.currentPage+4,this.spin.end>e&&(this.spin.end=e,this.spin.head=this.spin.end-8)):(this.spin.head=1,this.spin.end=9)},setCurrentPage:function(t){var a=e(t.target).val();a&&(a=Number(a),isNaN(a)&&(a=1),13===t.keyCode&&(this.opt.currentPage=a,n.updateSpin.apply(this),n.render.apply(this,[!0])))},showSelect:function(t){var a=e("#"+this.id),n=a.find(".nextpage-select-input"),i=a.find(".nextpage-select-chosen"),p=n.offset().top,o=e(document).height()-p;i.removeClass("top bottom"),o>150?i.addClass("bottom active"):i.addClass("top active")},hideSelect:function(t){e("#"+this.id).find(".nextpage-select-chosen").removeClass("active")},chosenCheck:function(t){var a=e(t.target).attr("data-size");a&&(a=Number(a),isNaN(a)&&(a=this.opt.select[0]),this.opt.pageSize!==a&&(this.opt.pageSize=a,this.opt.currentPage=1,n.updateSpin.apply(this),n.render.apply(this,[!0]),n.hideSelect.apply(this)))},formatOptions:function(){this.opt.pageSize=isNaN(Number(this.opt.pageSize))?i.pageSize:Number(this.opt.pageSize),this.opt.currentPage=isNaN(Number(this.opt.currentPage))?i.currentPage:Number(this.opt.currentPage),this.opt.totalCount=isNaN(Number(this.opt.totalCount))?i.totalCount:Number(this.opt.totalCount),this.opt.pageRange=isNaN(Number(this.opt.pageRange))?i.pageRange:Number(this.opt.pageRange);var t=this;e.each(this.opt.select,function(e,a){isNaN(Number(a))?t.opt.select[e]=i.select[e]:t.opt.select[e]=Number(a)})}},a='<div class="nextpage">    <div class="nextpage-page">        <a class="nextpage-btn prev">上一页</a>        <ul class="nextpage-pagelist">        </ul>        <a class="nextpage-btn next">下一页</a>    </div>   <div class="nextpage-control">       <input type="text" class="nextpage-input"/>       <div class="nextpage-select">           <div class="nextpage-select-input">100</div>           <ul class="nextpage-select-chosen">               <li>30</li>               <li class="active">60</li>               <li>100</li>           </ul>       </div>   </div></div>'});