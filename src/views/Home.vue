<template>
  <el-container style="height: 100%">
    <el-header>
      <el-row>
        <el-col :span="8" id="image-col">
          <el-image id="epics-logo"
            alt="EPICS Logo"
            fit='scale-down'
            :src="epics_url"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :span="8">
          <h1 style="font-">EPICS PV Search</h1>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <Search></Search>
    </el-main>
    <el-footer>
      <el-row>
      <el-col :span="8">
        <p class="p4">
        <i class="el-icon-user-solid">Contact me:</i>
          <el-link href="mailto:sdcswd@post.kek.jp" type="error">
            sdcswd@post.kek.jp</el-link>
        </p>
      </el-col>
      <el-col :span="8">
        <p class="p4">
        <i class="el-icon-share"></i>
          <el-link href="https://www.kek.jp/en/" type="error">
            High Energy Accelerator Research Organization (KEK)</el-link>
        </p>
      </el-col>
      <el-col :span="8">
        <p class="p4">
          <i class="el-icon-watermelon"></i>
          <el-link href="https://www-linac.kek.jp/" type="error">
            LINAC</el-link>
        </p>
      </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';
import png from '@/assets/EPICS_logo.png';

export default {
  name: 'Home',
  data() {
    return {
      epics_url: png,
    };
  },
  components: {
    Search,
  },
};
</script>
<style>
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header .el-row #image-col {
  margin-left: 0px;
  text-align: left;
}
#epics-logo {
  align-items: center;
  height: 60px;
  width: 200px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  padding: 0px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-footer .el-link{
  font-weight: 700;
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
P.p4 {
    margin-left: 40px;
    vertical-align: top;
    font-size: 10pt;
    font-size-adjust: inherit;
}
</style>
