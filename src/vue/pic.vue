<template>
<div class="weui-cell__bd">
    <div class="weui-uploader" v-for="(val,index) in imgs">
        <div class="weui-uploader__hd">
            <p class="weui-uploader__title">{{val.title}}</p>
        </div>
        <div class="weui-uploader__bd">
            <div class="weui-uploader__input-box">
                <img class="cord_img" :src="val.pic">
                <input :id="val.name" class="weui-uploader__input" type="file" accept="image/*" multiple="" @change="pushImg($event,index)">
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default({
        props:['imgs'],
        methods:{
            pushImg($event,index){
                this.$emit('pushImg',$event,index)
            }
        }
    })
</script>