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
    <van-nav-bar
      title="我的资格预审"
      left-arrow
      @click-left="Router.go(-1)"
    >
      <template #right>
        <img @click="donwLoad" class="share" src="../../assets/share.png"/>
      </template>
    </van-nav-bar>
    <div id="preview-body">
      <div class="box">
        <div class="box-title">
          <h1>
            <img src="../../assets/pass.png"/>
            预审通过
          </h1>
          <van-icon name="arrow" color="#b1b1b1"/>
        </div>
        <div class="box-info">
          <p @click="getRandomCode">购房资格预审码: </p>
          <p>{{numCode}}</p>
        </div>
        <div class="box-info">
          <p @click="editName('add')">购房主申请人: </p>
          <p>{{showName}}</p>
        </div>
        <div class="box-info">
          <p>拥有资格: </p>
          <p>
            <span>普通居民家庭购房资格(可购房区域:锦江区,青羊区,金牛区,武侯区,成华区,高新南区,高新西区,龙泉驿区,新都区,温江区,双流区,郫都区,天府新区)</span>
            <span v-if="type === 1">、<br/>无房居民家庭购房资格(可购房区域:锦江区,青羊区,金牛区,武侯区,成华区,高新南区,高新西区,龙泉驿区,新都区,温江区,双流区,郫都区,天府新区)</span>
          </p>
        </div>
        <div class="box-btn">
          <button>申诉</button>
        </div>
      </div>
      <p class="check-info">查看历史无效预审申请记录</p>
      <button class="check-btn">去申请购房资格预审码</button>
      <div class="tip-info" id="tip" style="padding: 15px 10px">
        请核对您的购房资格预审码的详细信息，特别提示：购房人的户籍所在区域、稳定就业所在区域和连续缴纳社保开始时间等信息会影响您报名楼盘的复核顺序。如果缺失或者不正确可通过系统申诉完善信息。
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="isShow"
  >
    <div class="popup-box">
      <van-field v-model="name" label="姓名" placeholder="请佳芮小朋友输入姓名" />
      <van-button style="margin: 10px" type="primary" size="small" @click="editName('confirm')">确定</van-button>
    </div>
  </van-popup>
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
import html2canvas from 'html2canvas';
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'previewCode',
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const Router = useRouter();
    const { name, isShow, editName } = usePopup();
    const { numCode, randomNum, getRandomCode } = useRandomCode();
    const { donwLoad } = useDownload();
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
    const showName = computed(() => {
      const regx = /^.{1}/
      return name.value.replace(regx, '*');
    });
    return {
      Router,
      name,
      isShow,
      showName,
      numCode,
      signNum,
      batteryNum,
      isShowTime,
      nowTime,
      showNowTime,
      editTime,
      editName,
      randomNum,
      getRandomCode,
      donwLoad,
      getRandom,
    };
  },
}
function useDownload() {
  const donwLoad = () => {
    nextTick(() => {
      html2canvas(document.getElementById('preview-code')).then((canvas) => {
        const strDataUrl = canvas.toDataURL('image/jpeg');
        const image = strDataUrl.replace('image/jpeg', 'image/octet-stream');
        window.location.href = strDataUrl;
        const oA = document.createElement('a');
        oA.download = '';
        oA.href = strDataUrl;
        document.body.appendChild(oA);
        oA.click();
        oA.remove();
      });
    });
  }
  return {
    donwLoad,
  }
}
function useRandomCode() {
  const numCode = ref('');
  const randomNum = (num = 6) => {
    return '' + (function getNum(numStr) {
      const str = '0123456789';
      return (numStr += str[Math.floor(Math.random() * str.length)]) && numStr.length < num ?
        getNum(numStr) : numStr;
    })('');
  };
  numCode.value = `20200015${randomNum()}`;
  const getRandomCode = () => {
    numCode.value = `20200015${randomNum()}`;
  };
  return {
    numCode,
    randomNum,
    getRandomCode,
  }
}
function usePopup() {
  const isShow = ref(false);
  const name = ref('');
  const editName = (type) => {
    if (type === 'add') {
      isShow.value = true;
    } else if (type === 'confirm') {
      console.log(name.value);
      isShow.value = false;
    }
  };
  return {
    isShow,
    name,
    editName,
  }
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
@import './index.less';
</style>
