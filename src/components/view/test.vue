

<template>
  <div class="container">
    <div>{{sda}}高度： {{gd}}, bottom:{{ff}}</div>
    <input type="text"  id="aa" :style="{position: 'fixed', bottom: 0,width: '100%'}"  @focus="onInputFocus" @blur="onInputBlur" placeholder="点击输入框弹出键盘">
    <div    class="keyboard-overlay" id="ttt"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isKeyboardVisible: false,
      keyboardHeight: 0,
      sda:'',
      gd:0,
      tan:false,
      ff:0
    };
  },
  methods: {
    onInputFocus() {
      this.isKeyboardVisible = true;
      window.addEventListener('resize', this.updateKeyboardHeight);
      // this.updateKeyboardHeight();

      this.tan=false

      const keyboardHeight = window.innerHeight - document.activeElement.getBoundingClientRect().bottom;
      // const aa= document.getElementById('aa')
      //  console.log('dom',aa)
      //  this.gd=aa.getBoundingClientRect().top;
      //  console.log("高度：",aa.style.top)
      //  aa.style.position='absolute;'
      //  aa.style.top= ''+aa.getBoundingClientRect().top+'px'
      //   aa.style.top='-'+keyboardHeight+'px'


    },
    onInputBlur() {
      this.sda="键盘收起"
      //this.isKeyboardVisible = false;
      this.tan=true
      window.removeEventListener('resize', this.updateKeyboardHeight);
    },
    updateKeyboardHeight() {
      this.sda="弹出键盘"
      const aa= document.getElementById('aa')
      console.log('dom',aa)
      this.gd=aa.getBoundingClientRect().top;
      console.log("高度：",aa.style.top)
      aa.style.position='absolute;'
      aa.style.top= ''+aa.getBoundingClientRect().top+'px'
      aa.style.bottom=''

      const ttt= document.getElementById('ttt')
      ttt.style.background='black'
      ttt.style.position='absolute'

      const topTemp=aa.getBoundingClientRect().top+aa.getBoundingClientRect().height
      ttt.style.width='100%'
      ttt.style.top=topTemp+'px'
      ttt.style.height='999px'
      //  this. ff= ttt.style.top
      this. ff= ttt.style.height

    },
  },
};
</script>

<style>
.container {
  position: relative;
}


</style>