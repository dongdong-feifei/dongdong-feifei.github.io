<template>
  <el-card style="height: 2000px; margin: 20px">
    <div class="chart-container">
      <!-- 柱状图 -->
      <div ref="barChart" class="chart" style="height: 300px"></div>
      <!-- 折线图 -->
      <div
        ref="lineChart"
        class="chart"
        style="height: 300px; margin-top: 20px"
      ></div>
      <!-- 饼图 -->
      <div
        ref="pieChart"
        class="chart"
        style="height: 300px; margin-top: 20px"
      ></div>
    </div>
    <div
      ref="graphChart"
      class="chart"
      style="height: 300px; margin-top: 80px"
    ></div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <template #title>
        <span>{{ dialogTitle }}</span>
      </template>
      <div>
        <p><strong>名称:</strong> {{ dialogData.name }}</p>
        <p><strong>类别:</strong> {{ dialogData.category }}</p>
        <p><strong>描述:</strong> {{ dialogData.description }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <div ref="scatterChart" class="chart" style="height: 500px;margin-top: 80px"></div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <template #title>
        <span>{{ dialogTitle }}</span>
      </template>
      <div>
        <p><strong>名称:</strong> {{ dialogData.name }}</p>
        <p><strong>类别:</strong> {{ dialogData.category }}</p>
        <p><strong>描述:</strong> {{ dialogData.description }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const graphChart = ref(null);

const dialogTitle = ref("");
const dialogData = ref({ name: "", category: "", description: "" });
const scatterChart = ref(null);
const dialogVisible = ref(false);



// Sample data for non-heritage projects
const data = [
  { name: '京剧', category: '表演艺术', description: '京剧是中国传统戏剧的代表，具有丰富的表演艺术和音乐形式。', value: [10, 20, 30] },
  { name: '苏绣', category: '手工艺', description: '苏绣是中国四大名绣之一，以其细腻和生动的刺绣工艺著称。', value: [20, 30, 40] },
  { name: '川剧', category: '表演艺术', description: '川剧以其独特的变脸技艺和丰富的表现形式闻名。', value: [30, 40, 50] },
  { name: '昆曲', category: '表演艺术', description: '昆曲是中国古老的戏曲形式之一，以其优雅的表演风格和古典音乐著称。', value: [40, 50, 60] },
  { name: '陕西剪纸', category: '手工艺', description: '陕西剪纸是中国传统的民间艺术，以其独特的剪纸技巧和丰富的文化内涵受到喜爱。', value: [50, 60, 70] },
  // More data points can be added here
];

const initScatterChart = () => {
  const chartInstance = echarts.init(scatterChart.value);

  const option = {
    title: {
      text: '非遗项目点云图',
      subtext: '展示非遗项目的分布',
      left: 'center',
      top: '20px'
    },
    tooltip: {
      formatter: (params) => {
        return `<strong>名称:</strong> ${params.data.name}<br/><strong>类别:</strong> ${params.data.category}<br/><strong>描述:</strong> ${params.data.description}`;
      }
    },
    xAxis: {
      name: 'X轴',
      type: 'value'
    },
    yAxis: {
      name: 'Y轴',
      type: 'value'
    },
    series: [
      {
        type: 'scatter',
        data: data.map(item => ({
          ...item,
          itemStyle: {
            color: getColorByCategory(item.category)
          },
          symbolSize: item.value[2] / 10 // Adjust the size of the points
        })),
        emphasis: {
          focus: 'self',
          itemStyle: {
            borderColor: '#000',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}',
            position: 'top'
          }
        }
      }
    ],
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut'
  };

  chartInstance.setOption(option);

  chartInstance.on('click', (params) => {
    if (params.data) {
      dialogTitle.value = params.data.name;
      dialogData.value = params.data;
      dialogVisible.value = true;
    }
  });
};

const getColorByCategory = (category) => {
  switch (category) {
    case '表演艺术':
      return '#ff7f50'; // Coral color for performance art
    case '手工艺':
      return '#87cefa'; // Sky blue color for craftsmanship
    default:
      return '#ccc'; // Default color for unknown categories
  }
};

const handleClose = (done) => {
  dialogVisible.value = false;
  done();
};

onMounted(() => {
  initScatterChart();
});
const nodes = [
  {
    id: "1",
    name: "京剧",
    category: "表演艺术",
    description: "京剧是中国传统戏剧的代表，具有丰富的表演艺术和音乐形式。",
  },
  {
    id: "2",
    name: "苏绣",
    category: "手工艺",
    description: "苏绣是中国四大名绣之一，以其细腻和生动的刺绣工艺著称。",
  },
  {
    id: "3",
    name: "川剧",
    category: "表演艺术",
    description: "川剧以其独特的变脸技艺和丰富的表现形式闻名。",
  },
  {
    id: "4",
    name: "昆曲",
    category: "表演艺术",
    description:
      "昆曲是中国古老的戏曲形式之一，以其优雅的表演风格和古典音乐著称。",
  },
  {
    id: "5",
    name: "陕西剪纸",
    category: "手工艺",
    description:
      "陕西剪纸是中国传统的民间艺术，以其独特的剪纸技巧和丰富的文化内涵受到喜爱。",
  },
  // Add more nodes as needed
];

const links = [
  { source: "京剧", target: "表演艺术" },
  { source: "苏绣", target: "手工艺" },
  { source: "川剧", target: "表演艺术" },
  { source: "昆曲", target: "表演艺术" },
  { source: "陕西剪纸", target: "手工艺" },
  // Add more links as needed
];

const initGraphChart = () => {
  const chartInstance = echarts.init(graphChart.value);

  const option = {
    title: {
      text: "非遗知识图谱",
      subtext: "非遗项目与类别关系",
      left: "center",
    },
    tooltip: {
      formatter: (params) => {
        if (params.dataType === "node") {
          return `<strong>名称:</strong> ${params.data.name}<br/><strong>类别:</strong> ${params.data.category}`;
        }
        return "";
      },
    },
    legend: {
      data: ["表演艺术", "手工艺", "传统节日"],
      bottom: 0,
    },
    series: [
      {
        type: "graph",
        layout: "force",
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
          position: "right",
        },
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: [4, 10],
        data: nodes.map((node) => ({
          ...node,
          itemStyle: {
            color: getColorByCategory(node.category),
          },
        })),
        links: links,
        categories: [
          { name: "表演艺术", itemStyle: { color: "#ff7f50" } },
          { name: "手工艺", itemStyle: { color: "#87cefa" } },
          { name: "传统节日", itemStyle: { color: "#da70d6" } },
        ],
        lineStyle: {
          width: 2,
          curveness: 0.2,
        },
        emphasis: {
          itemStyle: {
            borderColor: "#000",
            borderWidth: 2,
          },
        },
      },
    ],
  };

  chartInstance.setOption(option);

  chartInstance.on("click", (params) => {
    if (params.dataType === "node") {
      dialogTitle.value = params.data.name;
      dialogData.value = params.data;
      dialogVisible.value = true;
    }
  });
};




