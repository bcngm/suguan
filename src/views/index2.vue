<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1" style="background-color: #304156;">
            <Icon type="ios-navigate"></Icon>
            <span>
              <b>智慧宿管云平台</b>
            </span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-search"></Icon>
            <span>首页</span>
          </MenuItem>
          <Submenu :name="key+4" v-for="(item,key) in list" :key="key" @click="tiaozhuan(key)">
            <template #title>
              <Icon type="ios-navigate"></Icon>
              <span v-text="item.meta.title"></span>
            </template>
            <MenuItem
              :name="(key+2) + '-' + (key2+1)"
              v-for="(item2,key2) in item.children"
              :key="key2"
              v-text="item2.meta.title"
            ></MenuItem>
          </Submenu>
          <span style="margin-bottom: 309px;"></span>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
          <el-breadcrumb separator="/" style="display: inline-block;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <el-tag type="success" style="margin:10px" class="bs">● 首页</el-tag>
          <div style="border-bottom: 1px solid #d7dde4;"></div>

          <div class="neirong">
            <el-button type="danger">开闸</el-button>

            <el-row class="zhong">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <b class="fenkai">宿舍栋号</b>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <b class="fenkai">楼层</b>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <b class="fenkai">宿舍号</b>
                  <el-input style="width:203px" v-model="shushehoa" placeholder="请输入内容"></el-input>
                </div>
              </el-col>
            </el-row>
            <br />
            <br />
            <el-row class="zhong">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <b class="fenkai">请选择日期</b>

                  <div class="block" style="width: 235px;display: inline-block;">
                    <el-date-picker
                      v-model="value2"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                  <el-button type="primary">主要按钮</el-button>
                </div>
              </el-col>
            </el-row>

            <el-divider></el-divider>
            <el-divider>
              <el-button type="primary" style="font-size:15px" plain>缺勤学生详情，请点击展开</el-button>
            </el-divider>
            <el-divider></el-divider>

            <el-card class="box-card kuan" v-for="(item,key) in people" :key="key">
              <div slot="header" class="clearfix">
                <b v-text="item.roomName">1栋8楼805</b>
                <b class="you">
                  宿舍总人数:
                  <span v-text="item.total"></span>
                </b>
              </div>
              <el-badge :value="item.normal" class="item lv" type="primary">
                <el-button size="small">正常</el-button>
              </el-badge>
              <el-badge :value="item.leaveCount" class="item" type="primary">
                <el-button size="small">请假</el-button>
              </el-badge>
              <el-badge :value="item.comebacklate" class="item" type="warning">
                <el-button size="small">晚归</el-button>
              </el-badge>
              <el-badge :value="item.absence" class="item">
                <el-button size="small">缺勤</el-button>
              </el-badge>
            </el-card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style>
.lv sup {
  background-color: #13ce66 !important;
}
.item {
  margin: 10px 20px;
}
.kuan {
  width: 237.2px;
  display: inline-block;
  margin: 5px;
}
.fenkai {
  margin-right: 10px;
}
.neirong {
  padding: 20px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>

<script>
export default {
  data() {
    return {
      shushehoa: "",
      isCollapse: true,
      isCollapsed: false,
      list: {},
      icon: [],
      children: [],
      options: [
        {
          value: "选项1",
          label: "一栋"
        },
        {
          value: "选项2",
          label: "二栋"
        }
      ],
      value: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      people: {}
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    tiaozhuan(key,) {
      console.log(key);
    }
  },
  created() {
    //侧边栏
    this.axios({
      method: "GET",
      url: "http://122.112.253.28:8095/prod-api/sys/menu/getRouters",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.list = result.data.data;
    });

    //宿舍人数
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate=&building=&storey=&bdormitory=",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.people = result.data.data.list;
      console.log(result.data.data.list);
    });
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>