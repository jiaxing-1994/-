<template>
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
  <van-popup
    v-model:show="isShowTime"
  >
    <div class="popup-box">
      <van-datetime-picker
        v-model="nowTime"
        type="time"
        title="请佳芮小朋友选择时间"
        :min-hour="1"
        :max-hour="23"
        @confirm="editTime('confirm')"
        @cancel="editTime('cancel')"
      />
    </div>
  </van-popup>
</template>

<script>
  import {computed, ref} from "vue";

export default {
  name: "index",
  setup() {
    const { isShowTime, editTime, nowTime, showNowTime } = useTime();
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
      isShowTime,
      editTime,
      nowTime,
      showNowTime,
      signNum,
      batteryNum,
      getRandom,

    }
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
</script>

<style lang="less" scoped>
.nav-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    img{
      width: 100%;
    }
    .time{
      font-weight: bold;
      color: #060606;
      font-size: 15px;
    }
    .rigth{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .sign{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-right: 5px;
        height: 13px;
        div{
          width: 3.5px;
          background: #cacaca;
          border-radius: 0.5px;
          margin: 0 0.9px;
        }
        .sign1{
          height: 40%;
        }
        .sign2{
          height: 60%;
        }
        .sign3{
          height: 80%;
        }
        .sign4{
          height: 100%;
        }
        .sign-active{
          background: #080808;
        }
      }
      .sign-text{
        font-weight: bold;
        font-size: 14px;
        margin-right: 5px;
      }
      .battery{
        width: 25px;
        position: relative;
        img{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          width: 100%;
          vertical-align: middle;
        }
        .rect{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 70%;
          height: 7.5px;
          background: #333;
          left: 2px;
          border-radius: 2px;
        }
        .rect-red{
          background: #ff4239;
        }
      }
    }
  }
</style>
