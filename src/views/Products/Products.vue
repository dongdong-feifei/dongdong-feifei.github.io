<template>
  <el-card
    style="
      margin: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
    "
  >
    <div class="title">非遗数据库</div>
  </el-card>
  <el-card
    class="heritage-database"
    style="margin: 20px; background-color: rgb(32, 32, 32)"
  >
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
      </el-carousel-item>
    </el-carousel>
  </el-card>

  <el-card style="margin: 20px">
    <el-table :data="filteredHeritageList" style="width: 100%">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="类别" prop="category" />
      <el-table-column label="描述" prop="description" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="searchKeyword" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteHeritage(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="filteredHeritageList.length"
      layout="total, prev, pager, next, jumper"
      style="margin-top: 20px; text-align: center;"
    />
  </el-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import image1 from "../../assets/photo/1.png";
import image2 from "../../assets/photo/2.png";
import image3 from "../../assets/photo/3.png";
import image4 from "../../assets/photo/4.png";
import image5 from "../../assets/photo/5.png";

const searchKeyword = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const images = ref([image1, image2, image3, image4, image5]);

const heritageList = ref( [
  { id: 1, title: "京剧", category: "表演艺术", description: "京剧是中国传统戏剧的代表，具有丰富的表演艺术和音乐形式。" },
  { id: 2, title: "苏绣", category: "手工艺", description: "苏绣是中国四大名绣之一，以其细腻和生动的刺绣工艺著称。" },
  { id: 3, title: "川剧", category: "表演艺术", description: "川剧以其独特的变脸技艺和丰富的表现形式闻名。" },
  { id: 4, title: "昆曲", category: "表演艺术", description: "昆曲是中国古老的戏曲形式之一，以其优雅的表演风格和古典音乐著称。" },
  { id: 5, title: "陕西剪纸", category: "手工艺", description: "陕西剪纸是中国传统的民间艺术，以其独特的剪纸技巧和丰富的文化内涵受到喜爱。" },
  { id: 6, title: "藏族歌舞", category: "表演艺术", description: "藏族歌舞展现了藏族人民的生活方式和宗教信仰，具有鲜明的地方特色。" },
  { id: 7, title: "黄梅戏", category: "表演艺术", description: "黄梅戏是一种流行于安徽的地方戏剧，具有悠扬动听的音乐和生动的故事情节。" },
  { id: 8, title: "福建莆仙戏", category: "表演艺术", description: "莆仙戏是福建省传统的地方戏曲，以其鲜明的地域特色和精湛的表演技巧著称。" },
  { id: 9, title: "景泰蓝", category: "手工艺", description: "景泰蓝是一种传统的中国工艺品，以其精美的瓷器和独特的蓝色釉面著称。" },
  { id: 10, title: "龙舟竞渡", category: "传统节日", description: "龙舟竞渡是中国传统节日端午节的主要活动之一，象征着团结和奋进。" },
  { id: 11, title: "陶艺", category: "手工艺", description: "陶艺是通过泥土塑造和烧制形成的艺术品，具有丰富的文化和历史背景。" },
  { id: 12, title: "编织艺术", category: "手工艺", description: "编织艺术包括多种纺织技艺，如织布、编篮和刺绣，展现了民间工艺的独特魅力。" },
  { id: 13, title: "剪纸艺术", category: "手工艺", description: "剪纸艺术是一种传统的民间工艺，通过剪刀和纸张创造出各种美丽的图案。" },
  { id: 14, title: "传统书法", category: "书法艺术", description: "书法是中国传统艺术之一，通过书写汉字展现出书写者的情感和技艺。" },
  { id: 15, title: "中国传统音乐", category: "音乐艺术", description: "中国传统音乐包括多种古老的乐器和演奏技艺，体现了丰富的音乐文化。" },
  { id: 16, title: "民族舞蹈", category: "表演艺术", description: "民族舞蹈是各民族传统的舞蹈形式，展现了各民族独特的文化和风俗。" },
  { id: 17, title: "木雕", category: "手工艺", description: "木雕是用雕刻工具在木材上创作的艺术品，具有精细的工艺和独特的艺术价值。" },
  { id: 18, title: "刺绣", category: "手工艺", description: "刺绣是用针线在织物上刺绣出图案的工艺，展示了细腻的工艺和美丽的图案。" },
  { id: 19, title: "编织工艺", category: "手工艺", description: "编织工艺涉及各种纺织技术，如织布和编篮，具有丰富的文化和历史背景。" },
  { id: 20, title: "传统民乐", category: "音乐艺术", description: "传统民乐是中国各民族传统的音乐形式，通过传统乐器演奏展示丰富的音乐风格。" },
  { id: 21, title: "茶道", category: "传统文化", description: "茶道是中国传统的饮茶文化，注重茶的冲泡技艺和品茶的过程。" },
  { id: 22, title: "陶瓷艺术", category: "手工艺", description: "陶瓷艺术包括各种陶瓷制品，如瓷器和陶器，展示了精湛的工艺和艺术价值。" },
  { id: 23, title: "雕刻艺术", category: "手工艺", description: "雕刻艺术是通过雕刻工具在各种材料上创作艺术品，展现了精湛的技艺和艺术风格。" },
  { id: 24, title: "传统戏曲", category: "表演艺术", description: "传统戏曲包括多种地方戏曲形式，以其独特的演出风格和音乐特色受到喜爱。" },
  { id: 25, title: "书法艺术", category: "书法艺术", description: "书法艺术是通过书写汉字展现艺术风格的传统艺术，具有深厚的文化背景和艺术价值。" },
  { id: 26, title: "传统绘画", category: "美术艺术", description: "传统绘画包括中国古代的山水画、花鸟画等，展示了丰富的艺术风格和技艺。" },
  { id: 27, title: "传统民俗", category: "传统文化", description: "传统民俗包括各种地方风俗和节日庆典，体现了丰富的地方文化和习俗。" },
  { id: 28, title: "民族工艺", category: "手工艺", description: "民族工艺包括各民族传统的手工技艺，如编织、刺绣和木雕，展现了独特的工艺风格。" },
  { id: 29, title: "历史文物", category: "传统文化", description: "历史文物是中国古代遗留下来的各种文物，展示了丰富的历史和文化背景。" },
  { id: 30, title: "民间传说", category: "传统文化", description: "民间传说包括各种地方传说故事，体现了丰富的文化背景和民间智慧。" }
]);

const filteredHeritageList = computed(() => {
  if (!searchKeyword.value) return heritageList.value;
  return heritageList.value.filter((item) =>
    item.title.includes(searchKeyword.value)
  );
});

const openEditDialog = (item) => {
  form.value = { ...item };
  isDialogVisible.value = true;
};

const saveHeritage = () => {
  if (form.value.id) {
    const index = heritageList.value.findIndex(
      (item) => item.id === form.value.id
    );
    heritageList.value[index] = { ...form.value };
    ElMessage.success("项目更新成功");
  } else {
    form.value.id = Date.now();
    heritageList.value.push({ ...form.value });
    ElMessage.success("项目新增成功");
  }
  isDialogVisible.value = false;
};

const deleteHeritage = (item) => {
  heritageList.value = heritageList.value.filter(
    (heritage) => heritage.id !== item.id
  );
  ElMessage.success("项目删除成功");
};

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.title {
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
  font-size: 30px;
}
.heritage-database {
  padding: 20px;
}
</style>