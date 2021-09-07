<template>
  <div id="preview-code">
    <nav-header></nav-header>
    <van-nav-bar
      title="我的资格预审"
      left-arrow
      @click-left="Router.go(-1)"
    >
      <template #right>
        <img class="share" src="../../assets/share.png"/>
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
</template>

<script>
import html2canvas from 'html2canvas';
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import navHeader from '../navHeader/index.vue';
export default {
  name: 'previewCode',
  components: {
    navHeader,
  },
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
      editName,
      randomNum,
      getRandomCode,
      donwLoad,
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
</script>

<style lang="less" scoped>
@import './index.less';
</style>
