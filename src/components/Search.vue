<template>
  <div class="search">
    <el-row style="margin-bottom: 20px">
      <el-input
        placeholder="Support Regex like `*` and `?`"
        style="width: 500px"
        v-model="query"
        size="medium"
        prefix-icon="el-icon-search"
        clearable
      ></el-input>
    </el-row>
    <el-row :gutter="20">
        <el-col v-for="(result, index) in results" :key="index" :span="6">
          <el-card class="box-card" body-style="padding: 0px">
          <div slot="header" class="clearfix">
            <el-tag type="danger" style="font-weight: 700">{{result._source.PVNAME}}</el-tag>
          </div>
          <div v-for="key of Object.keys(result._source)" :key="key" class="text-item">
            <span>
                <el-tag type="info" effect="dark" class="pv-field"
                style="width: 100px;text-align: center;">
                    {{key}}</el-tag>:
              <el-tag type="" effect="dark" class="pv-field" style="text-align: center;">
                  {{result._source[key]}}</el-tag></span>
          </div>
        </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

// create a new Vue instance
export default {
  name: 'search',
  // declare the data for the component
  // (An array that houses the results and a query that holds the current search string)
  data() {
    return {
      results: [
      ],
      query: '',
    };
  },
  created() {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.search, 500);
  },
  // declare methods in this Vue component.
  // here only one method which performs the search is defined
  methods: {
    // make an axios request to the server with the current search query
    search() {
      axios
        .get(`http://127.0.0.1:3001/search?q=${this.query}`)
        .then((response) => {
          this.results = response.data;
        });
    },
  },
  // declare Vue watchers
  watch: {
    // watch for change in the query string and recall the search method
    query() {
      this.search();
      this.debouncedGetAnswer();
    },
  },
};
</script>

<style>
.search .el-card__body{
   max-height: 160px;
   overflow-y: scroll;
   overflow-x: scroll;
   padding: 0px 5px;
}
.search .el-card {
  margin-bottom: 10px;
  /* height: 200px; */
}
.el-main .search .text-item {
    padding: 0px;
    margin-left: 5px;
    margin-block-end: 0px;
    text-align: left;
    align-content: flex-start;
    align-items: flex-start;
}
.el-main .search .pv-field {
    margin-block-start: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
}
</style>
