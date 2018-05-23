import '../css/index.css';
import './libjquery_weui';
import Vue from 'vue';
import sm_pic from '../vue/pic.vue';
import sm_btn from '../vue/btn.vue';

new Vue({
    el: '.page__pd',
    data: {
        imgs: [
            //pic 展示的照片url    smPic压缩后的url   （base64）
            {name: 'img1', pic: '', title: '第一张照',smPic:''},
            {name: 'img2', pic: '', title: '第二张照',smPic:''},
            {name: 'img3', pic: '', title: '第三张照',smPic:''}
        ],



        btn: {
            show: 'weui-btn_disabled'
        }
    },
    template:'<div class="page__pd">' +
    '<div class="place"></div>' +
    '<div class="weui-cells weui-cells_form">' +
    '<div class="weui-cell">' +
    '<sm_pic :imgs="imgs" @pushImg="pushImg"></sm_pic>' +
    '</div></div>' +
    '<sm_btn :btn="btn" @send="send"></sm_btn>' +
    '</div>',
    components:{
        sm_pic,
        sm_btn
    },
    watch: {
        imgs: {
            handler: function (val) {
                this.checkTable();
            },
            deep: true
        }
    },
    methods: {
        checkTable(){
            if (this.imgs[0].pic && this.imgs[1].pic && this.imgs[2].pic) {
                if (this.btn.show !== '')
                    this.btn.show = '';
            } else {
                this.btn.show = 'weui-btn_disabled';
            }
        },
        alert(title, fun){
            fun = fun || '';
            $.alert({
                title: '',
                text: title,
                onOK: fun
            });
        },
        clearTable(){
            for (let i = 0; i < this.imgs.length; i++) {
                this.imgs[i].pic = '';
            }
        },
        //显示照片的精髓
        pushImg(e, i){
            let self = this;
            let imgs = this.imgs,
                file = e.target,
                reader = new FileReader();
            reader.readAsDataURL(file.files[0]);
            reader.onload = function () {
                imgs[i].pic = this.result;   // 把得到的img base64给界面显示
                //往下是压碎图片质量为0.5  smPic为压缩以后的base64
                let image = new Image();
                image.src = imgs[i].pic;
                image.onload = function(){
                    let width = image.width,
                        height = image.height;
                    var img64 = self.compress(image,width,height);
                    imgs[i].smPic = img64;
                }
            }
        },
        compress(img,width,height){
            let canvas, ctx, img64;
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            img64 = canvas.toDataURL("image/jpeg", 0.5);
            return img64; // 压缩后的base64串
        },
        send(){
            $.showLoading();
            let self = this;
            $.ajax({
                url: '../php/indexs.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    "pic1": this.imgs[0].smPic,
                    "pic2": this.imgs[1].smPic,
                    "pic3": this.imgs[2].smPic
                },
                success: function (data) {
                    $.hideLoading();
                    if (data.errno == 0) {
                        let msg = '上传成功';
                        self.alert(msg, this.clearTable)
                    } else if (data.errno == 1) {
                        self.alert(data.error)
                    }
                }
            })
        }
    }
});
