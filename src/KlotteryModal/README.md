###抽奖活动校验弹窗

####注意
```text
使用前先引用jquery 
接着在直接引入KlotteryModal.js
配合Klottery.js 使用
```

####用法
```javascript
 var modal = new Kmodal(id, {
         /*资格查询*/
         queryEvt: function (val) {
             //异步查询资格接口
             //other code
             modal.setMsg({
                 canFire: true,//能否抽奖
                 userData: {//用户信息
                     userName: '水电工',
                     phone: '32432423',
                     amount: '44',
                     userNo: '432432fgdgfd'
                 },
                 error: { //错误信息
                     main: '543',
                     second: '43543'
                 }
             })
         },
         /*弹窗抽奖按钮事件*/
         fireEvt: function () {
             fire();
         }
     });
```

####主要方法
```javascript
modal.show();//展示弹窗
modal.close();//主动关闭弹窗
modal.setMsg(message);//设置弹窗信息

```