onMounted(() => {
  initGraphChart();
});
const barChart = ref(null);
const lineChart = ref(null);
const pieChart = ref(null);

const initCharts = () => {
  // 数据
  const categoryData = ["表演艺术", "手工艺", "音乐艺术", "传统文化"];
  const countData = [10, 8, 6, 7];
  const monthData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const newProjectsData = [5, 7, 6, 8, 10, 9, 11, 12, 10, 8, 7, 6];
  const pieData = [
    { value: 10, name: "表演艺术" },
    { value: 8, name: "手工艺" },
    { value: 6, name: "音乐艺术" },
    { value: 7, name: "传统文化" },
  ];

  // Bar Chart
  const barChartInstance = echarts.init(barChart.value);
  barChartInstance.setOption({
    title: { text: "各类别非遗项目数量" },
    tooltip: {},
    xAxis: { type: "category", data: categoryData },
    yAxis: { type: "value" },
    series: [
      {
        name: "项目数量",
        type: "bar",
        data: countData,
      },
    ],
  });

  // Line Chart
  const lineChartInstance = echarts.init(lineChart.value);
  lineChartInstance.setOption({
    title: { text: "每月新增非遗项目数量" },
    tooltip: {},
    xAxis: { type: "category", data: monthData },
    yAxis: { type: "value" },
    series: [
      {
        name: "新增项目",
        type: "line",
        data: newProjectsData,
      },
    ],
  });

  // Pie Chart
  const pieChartInstance = echarts.init(pieChart.value);
  pieChartInstance.setOption({
    title: { text: "各类别非遗项目占比", left: "center" },
    tooltip: { trigger: "item" },
    legend: { top: "bottom" },
    series: [
      {
        name: "项目类别",
        type: "pie",
        radius: "50%",
        data: pieData,
      },
    ],
  });
};

onMounted(() => {
  initCharts();
});
</script>
  
  <style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
}
.chart {
  width: 100%;
}
</style>