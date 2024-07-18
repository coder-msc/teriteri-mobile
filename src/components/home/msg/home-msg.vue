<script setup lang="ts">

import HomeMsgChat from "@/components/home/msg/home-msg-chat.vue";
</script>

<template>
  <div id="home-msg">
    <div id="home-msg-car">
      <div class="home-msg-car-item">

        <div class="home-msg-car-item-size">
          <van-icon color="#67C23A" size="8rem" name="chat" badge="99+" />
        </div>
        <div class="home-msg-car-item-font">
          回复我的
        </div>
      </div>

      <div class="home-msg-car-item home-msg-car-item2">
        <div class="home-msg-car-item-size">
          <van-icon color="#E6A23C" size="8rem" name="star" badge="99+" />
        </div>
        <div class="home-msg-car-item-font">
          视频收藏
        </div>
      </div>

      <div class="home-msg-car-item">
        <div class="home-msg-car-item-size">
          <van-icon color="#409EFF" size="8rem" name="good-job" badge="99+" />
        </div>
        <div class="home-msg-car-item-font">
          收到的赞
        </div>
      </div>
      <div class="home-msg-car-item">
        <div class="home-msg-car-item-size">
          <van-icon size="8rem" name="volume" badge="99+" />
        </div>
        <div class="home-msg-car-item-font">
          广播通知
        </div>
      </div>
    </div>
    <div id="home-msg-main">
      <div id="home-msg-main-title">
        <div>
          聊天列表
        </div>

      </div>
      <div id="home-msg-main-car">
        <home-msg-chat v-for="index in 10"></home-msg-chat>
      </div>

    </div>

  </div>

</template>

<style scoped>
@import "@/css/mobile/home-msg.css";
</style>