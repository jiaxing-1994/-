<template>
  <div id="preview-code">
    <div class="nav-top">
      <div class="time" @click="editTime('add')">{{showNowTime}}</div>
      <div class="rigth" @click="getRandom">
        <div class="sign">
          <div :class="['sign1', signNum >= 1 ? 'sign-active' : '']"></div>
          <div :class="['sign2', signNum >= 2 ? 'sign-active' : '']"></div>
          <div :class="['sign3', signNum >= 3 ? 'sign-active' : '']"></div>
          <div :class="['sign4', signNum >= 4 ? 'sign-active' : '']"></div>
        </div>
        <div class="sign-text">
          4G
        </div>
        <div class="battery">
          <div
            class="rect"
            :class="{'rect-red': batteryNum < 20}"
            :style="{width: `${batteryNum}%`}"></div>
          <img src="../../assets/dianci.png"/>
        </div>
      </div>
    </div>
    <div class="header">
      <h1>身份证网证</h1>
      <div class="menu-btn">
        <icon name="gengduo"></icon>
        <icon name="guanbi"></icon>
      </div>
    </div>
    <div>

    </div>

    <div id="preview-body">
    </div>
  </div>
</template>

<script>
  import { ref, computed, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    name: 'alipayIdCard',
    props: {
    },
    setup() {
      const Router = useRouter();
      const { isShowTime, editTime, nowTime, showNowTime } = useTime();
      const { signNum, batteryNum, getRandom } = useRandom();

      return {
        Router,
        signNum,
        batteryNum,
        isShowTime,
        nowTime,
        showNowTime,
        editTime,
        getRandom,
      };
    },
  }
  function useTime() {
    const date = new Date();
    const nowTime = ref(`${date.getHours()}:${date.getMinutes()}`);
    const showNowTime = computed(() => {
      const rege = /^(\d{1,2}):(\d{1,2})$/;
      const match = nowTime.value.match(rege);
      const hour = match[1].length === 1 ? `0${match[1]}` : match[1];
      const min = match[2].length === 1 ? `0${match[2]}` : match[2];
      return `${hour}:${min}`;
    });
    const isShowTime = ref(false);
    const editTime = (type) => {
      if (type === 'add') {
        isShowTime.value = true;
      } else if (type === 'confirm') {
        console.log(nowTime.value);
        isShowTime.value = false;
      } else if (type === 'cancel') {
        isShowTime.value = false;
      }
    };
    return {
      isShowTime,
      nowTime,
      showNowTime,
      editTime,
    }
  }
  function useRandom() {
    const signNum = ref('');
    const batteryNum = ref('');
    const getSignNum = () => {
      signNum.value = Math.floor(Math.random() * 3) + 1;
    }
    const getBatteryNum = () => {
      batteryNum.value = Math.floor(Math.random() * 60) + 10;
    };
    const getRandom = () => {
      getSignNum();
      getBatteryNum();
    };
    getRandom();
    return {
      signNum,
      batteryNum,
      getRandom,
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
