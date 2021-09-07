<template>
  <div id="preview-code">
    <nav-header></nav-header>
    <div class="header">
      <h1>
        <img @click="Router.go(-1)" v-if="type === 2" src="@assets/back-arrow.png"/>
        身份证{{type === 1 ? '网证' : ''}}
      </h1>
      <div class="menu-btn">
        <img @click="switchNoticeBar" src="@assets/more.png"/>
        <img @click="Router.go(-1)" src="@assets/close.png"/>
      </div>
    </div>
    <div id="preview-body">
      <div class="notice-bar" v-if="type === 1 && isShowNoticeBar">
        <van-notice-bar
          left-icon="volume-o"
          :scrollable="true"
          text="四川电子健康卡正在维护中，给你带来不便敬请谅解。"
        />
      </div>
      <div class="id-box">
        <div class="id-wrap">
          <div class="icon-nation" @click="donwLoad">
            <img src="@assets/nation.png"/>
          </div>
          <div class="info">
            <h1>
              身份证网证
              <img @click="switchEye(true)" v-if="!isShowMore" src="@assets/eye.png"/>
              <img @click="switchEye(false)" v-else src="@assets/eye2.png"/>
            </h1>
            <div class="name">
              <p class="title">姓名</p>
              <p class="value" @click="confirmNameBtn('add')">{{showName}}</p>
            </div>
            <div class="id">
              <p class="title">证件号</p>
              <p class="value id-value" @click="confirmIdBtn('add')">{{showId}}</p>
            </div>
          </div>
          <div class="icon-back">
            <img src="@assets/arrow.png"/>
          </div>
        </div>
        <div class="btn-box" v-if="type === 1">
          <div class="btn-wrap">
            <div class="btn-item">出示二维码</div>
            <div class="btn-item">查看证件照片</div>
          </div>
        </div>
        <div class="btn-box2" v-if="type === 2">
          <div class="btn-item">
            <img src="@assets/code.png"/>
            查看电子证件
          </div>
          <div class="btn-item">
            <img src="@assets/id.png"/>
            查看证件照片
          </div>
        </div>
      </div>
      <div class="menu-box">
        <div class="menu-item"
          v-for="(item, index) in menuList"
             :key="index"
        >
          <h1>{{item.name}}</h1>
          <p :style="{
            color: type === 1 ? '#000' : '#929292'
          }" v-if="item.sub">{{item.sub}}</p>
          <img src="@assets/arrow2.png"/>
        </div>
      </div>
      <p class="tip">遇到问题</p>
    </div>
  </div>
  <van-popup
    v-model:show="isShowNamePopup"
  >
    <div class="popup-box">
      <van-field v-model="name" label="姓名" placeholder="请佳芮小朋友输入姓名" />
      <van-button style="margin: 10px" type="primary" size="small" @click="confirmNameBtn('confirm')">确定</van-button>
    </div>
  </van-popup>
  <van-popup
    v-model:show="isShowIdPopup"
  >
    <div class="popup-box">
      <van-field v-model="id" label="姓名" placeholder="请佳芮小朋友输入身份证号" />
      <van-button style="margin: 10px" type="primary" size="small" @click="confirmIdBtn('confirm')">确定</van-button>
    </div>
  </van-popup>
</template>

<script>
  import {ref, computed, nextTick} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import navHeader from '@components/navHeader';
  import html2canvas from "html2canvas";
export default {
  name: 'alipayIdCard',
  components: {
    navHeader,
  },
  setup() {
    const Router = useRouter();
    const Route = useRoute();
    const mapType = {
      '支付宝电子身份证(样式1)': 1,
      '支付宝电子身份证(样式2)': 2,
    }
    const type = mapType[Route.query.name];
    const menuList =  [
      { name: '适用范围' },
      { name: '本地公积金服务' },
      { name: '关注"城市服务"生活号', sub: '线上办事攻略' },
      { name: '领取防丢证件套 (特惠)' },
      { name: '本地社保服务' },
      { name: '证件管理' },
    ];

    const isShowMore = ref(false);
    const switchEye = (value) => {
      isShowMore.value = value;
    };

    const { name, showName, id, showId } = useInfoData(isShowMore);
    const { isShowNamePopup, confirmNameBtn, isShowIdPopup, confirmIdBtn } = usePopup();

    const { donwLoad } = useDownload();

    const isShowNoticeBar = ref(true);
    const switchNoticeBar = () => {
      isShowNoticeBar.value = !isShowNoticeBar.value;
    }

    return {
      type,
      name,
      showName,
      id,
      showId,
      Router,
      menuList,
      isShowNoticeBar,
      isShowMore,
      isShowNamePopup,
      isShowIdPopup,
      confirmNameBtn,
      switchEye,
      confirmIdBtn,
      switchNoticeBar,
      donwLoad,
    };
  },
}
function useInfoData(isShowMore) {
  const name = ref('黄家兴');
  const showName = computed(() =>{
    const regx = /^(.*)(.{1})$/;
    return name.value.replace(regx, (value, match, match2) => {
      let num = '';
      for (let i = 0; i < match.length; i++) {
        num += '*'
      }
      return isShowMore.value ? value : `${num}${match2}`;
    });
  });
  const id = ref('513022199411043315');
  const showId = computed(() => {
    const regx = /^(\d{1})(\d+)([\d|X]{1})$/;
    return id.value.replace(regx, (value, match1, match2, match3) => {
      let num = '';
      for (let i = 0; i< match2.length; i++) {
        num += '*'
      }
      return isShowMore.value ? value : `${match1}${num}${match3}`;
    });
  });
  return {
    name,
    showName,
    id,
    showId,
  }
}
function usePopup() {
  const isShowNamePopup = ref(false);
  const confirmNameBtn = (type) => {
    if (type === 'add') {
      isShowNamePopup.value = true;
    } else if (type === 'confirm') {
      isShowNamePopup.value = false;
    }
  };
  const isShowIdPopup = ref(false);
  const confirmIdBtn = (type) => {
    if (type === 'add') {
      isShowIdPopup.value = true;
    } else if (type === 'confirm') {
      isShowIdPopup.value = false;
    }
  };
  return {
    isShowNamePopup,
    isShowIdPopup,
    confirmNameBtn,
    confirmIdBtn,
  }
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
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
