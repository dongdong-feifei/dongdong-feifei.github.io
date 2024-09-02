<template>
  <div class="heritage-tools">
    <div class="banner">“数字工具箱：开启非遗保护新征程”</div>

    <!-- 搜索 -->
    <div ref="searchBar" :class="{ fixedTop: searchBarFixedTop }" class="search-wrapper">
      <input-search
        :size="searchBarFixedTop ? 'small' : 'medium'"
        placeholder="搜索工具"
        v-model="searchKeyword"
      ></input-search>
    </div>

    <div class="main clearfix">
      <!-- 侧边栏过滤选择 -->
      <div class="clearfix aside-filter">
        <div class="header">
          <span>选择</span>
          <span :class="{ clearable }" class="clear" @click="clearFilter">清空</span>
        </div>
        <div class="tool-category tool-filter-block">
          <h3 style="margin-bottom: 10px;">工具</h3>
          <el-checkbox v-model="checked1" label="数字化存档" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked2" label="虚拟展示" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked3" label="数据分析" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked4" label="人工智能" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked5" label="数字管理平台" border style="margin:9px;"></el-checkbox>
          <el-checkbox v-model="checked6" label="移动端非遗展示应用" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked7" label="高精度扫描仪" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked8" label="文化遗产数字地图" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked9" label="AR文物展示应用" border style="margin:9px;"></el-checkbox>
         
          <el-checkbox v-model="checked10" label="大数据文化分析平台" border style="margin:9px;"></el-checkbox>
         
        </div>
        <div class="tool-type tool-filter-block">
          
          <h3 style="margin-bottom: 10px;margin-top: 10px;">类型</h3>
          <el-checkbox v-model="checked11" label="软件" border style="margin:9px;"></el-checkbox>
         
         <el-checkbox v-model="checked12" label="硬件" border style="margin:9px;"></el-checkbox>
        
         <el-checkbox v-model="checked13" label="云服务" border style="margin:9px;"></el-checkbox>
        
         <el-checkbox v-model="checked14" label="虚拟设备" border style="margin:9px;"></el-checkbox>
        
         <el-checkbox v-model="checked15" label="元宇宙" border style="margin:9px;"></el-checkbox>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="content" v-loading:#ffffff7d.scrollFixed="loading">
        <h2 class="content-title">可用的数字化工具 ({{ filteredResults.length }})</h2>
        <ul class="content-list">
          <li class="content-item" v-for="item in filteredResults" :key="item.nid">
            <router-link :to="`/jobs`" target="_blank">
              <h3 class="title">{{ item.title }}</h3>
              <div class="subTitle">
                <span class="category">{{ item.category_name }}</span>&nbsp;|
                <span class="type">{{ item.type_name }}</span>
              </div>
              <p class="desc">{{ item.description }}</p>
            </router-link>
          </li>
        </ul>
        <el-pagination
          class="pager"
          v-model:current-page="pageOperation.page"
          v-model:page-size="pageOperation.limit"
          :background="false"
          layout="prev, pager, next, jumper"
          :total="filteredResults.length || 10"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, getCurrentInstance, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getOffsetTop} from "../../helper/utilities.js";
import EventBus from "../../helper/EventBus/index.js";
import InputSearch from '../../components/Input-Search.vue'
import CheckboxTransfer from "../../components/Checkbox-Transfer.vue";
import Loading from "../../components/Loading/index.js";
const checked1 = ref(0)
const checked2 = ref(0)
const checked3 = ref(0)
const checked4 = ref(0)
const checked5 = ref(0)
const checked6 = ref(0)
const checked7 = ref(0)
const checked8 = ref(0)
const checked9 = ref(0)
const checked10 = ref(0)
const checked11 = ref(0)
const checked12 = ref(0)
const checked13 = ref(0)
const checked14 = ref(0)
const checked15 = ref(0)
const checked16 = ref(0)
const checked17 = ref(0)
const checked18 = ref(0)
const checked19 = ref(0)
const checked20 = ref(0)
const checked21 = ref(0)
const checked22 = ref(0)
const checked23 = ref(0)
const checked24 = ref(0)
const route = useRoute()
const {proxy} = getCurrentInstance()
let positionY = 0;
let searchBarClientHeight = 0
const {keyword, job_category_id} = route.query
const searchBarFixedTop = ref(false)
// 工作种类数组
const job_category_id_list = ref(job_category_id ? [Number(job_category_id)] : [])
// 工作地点数组
const location_code_list = ref([])
// 搜索内容
const searchKeyword = ref("")
// 岗位种类列表
const jobCategories = ref([])
// 岗位城市列表
const jobCities = ref([])
// 加载
const loading = ref(false)
const results = ref({})

