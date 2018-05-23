<template>
    <div class="send_btn weui-footer_fixed-bottom">
        <a :class="'weui-btn  weui-btn_primary '+btn.show" @click="send">提交</a>
    </div>
</template>
<script>
    export default({
        props:['btn'],
        methods:{
            send(){
                this.$emit('send');
            }
        }
    })
</script>