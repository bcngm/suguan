<template>
  <div>
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
            <Submenu :name="key+4" v-for="(item,key) in list" :key="key">
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
              <el-breadcrumb-item>基础数据</el-breadcrumb-item>
              <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            </el-breadcrumb>
          </Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
            <el-tag type="success" style="margin:10px" class="bs">首页</el-tag>
            <el-tag type="success" style="margin:10px" class="bs">班级管理</el-tag>
            <div style="border-bottom: 1px solid #d7dde4;"></div>

            <div class="neirong">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <b>班级名称</b>
                    <el-input v-model="input" class="xiaoyidaindianla" placeholder="请输入班级名称"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">
                    <b>班主任</b>
                    <el-input v-model="input2" class="xiaoyidaindianla" placeholder="请输入班主任名称"></el-input>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <b>状态</b>
                    <el-select v-model="value" placeholder="班级状态" class="xiaoyidaindianla">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button icon="el-icon-refresh">重置</el-button>
                  </div>
                </el-col>
              </el-row>
              <br />
              <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus">新增</el-button>
              <el-button type="success" icon="el-icon-edit" disabled>修改</el-button>
              <el-button type="danger" icon="el-icon-delete" disabled>删除</el-button>
            </div>

            <!-- 添加班级信息 -->
            <el-dialog title="添加班级信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="班级名称" style="width:323px" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班主任" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option
                      :label="item.username"
                      v-text="item.username"
                      :value="key"
                      v-for="(item,key) in wn"
                      :key="key"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,xinzheng()">确 定</el-button>
              </div>
            </el-dialog>

            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column class="zbc" label="序号" width="120">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column label="班级名称" width="120">
                <template slot-scope="scope">{{ scope.row.className }}</template>
              </el-table-column>
              <el-table-column
                prop="classTeacherName"
                label="班主任"
                width="120"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="modifyTime" label="修改时间" width="200" show-overflow-tooltip></el-table-column>
              <el-table-column label="状态" width="120" show-overflow-tooltip>
                <template>
                  <el-switch
                    prop="zt"
                    active-color="#13ce66"
                    :active-value="'0'"
                    :inactive-value="'1'"
                    inactive-color="#ff4949"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="chaozuo" label="操作" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    @click="FormVisible = true,xiougai(scope.row.id)"
                    style="margin-right: 10px;"
                    circle
                  ></el-button>

                  <el-popconfirm title="这是一段内容确定删除吗？" @confirm="querenshanchu(scope.row.id)">
                    <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </Content>

          <!-- 修改班级信息 -->
          <el-dialog title="修改班级信息" :visible.sync="FormVisible">
            <el-form :model="form2">
              <el-form-item label="班级名称" style="width:323px" :label-width="formLabelWidth2">
                <el-input v-model="xiougaidebanjiming" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="班主任" :label-width="formLabelWidth2">
                <el-select v-model="form2.region" placeholder="请选择活动区域">
                  <el-option
                    :label="item.username"
                    v-text="item.username"
                    :value="key"
                    v-for="(item,key) in wn"
                    :key="key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="FormVisible = false">取 消</el-button>
              <el-button type="primary" @click="FormVisible = false,quedingxiougai()">确 定</el-button>
            </div>
          </el-dialog>

          <div class="block" style="text-align: right;margin: 0 20px 20px 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<style>
.el-table .cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-right: 10px;
  text-align: center;
}
.xiaoyidaindianla {
  width: 200px;
  margin-left: 10px;
}
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
      xiougaidebanjiming: "",
      xiougaiquanbu: {},
      TableVisible: false,
      FormVisible: false,
      form2: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth2: "120px",

      kaigaun: true,
      list: {},
      children: [],
      isCollapse: true,
      isCollapsed: false,
      input: "",
      input2: "",
      input3: "",
      options: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "2",
          label: "停用"
        }
      ],
      value: "",
      tableData: [{}],
      multipleSelection: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 1,
      total: 0,
      yeshu: 1,
      tiaoshu: 10,
      bianhao: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      wn: {}
    };
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
      console.log(this.list)
    });

    //班级数据
    this.banjishuju(1, 10);

    //下拉值
    this.wanneng(
      "http://122.112.253.28:8095/prod-api/sys/user/getClassTeacherList",
      "GET"
    );
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    quedingxiougai() {
      this.axios({
        method: "PUT",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/update/" +
          this.xiougaiquanbu.id,
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: {
          className: this.xiougaiquanbu.className,
          classTeacherId: this.wn[this.form2.region].id,
          classTeacherName: null,
          createTime: this.xiougaiquanbu.createTime,
          id: this.xiougaiquanbu.id,
          modifyTime: this.xiougaiquanbu.modifyTime,
          status: null,
          userId: 0
        }
      }).then(result => {
        console.log(result);
        this.banjishuju(this.yeshu, this.tiaoshu);
        this.form2.region = "";
      });
    },
    xiougai(id) {
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8095/prod-api/basedata/bclass/" + id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        (this.xiougaidebanjiming = result.data.data.className),
          (this.xiougaiquanbu = result.data.data);
      });
    },

    //3 10 12 13
    xinzheng() {
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8095/prod-api/basedata/bclass/create",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: {
          className: this.form.name,
          classTeacherId: this.wn[this.form.region].id,
          status: "1"
        }
      }).then(result => {
        console.log(result);
        this.banjishuju(this.yeshu, this.tiaoshu);
        (this.form.name = ""), (this.form.region = "");
      });
    },
    wanneng(url, method) {
      this.axios({
        method: method,
        url: url,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.wn = result.data.data;
      });
    },
    querenshanchu(id) {
      this.axios({
        method: "DELETE",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/deleteByIds/" +
          id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        console.log(result);
        this.banjishuju(this.yeshu, this.tiaoshu);
      });
    },
    banjishuju(yeshu, tiaoshu) {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=" +
          yeshu +
          "&pageSize=" +
          tiaoshu,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.tableData = result.data.data.list;
        this.total = result.data.data.total;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.tiaoshu = val;
      this.banjishuju(this.yeshu, val);
    },
    handleCurrentChange(val) {
      this.yeshu = val;
      this.banjishuju(val, this.tiaoshu);
    }
  }
};
</script>