// 获取岗位种类列表
const getCategory = async () => {
  let res = await proxy.$api.getCategory()

  jobCategories.value = res.data.filter(item => item.name !== '全部')
}

// 获取城市列表
const getCity = async () => {
  let res = await proxy.$api.getCity()
  jobCities.value = res.data
}

const pageOperation = ref({
  limit: 5,
  page: 1
})

// 分类及城市分类以及搜索配置
const config = computed(() => {
  return {
    limit: pageOperation.value.limit,
    page: pageOperation.value.page,
    job_category_id_list: job_category_id_list.value,
    location_code_list: location_code_list.value,
  }
})

const handleCurrentChange = () => {
  console.log('fen ye')
}

// 计算属性
const clearable = computed(() => {
  return (
      job_category_id_list.value.length !== 0 || location_code_list.value.length !== 0
  )
})

const searchBar = ref("")

const toolCategoryIdList = ref([]);
const toolTypeList = ref([]);

const toolCategories = ref([
  { nid: 1, name: "数字化存档" },
  { nid: 2, name: "虚拟展示" },
  { nid: 3, name: "数据分析" },
]);

const toolTypes = ref([
  { type: "A", name: "软件" },
  { type: "B", name: "硬件" },
  { type: "C", name: "云服务" },
]);

const tools = ref([
  {
    nid: 1,
    title: "数字档案管理系统",
    category_name: "数字化存档",
    type_name: "软件",
    description: "用于高效管理和检索非物质文化遗产的数字化档案。",
  },
  {
    nid: 2,
    title: "3D虚拟展示平台",
    category_name: "虚拟展示",
    type_name: "云服务",
    description: "提供非遗项目的3D虚拟展示，让更多人了解文化遗产。",
  },
  {
    nid: 3,
    title: "文化数据分析工具",
    category_name: "数据分析",
    type_name: "软件",
    description: "帮助研究人员分析文化数据，发现趋势和规律。",
  },
  {
    nid: 4,
    title: "移动端非遗展示应用",
    category_name: "虚拟展示",
    type_name: "软件",
    description: "支持在移动设备上展示非物质文化遗产项目。",
  },
  {
    nid: 5,
    title: "高精度扫描仪",
    category_name: "数字化存档",
    type_name: "硬件",
    description: "用于对文物进行高精度扫描，生成数字化模型。",
  },
  {
    nid: 6,
    title: "非遗保护数据平台",
    category_name: "数据分析",
    type_name: "云服务",
    description: "集中管理和分析非遗保护数据，提供综合的解决方案。",
  },
  {
    nid: 7,
    title: "文化遗产数字地图",
    category_name: "虚拟展示",
    type_name: "软件",
    description: "展示各地非物质文化遗产项目的数字地图，支持互动查询。",
  },
  {
    nid: 8,
    title: "语音识别系统",
    category_name: "数据分析",
    type_name: "软件",
    description: "将非遗相关的口述历史转换为文本，方便保存和分析。",
  },
  {
    nid: 9,
    title: "AR文物展示应用",
    category_name: "虚拟展示",
    type_name: "软件",
    description: "利用增强现实技术展示文物，实现沉浸式体验。",
  },
  {
    nid: 10,
    title: "大数据文化分析平台",
    category_name: "数据分析",
    type_name: "云服务",
    description: "基于大数据技术分析非物质文化遗产的传播与影响。",
  },
  {
    nid: 11,
    title: "在线文化课程平台",
    category_name: "虚拟展示",
    type_name: "云服务",
    description: "提供非遗相关的在线课程，普及文化知识。",
  },
  {
    nid: 12,
    title: "智能文物识别系统",
    category_name: "数据分析",
    type_name: "软件",
    description: "利用AI技术识别并分类非遗文物，提升管理效率。",
  },
  {
    nid: 13,
    title: "数字化保存工具包",
    category_name: "数字化存档",
    type_name: "软件",
    description: "一套综合性的工具，用于非遗项目的数字化保存。",
  },
  {
    nid: 14,
    title: "非遗视频直播平台",
    category_name: "虚拟展示",
    type_name: "云服务",
    description: "通过直播技术展示非遗活动，扩大文化影响力。",
  },
  {
    nid: 15,
    title: "智能语音助手",
    category_name: "数据分析",
    type_name: "硬件",
    description: "用于非遗保护项目中的语音交互与数据收集。",
  },
  {
    nid: 16,
    title: "虚拟现实博物馆",
    category_name: "虚拟展示",
    type_name: "云服务",
    description: "提供非遗项目的虚拟现实展示，打造身临其境的参观体验。",
  },
  {
    nid: 17,
    title: "非遗数据可视化平台",
    category_name: "数据分析",
    type_name: "软件",
    description: "通过数据可视化技术，直观展示非遗项目的传播与保护情况。",
  },
  {
    nid: 18,
    title: "文物3D打印机",
    category_name: "数字化存档",
    type_name: "硬件",
    description: "用于将文物的3D模型打印成实体，保存与展示。",
  },
  {
    nid: 19,
    title: "非遗保护智能系统",
    category_name: "数据分析",
    type_name: "软件",
    description: "智能分析和管理非物质文化遗产保护项目的数据。",
  },
  {
    nid: 20,
    title: "非遗文化电子书平台",
    category_name: "虚拟展示",
    type_name: "云服务",
    description: "提供非遗文化相关的电子书籍，支持在线阅读与下载。",
  },
]);
const filteredResults = computed(() => {
  console.log(tools);
  return tools.value
  let results = tools.value;

  if (searchKeyword.value) {
    results = results.filter((tool) =>
      tool.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }

  // Apply category filter
  if (toolCategoryIdList.value.length) {
    results = results.filter((tool) =>
      toolCategoryIdList.value.includes(
        toolCategories.value.find((cat) => cat.name === tool.category_name).nid
      )
    );
  }

  // Apply type filter
  if (toolTypeList.value.length) {
    results = results.filter((tool) =>
      toolTypeList.value.includes(
        toolTypes.value.find((type) => type.name === tool.type_name).type
      )
    );
  }

  // 确保分页逻辑正确
  const start = (pageOperation.value.page - 1) * pageOperation.value.limit;
  const end = start + pageOperation.value.limit;

  return results.slice(start, end);
});



// 获取岗位信息
const getJobList = async () => {
  loading.value = true
  let res = await proxy.$api.getJobList(config.value)
  results.value = res
  loading.value = false
}

// mounted




const clearFilter = () => {
  if (job_category_id_list.value.length) {
    job_category_id_list.value = []
  }
  if (location_code_list.value.length) {
    location_code_list.value = []
  }
}

</script>

<style scoped lang="less">
.banner {
  padding-bottom: 500px;
  height: 400px;
  line-height: 400px;
  color: #052f77;
  width: 100%;
  min-width: @main-width;
  background-image: url("../../assets/photo/qmshy.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  font-size: @font-size-larger;
  font-family: "Noto Serif SC", serif;
  font-weight: 800;
  
}

.search-wrapper {
  position: absolute;
  width: 100%;
  padding: 0 200px;
  transform: translateY(-50%);
  z-index: 100;

  &.fixedTop {
    position: fixed;

    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
    top: 0;
    padding: 20px 130px;
    z-index: 1000;
    background-color: #fff;
    transform: translateY(0);
  }
}

.main {
  width: @main-width;
  margin: 0 auto;
  margin-top: 100px;
  padding: 0 100px 0 200px;

  .aside-filter {
    float: left;
    width: 300px;
    padding-right: 20px;

    .header {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid @border-lighter-color;
      padding-bottom: 10px;
      width: 100%;

      .clear {
        &.clearable {
          color: @main-color;
          cursor: pointer;
        }
      }
    }

    .job-filter-block {
      margin-bottom: 40px;
    }
  }

  .content {
    min-height: 500px;
    padding-left: 20px;
    border-left: 1px solid @border-lighter-color;
    margin-left: 300px;
    position: relative;

    &-title {
      margin-bottom: 30px;
      margin-left: 20px;
    }

    &-item {
      margin-bottom: 10px;
      padding: 10px 20px;
      cursor: pointer;

      .title {
        margin: 12px 0;
      }

      .subTitle {
        color: @regular-text-color;
      }

      .desc {
        white-space: pre-line;
        font-size: 14px;
        color: @secondary-text-color;

        //.text-overflow-visible-line(2);
        text-overflow: clip;
      }

      &:hover {
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 10px 30px 0 rgba(136, 150, 171, 0.15);
      }
    }

    .pagination-wrapper {
      margin-top: 50px;
      text-align: right;
    }
  }
}

.pager {
  margin-bottom: 10px;
  float: right;
}
</style>