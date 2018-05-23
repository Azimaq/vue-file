(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ../css/index.css */ "./src/css/index.css");

__webpack_require__(/*! ./libjquery_weui */ "./src/js/libjquery_weui.js");

var _vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");

var _vue2 = _interopRequireDefault(_vue);

var _pic = __webpack_require__(/*! ../vue/pic.vue */ "./src/vue/pic.vue");

var _pic2 = _interopRequireDefault(_pic);

var _btn = __webpack_require__(/*! ../vue/btn.vue */ "./src/vue/btn.vue");

var _btn2 = _interopRequireDefault(_btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
    el: '.page__pd',
    data: {
        imgs: [
        //pic 展示的照片url    smPic压缩后的url   （base64）
        { name: 'img1', pic: '', title: '第一张照', smPic: '' }, { name: 'img2', pic: '', title: '第二张照', smPic: '' }, { name: 'img3', pic: '', title: '第三张照', smPic: '' }],
        btn: {
            show: 'weui-btn_disabled'
        }
    },
    template: '<div class="page__pd">' + '<div class="place"></div>' + '<div class="weui-cells weui-cells_form">' + '<div class="weui-cell">' + '<sm_pic :imgs="imgs" @pushImg="pushImg"></sm_pic>' + '</div></div>' + '<sm_btn :btn="btn" @send="send"></sm_btn>' + '</div>',
    components: {
        sm_pic: _pic2.default,
        sm_btn: _btn2.default
    },
    watch: {
        imgs: {
            handler: function handler(val) {
                this.checkTable();
            },
            deep: true
        }
    },
    methods: {
        checkTable: function checkTable() {
            if (this.imgs[0].pic && this.imgs[1].pic && this.imgs[2].pic) {
                if (this.btn.show !== '') this.btn.show = '';
            } else {
                this.btn.show = 'weui-btn_disabled';
            }
        },
        alert: function alert(title, fun) {
            fun = fun || '';
            $.alert({
                title: '',
                text: title,
                onOK: fun
            });
        },
        clearTable: function clearTable() {
            for (var i = 0; i < this.imgs.length; i++) {
                this.imgs[i].pic = '';
            }
        },

        //显示照片的精髓
        pushImg: function pushImg(e, i) {
            var self = this;
            var imgs = this.imgs,
                file = e.target,
                reader = new FileReader();
            reader.readAsDataURL(file.files[0]);
            reader.onload = function () {
                imgs[i].pic = this.result; // 把得到的img base64给界面显示
                //往下是压碎图片质量为0.5  smPic为压缩以后的base64
                var image = new Image();
                image.src = imgs[i].pic;
                image.onload = function () {
                    var width = image.width,
                        height = image.height;
                    var img64 = self.compress(image, width, height);
                    imgs[i].smPic = img64;
                };
            };
        },
        compress: function compress(img, width, height) {
            var canvas = void 0,
                ctx = void 0,
                img64 = void 0;
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            img64 = canvas.toDataURL("image/jpeg", 0.5);
            return img64; // 压缩后的base64串
        },
        send: function send() {
            $.showLoading();
            var self = this;
            $.ajax({
                url: '../php/indexs.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    "pic1": this.imgs[0].smPic,
                    "pic2": this.imgs[1].smPic,
                    "pic3": this.imgs[2].smPic
                },
                success: function success(data) {
                    $.hideLoading();
                    if (data.errno == 0) {
                        var msg = '上传成功';
                        self.alert(msg, this.clearTable);
                    } else if (data.errno == 1) {
                        self.alert(data.error);
                    }
                }
            });
        }
    }
});

/***/ }),

/***/ "./src/js/libjquery_weui.js":
/*!**********************************!*\
  !*** ./src/js/libjquery_weui.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! jquery-weui/dist/lib/zepto */ "./node_modules/jquery-weui/dist/lib/zepto.js");

__webpack_require__(/*! jquery-weui/dist/lib/jquery-2.1.4 */ "./node_modules/jquery-weui/dist/lib/jquery-2.1.4.js");

__webpack_require__(/*! jquery-weui/dist/js/jquery-weui */ "./node_modules/jquery-weui/dist/js/jquery-weui.js");

__webpack_require__(/*! jquery-weui/dist/lib/weui.css */ "./node_modules/jquery-weui/dist/lib/weui.css");

__webpack_require__(/*! jquery-weui/dist/css/jquery-weui.css */ "./node_modules/jquery-weui/dist/css/jquery-weui.css");

// import 'jquery-weui/dist/js/city-picker';

// 移动端 点击延迟
// const FastClick = require('fastclick');
var FastClick = __webpack_require__(/*! jquery-weui/dist/lib/fastclick */ "./node_modules/jquery-weui/dist/lib/fastclick.js");
FastClick.attach(document.body);

/***/ })

},[["./src/js/index.js","manifest","fastclick","vue","jquery_weui","modules","es_vue"]]]);
//# sourceMappingURL=index.js.map