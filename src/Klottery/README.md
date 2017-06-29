###抽奖活动

####注意
```text
使用前先引用jquery 
接着在直接引入Klottery.js
配合KlotteryModal.js 使用
```

####用法
```javascript
var lottery = new Klottery(id, {
        BoxWidth: 50,//单张图片宽度
        BoxHeight: 50,//单张图片高度
        CellCount: 4,//行
        ColumnCount: 5,//列
        margin: 2.5,//间隔
        backgroundUrl: './common/img/100year-',//图片地址 图片名称数字索引以1开始
        imgType: '.png',//图片类型
        color: 'rgba(210, 255, 100, 0.77)',//激活背景色
        callback: function () {//抽奖回调
            lottery.showModal({//展示奖品
                src: './common/img/100year-1.png'//配置获得的中奖项
            });
            //lottery.hideModal();//隐藏奖品弹窗
        }
    });
```

####主要方法
```javascript
lottery.fire();//触发抽奖动画
lottery.showModal(opt);//展示中奖弹框并设置中奖信息
lottery.hideModal();//主动关闭中奖弹窗
```