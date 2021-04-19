<template>
  <div class="bao">
    <div class="guanjian">
      <div class="fangan">
        <h3 class="biaoti">智慧宿管云平台</h3>
        <div class="fangzhanghao">
          <div class="zdjd">
            <el-input v-model="input" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
          </div>
        </div>

        <div class="fangzhanghao">
          <div class="zdjd">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2" show-password></el-input>
          </div>
        </div>

        <div class="fangzhanghao">
          <div class="zdjd">
            <el-input
              v-model="input3"
              style="width: 210px;height:36px"
              prefix-icon="el-icon-unlock"
              placeholder="验证码"
            ></el-input>
            <img class="fuxi you" :src="imgurl" @click="img()" />
          </div>
        </div>

        <div class="fangzhanghao">
          <div class="zdjd">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </div>
        </div>

        <div class="fangzhanghao">
          <div class="zdjd">
            <el-button type="primary" style="width:100%" @click="denglu()">登录</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="nsdeyiya">
      <span>Copyright © 2019-2020 smartdormitory.cn All Rights Reserved.</span>
    </div>
  </div>
</template>

<style>
.nsdeyiya {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.fuxi {
  height: 36px;
  width: 110px;
}
.yushui {
  border: 0px;
  height: 100%;
  position: relative;
  top: -3px;

  width: 9.93%;
}
.zdjd {
  line-height: 36px;
  position: relative;
  font-size: 14px;
}
.fangzhanghao {
  margin-bottom: 15px;
  box-sizing: inherit;
}
.biaoti {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
.fangan {
  border-radius: 6px;
  background: #fff;
  width: 380px;
  padding: 25px 25px 5px 25px;
}
.guanjian {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: inherit;
}
.bao {
  background-image: url("../img/1.png");
  background-size: 100%;
  height: 751px;
}
</style>

<script>
export default {
  data() {
    return {
      input: "admin",
      input2: "accpyy",
      input3: "",
      checked: true,
      urls: `http://122.112.253.28:8095/prod-api/admin/login`,
      imgurl: "",
      uuid: "",
      code: ""
    };
  },
  created() {
    this.axios({
      method: "GET",
      url: "http://122.112.253.28:8095/prod-api/captchaImage"
    }).then(result => {
      this.imgurl = "data:image/gif;base64," + result.data.data.img;
      this.uuid = result.data.data.uuid;
    });
  },
  methods: {
    img() {
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8095/prod-api/captchaImage"
      }).then(result => {
        this.imgurl = "data:image/gif;base64," + result.data.data.img;
        this.uuid = result.data.data.uuid;
      });
    },
    denglu() {
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8095/prod-api/admin/login",
        data: {
          username: this.input,
          password: this.input2,
          code: this.input3,
          uuid: this.uuid
        }
      }).then(result => {
        if (result.data.code) {
          sessionStorage.setItem("token",result.data.data.tokenHead + result.data.data.token);
          this.$router.push("index2");
        } else {
          console.log("难受");
        }
      });
    }
  }
};
</script>
