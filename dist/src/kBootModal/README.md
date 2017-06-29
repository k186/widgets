###基于bootscript 弹窗

####注意
```text
使用前先引用rtl的bootstrap.css 和js 
接着在直接引入kBootModal.js
```

####用法
```javascript
var modal = new KbootModal(id,{
     width: null,//手动设置宽度
     title: '标题',//手动设置标题 必填
     ok: '确认',//手动设置按钮文字 
     cancel: '取消',
     body: '',//设置body 内容接受html字符串
     clickEvt: null// 点击回调
})
//以上值均为默认值
```

####主要方法
```javascript
modal.show();
modal.hide();
```