<template>
<div class="person-card">
    <div class="info">
          <HeadPortrait ></HeadPortrait>
          <div class="info-detail">
            <div class="name">{{ personInfo.nickname }}</div>
            <div class="detail">{{personInfo.email}}</div>
          </div>

    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";

export default {
  props: {
    personInfo: {
      default: {
      },
    },
    pcCurrent: {
      default: ''
    }
  },
  components: {
    HeadPortrait,
  },
  data() {
    return {
      current: '',
    }
  },
  watch: {
    pcCurrent: function() {
      this.isActive()
    }
  },
  methods: {
    isActive() {
      this.current = this.pcCurrent
    }
  }
};
</script>

<style lang="scss" >
.person-card {
  width: 80%;
  height: 80px;
  border-radius: 10px;
  background-color: #9d9cf4c4;
  position: relative;
  margin: 25px 0 ;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      .name {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  &:hover {
    background-color: #9E9CF4;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(#9E9CF4,0.5);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}
.activeCard {
    background-color: #9E9CF4;
    transition: 0.3s;
    box-shadow: 3px 2px 10px 0px rgba(#9E9CF4,0.5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
}
</style>