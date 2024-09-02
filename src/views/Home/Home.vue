<template>
  <div class="home">
    <div ref="banner" class="banner content-item-block">
      <div class="video-wrapper">
        <video
          ref="video"
          class="video"
          preload="auto"
          muted
          loop
          playsinline
          autoplay
          poster="../../assets/video/bg.jpg"
          src="../../assets/video/bg.mp4"
          tabindex="-1"
        ></video>
      </div>
      <h1 class="banner-title">
        数遗万千 传承致远
        <div class="subTitle">PROTECTION AND INHERITANCE</div>
      </h1>
      <div class="search">
        <input-search placeholder="输入文化遗产进行搜索"></input-search>
      </div>
      <div class="bottom-tips">
        <span class="arrow-down" @click="scrollDown">
          <i>⤓</i>
        </span>
        <span class="vertical-dashed"></span>
      </div>
    </div>

    <!-- 产品 -->
    <div class="main">
      <div ref="product" class="product content-item-block" style="display: flex;flex-direction: column;justify-content: center;align-items: center;position: relative;">
        <div style="width: 820px;height: 200px;">
        <h1 class="title" style="position: absolute;right: 240px;font-style: italic;font-size: 40px;">Rich Culture</h1>
        <h1 style="position: absolute;right: 240px;top: 100px;font-style: italic;font-size: 40px;">Digital Protection</h1>
        <div class="desc" style="position: absolute;bottom: 230px;left: 250px;color: darkgray;">
          截至目前，云遗科技数据库已覆盖山东、山西、河南、河北、江苏共 5
          省，3610 项物质文化遗产中的不可移动文物
        </div>
      </div>
        <ul class="product-list">
          <li
            class="product-item"
            v-for="(item, key) in products"
            :key="key"
            @click="jumpToDetail(item)"
          >
            <img :src="item.logo" alt />
            <div>{{ item.title }}</div>
          </li>
        </ul>
        <router-link to="/products">
          <div class="more">
            <!-- <span class="more-button">了解更多</span> -->
            <bytedance-button size="large">了解更多</bytedance-button>
          </div>
        </router-link>
      </div>

      <!-- 职位 -->
      <div class="job-category content-item-block">
        <h2 class="job-category-title title">探索你感兴趣的物质文化遗产</h2>
        <ul class="job-category-list clearfix">
          <li
            v-for="item in jobCategories"
            :key="item.nid"
            class="job-category-item"
          >
            <router-link
              :to="{ name: 'jobs', query: { job_category_id: item.nid } }"
            >
              <div class="image" :style="`background-image:url(${item.image})`">
                <span class="overlay" v-if="!item.nid">{{ item.name }}</span>
              </div>
              <div v-if="item.nid" class="name">{{ item.name }}</div>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 山西 -->
      <div class="byteStandard content-item-block">
        <h1 class="title">山西</h1>
        <div class="desc">
          山西的文物文化遗产种类繁多，涵盖了古建筑、石窟、壁画、雕塑等多个领域。平遥古城是山西历史文化的重要象征，它保存了完整的明清时期城市风貌，展示了古代城市的规划和建筑艺术。云冈石窟则以其精美的佛像雕刻和丰富的佛教文化内涵而闻名于世，是中国古代石窟艺术的杰出代表。此外，悬空寺、晋祠、应县木塔等众多文物古迹，无不彰显着山西深厚的文化底蕴。
        </div>
        <div class="content">
          <div class="image">
            <span
              v-show="productLayerVisible"
              class="layer"
              @animationend="onScrollRightAnimationEnd"
            ></span>
            <img
              v-if="byteStandards[byteStandardActiveIndex]"
              style="width: 100%; height: 100%"
              :src="byteStandards[byteStandardActiveIndex].image"
              alt
            />
          </div>
          <div class="indicator">
            <ul>
              <li
                class="indicator-item"
                v-for="(item, index) in byteStandards"
                :key="index"
              >
                <h3
                  :class="{ active: byteStandardActiveIndex === index }"
                  @click="
                    () => {
                      byteStandardActiveIndex = index;
                      productLayerVisible = true;
                    }
                  "
                >
                  {{ item.title }}
                </h3>
                <p
                  v-html="item.content"
                  v-show="byteStandardActiveIndex === index"
                ></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 山东 -->
      <div class="byteStandard content-item-block">
        <h1 class="title">山东</h1>
        <div class="desc">
          山东的文物文化遗产涵盖了众多领域，包括古建筑、古遗址、石窟寺、石刻、壁画等。泰山作为世界文化与自然双重遗产，承载着深厚的历史文化底蕴，自古以来就是帝王祭祀、文人墨客吟咏的圣地。曲阜的孔庙、孔府、孔林是中国儒家文化的重要象征，展示了儒家思想的博大精深。此外，山东还有许多历史名城，如济南、青岛、淄博等，这些城市保存着大量的历史建筑和文化景观，反映了不同时期的社会风貌和文化特色。
        </div>
        <div class="content">
          <div class="image">
            <span
              v-show="productLayerVisible"
              class="layer"
              @animationend="onScrollRightAnimationEnd"
            ></span>
            <img
              v-if="byteStandards1[byteStandardActiveIndex]"
              style="width: 100%; height: 100%"
              :src="byteStandards1[byteStandardActiveIndex].image"
              alt
            />
          </div>
          <div class="indicator">
            <ul>
              <li
                class="indicator-item"
                v-for="(item, index) in byteStandards1"
                :key="index"
              >
                <h3
                  :class="{ active: byteStandardActiveIndex === index }"
                  @click="
                    () => {
                      byteStandardActiveIndex = index;
                      productLayerVisible = true;
                    }
                  "
                >
                  {{ item.title }}
                </h3>
                <p
                  v-html="item.content"
                  v-show="byteStandardActiveIndex === index"
                ></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 河南 -->
      <div class="byteStandard content-item-block">
        <h1 class="title">河南</h1>
        <div class="desc">
          河南是华夏文明的重要发祥地之一，拥有丰富的文物文化遗产，涵盖了古建筑、古遗址、石窟寺、石刻、壁画等众多领域。龙门石窟是中国古代佛教艺术的杰出代表，展现了高超的雕刻技艺和深厚的文化内涵。少林寺作为中国佛教禅宗祖庭和中国功夫的发源地，闻名遐迩。此外，河南还有许多历史名城，如洛阳、开封、安阳等，这些城市保存着大量的历史建筑和文化景观，反映了不同时期的社会风貌和文化特色。
        </div>
        <div class="content">
          <div class="image">
            <span
              v-show="productLayerVisible"
              class="layer"
              @animationend="onScrollRightAnimationEnd"
            ></span>
            <img
              v-if="byteStandards2[byteStandardActiveIndex]"
              style="width: 100%; height: 100%"
              :src="byteStandards2[byteStandardActiveIndex].image"
              alt
            />
          </div>
          <div class="indicator">
            <ul>
              <li
                class="indicator-item"
                v-for="(item, index) in byteStandards2"
                :key="index"
              >
                <h3
                  :class="{ active: byteStandardActiveIndex === index }"
                  @click="
                    () => {
                      byteStandardActiveIndex = index;
                      productLayerVisible = true;
                    }
                  "
                >
                  {{ item.title }}
                </h3>
                <p
                  v-html="item.content"
                  v-show="byteStandardActiveIndex === index"
                ></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 河北 -->
      <div class="byteStandard content-item-block">
        <h1 class="title">河北</h1>
        <div class="desc">
          河北是中华文明的重要发祥地之一，拥有众多丰富的文物文化遗产，包括古建筑、古遗址、石窟寺、石刻、壁画等。
          赵州桥是河北的标志性建筑之一，它是世界上现存年代最久远、跨度最大、保存最完整的单孔坦弧敞肩石拱桥，体现了中国古代高超的建筑技艺。
          承德避暑山庄是中国著名的古代帝王宫苑，它融合了南北园林建筑的精华，是中国古典园林艺术的杰作。
          山海关是明长城的重要关隘，素有“天下第一关”之称，它见证了无数的历史变迁，具有重要的历史意义。
          此外，河北还有许多历史名城，如保定、邯郸、邢台等，这些城市保存着大量的历史建筑和文化景观，展示了不同时期的社会风貌和文化特色。
        </div>
        <div class="content">
          <div class="image">
            <span
              v-show="productLayerVisible"
              class="layer"
              @animationend="onScrollRightAnimationEnd"
            ></span>
            <img
              v-if="byteStandards3[byteStandardActiveIndex]"
              style="width: 100%; height: 100%"
              :src="byteStandards3[byteStandardActiveIndex].image"
              alt
            />
          </div>
          <div class="indicator">
            <ul>
              <li
                class="indicator-item"
                v-for="(item, index) in byteStandards3"
                :key="index"
              >
                <h3
                  :class="{ active: byteStandardActiveIndex === index }"
                  @click="
                    () => {
                      byteStandardActiveIndex = index;
                      productLayerVisible = true;
                    }
                  "
                >
                  {{ item.title }}
                </h3>
                <p
                  v-html="item.content"
                  v-show="byteStandardActiveIndex === index"
                ></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 江苏 -->
      <div class="byteStandard content-item-block">
        <h1 class="title">江苏</h1>
        <div class="desc">
          江苏是中国历史文化名城众多的省份之一，拥有丰富的文物文化遗产，涵盖了古建筑、古遗址、石窟寺、石刻、壁画等众多领域。
          南京的明孝陵是中国明代皇家陵寝的代表，其建筑规模宏大，布局严谨，体现了中国古代皇家陵寝的建筑风格和文化内涵。
          苏州的拙政园是中国江南古典园林的杰出代表，以其精美的园林景观和独特的艺术风格闻名于世。
          扬州的个园以叠石艺术著名，采用分峰用石的手法，运用不同石料堆叠而成“春、夏、秋、冬”四景。
          此外，江苏还有许多历史名城，如镇江、无锡、常州等，这些城市保存着大量的历史建筑和文化景观，反映了不同时期的社会风貌和文化特色。
          字节范是字节跳动企业文化的重要组成部分，是我们共同认可的行为准则
        </div>
        <div class="content">
          <div class="image">
            <span
              v-show="productLayerVisible"
              class="layer"
              @animationend="onScrollRightAnimationEnd"
            ></span>
            <img
              v-if="byteStandards4[byteStandardActiveIndex]"
              style="width: 100%; height: 100%"
              :src="byteStandards4[byteStandardActiveIndex].image"
              alt
            />
          </div>
          <div class="indicator">
            <ul>
              <li
                class="indicator-item"
                v-for="(item, index) in byteStandards4"
                :key="index"
              >
                <h3
                  :class="{ active: byteStandardActiveIndex === index }"
                  @click="
                    () => {
                      byteStandardActiveIndex = index;
                      productLayerVisible = true;
                    }
                  "
                >
                  {{ item.title }}
                </h3>
                <p
                  v-html="item.content"
                  v-show="byteStandardActiveIndex === index"
                ></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { watchScrollDirection } from "../../helper/utilities.js";
import EventBus from "../../helper/EventBus";
import InputSearch from "../../components/Input-Search.vue";
import BytedanceButton from "../../components/Bytedance-Button.vue";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const router = useRouter();
const productLayerVisible = ref(false);

// 产品列表
const products = ref([]);
// 岗位列表
const jobCategories = ref([]);

// 获取岗位列表
const getJobCategory = async () => {
  let res = await proxy.$api.getCategory();
  jobCategories.value = res.data;
};
// 字节标准列表
const byteStandards = ref([
  {
    title: "平遥古城",
    content:
      "平遥古城是中国保存最为完好的四大古城之一，具有极高的历史和文化价值。它展示了明清时期的城市风貌和商业文化。",
    image: new URL("../../assets/photo/pygc.jpg", import.meta.url).href,
  },
  {
    title: "云冈石窟",
    content:
      "云冈石窟是中国古代佛教艺术的杰作，被誉为中国石窟艺术的宝库。其雕刻精美，展现了丰富的佛教文化内涵。",
    image: new URL("../../assets/photo/ygsk.jpg", import.meta.url).href,
  },
  {
    title: "晋祠",
    content:
      "晋祠是中国现存最早的皇家祭祀园林，具有悠久的历史和独特的建筑风格。它融合了自然景观与人文景观。",
    image: new URL("../../assets/photo/jc.jpg", import.meta.url).href,
  },
  {
    title: "悬空寺",
    content:
      "悬空寺以如临深渊的险峻而著称，是一座独特的高空木构建筑。它体现了中国古代建筑的高超技艺。",
    image: new URL("../../assets/photo/xks.jpg", import.meta.url).href,
  },
  {
    title: "应县木塔",
    content:
      "应县木塔是世界上现存最古老、最高大的木塔，展示了中国古代木结构建筑的卓越成就。",
    image: new URL("../../assets/photo/yxmt.jpg", import.meta.url).href,
  },
]);
const byteStandardActiveIndex = ref(0);
const byteStandardActiveIndex1 = ref(0);
const byteStandardActiveIndex2 = ref(0);

const byteStandards1 = ref([
  {
    title: "泰山",
    content:
      "泰山是中国五岳之首，被誉为“天下第一山”，具有丰富的历史文化底蕴，是中国重要的宗教文化圣地。",
    image: new URL("../../assets/photo/taishan.jpeg", import.meta.url).href,
  },
  {
    title: "孔庙",
    content:
      "孔庙位于山东曲阜，是祭祀孔子的场所，具有极高的历史和文化价值。它是中国封建社会尊孔文化的重要象征。",
    image: new URL("../../assets/photo/kongmiao.jpg", import.meta.url).href,
  },
  {
    title: "曲阜三孔",
    content:
      "曲阜三孔包括孔庙、孔府和孔林，是纪念和祭祀孔子的地方，展示了中国古代礼教文化的重要性。",
    image: new URL("../../assets/photo/sankong.jpg", import.meta.url).href,
  },
  {
    title: "蓬莱阁",
    content:
      "蓬莱阁位于山东省烟台市，是中国古代四大名楼之一，因其神秘的海市蜃楼景象而著称。",
    image: new URL("../../assets/photo/penglai.jpg", import.meta.url).href,
  },
  {
    title: "大明湖",
    content:
      "大明湖位于山东省济南市，是中国北方著名的自然湖泊，以其美丽的风景和丰富的文化底蕴而闻名。",
    image: new URL("../../assets/photo/daminghu.jpeg", import.meta.url).href,
  },
]);
const byteStandards2 = ref([
  {
    title: "龙门石窟",
    content:
      "龙门石窟是世界上造像最多、规模最大的石刻艺术宝库，被联合国教科文组织评为‘中国石刻艺术的最高峰’。",
    image: new URL("../../assets/photo/lmsk.jpg", import.meta.url).href,
  },
  {
    title: "少林寺",
    content:
      "少林寺是中国佛教禅宗祖庭和中国功夫的发源地，素有‘天下功夫出少林，少林功夫甲天下’之说。",
    image: new URL("../../assets/photo/sls.jpg", import.meta.url).href,
  },
  {
    title: "白马寺",
    content:
      "白马寺是佛教传入中国后兴建的第一座官办寺院，被誉为中国佛教的‘祖庭’和‘释源’。",
    image: new URL("../../assets/photo/bms.jpg", import.meta.url).href,
  },
  {
    title: "殷墟",
    content:
      "殷墟是中国商朝后期都城遗址，出土了大量都城建筑遗址和以甲骨文、青铜器为代表的丰富的文化遗存。",
    image: new URL("../../assets/photo/yx.avif", import.meta.url).href,
  },
  {
    title: "清明上河园",
    content:
      "清明上河园是按照北宋著名画家张择端的传世之作《清明上河图》为蓝本建造的大型宋代历史文化主题公园。",
    image: new URL("../../assets/photo/qmshy.jpg", import.meta.url).href,
  },
]);
const byteStandards3 = ref([
  {
    title: "承德避暑山庄",
    content:
      "承德避暑山庄是中国现存最大的古典皇家园林，是清代皇帝夏天避暑和处理政务的场所，具有极高的历史和文化价值。",
    image: new URL("../../assets/photo/cdbssz.jpg", import.meta.url).href,
  },
  {
    title: "山海关",
    content:
      "山海关是明长城的东北关隘之一，被誉为‘天下第一关’，它见证了许多历史事件，具有重要的战略地位。",
    image: new URL("../../assets/photo/shg.webp", import.meta.url).href,
  },
  {
    title: "赵州桥",
    content:
      "赵州桥是世界上现存年代久远、跨度最大、保存最完整的单孔坦弧敞肩石拱桥，展现了中国古代桥梁建筑的高超技艺。",
    image: new URL("../../assets/photo/zzq.jpg", import.meta.url).href,
  },
  {
    title: "西柏坡",
    content:
      "西柏坡是中国革命圣地之一，曾是中共中央所在地，在这里指挥了三大战役，召开了具有历史意义的七届二中全会。",
    image: new URL("../../assets/photo/xbp.jpg", import.meta.url).href,
  },
  {
    title: "清西陵",
    content:
      "清西陵是清代自雍正时起四位皇帝的陵寝之地，建筑群规模宏大，保存完好，具有重要的历史和文化意义。",
    image: new URL("../../assets/photo/qxl.webp", import.meta.url).href,
  },
]);
const byteStandards4 = ref([
  {
    title: "苏州园林",
    content:
      "苏州园林是中国古典园林的杰出代表，以精致、秀丽和典雅著称。它们展现了江南园林艺术的精髓，具有极高的历史和文化价值。",
    image: new URL("../../assets/photo/szyl.jpeg", import.meta.url).href,
  },
  {
    title: "南京明孝陵",
    content:
      "南京明孝陵是明朝开国皇帝朱元璋的陵墓，是中国古代帝王陵墓建筑的杰出代表，具有重要的历史和文化意义。",
    image: new URL("../../assets/photo/njmxl.jpeg", import.meta.url).href,
  },
  {
    title: "扬州瘦西湖",
    content:
      "扬州瘦西湖以其婉约的风景和独特的园林艺术闻名，是中国古代园林艺术的珍贵遗产。",
    image: new URL("../../assets/photo/yzxsh.png", import.meta.url).href,
  },
  {
    title: "泰州天德湖",
    content:
      "泰州天德湖风景区是江南水乡的典型代表，湖光山色，环境优美，展示了自然与人文景观的和谐融合。",
    image: new URL("../../assets/photo/tztdh.jpg", import.meta.url).href,
  },
  {
    title: "南京长江大桥",
    content:
      "南京长江大桥是中国第一座由中国自行设计和建造的双层铁路、公路两用桥梁，代表了中国桥梁建筑的辉煌成就。",
    image: new URL("../../assets/photo/njcjdq.jpg", import.meta.url).href,
  },
]);
const onScrollRightAnimationEnd = () => {
  productLayerVisible.value = false;
};

onMounted(() => {
  EventBus.emit("home-scrolling", {
    x: document.body.scrollLeft,
    y: document.body.scrollTop,
  });
  // getProductList()
  // getJobCategory()
});

// 位置跳转
const scrollDown = () => {
  proxy.$refs.product.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

// 产品跳转
const jumpToDetail = (item) => {
  router.push({
    name: "products",
    query: {
      id: item.nid,
    },
  });
};

// 获取产品列表
const getProductList = async () => {
  let res = await proxy.$api.getProductList({});
  products.value = res.data;
};
</script>

<style scoped lang="less">
@keyframes verticalMotion {
  0% {
    transform: translateY(6px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(6px);
  }
}

@keyframes scrollToRight {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.home {
  .main {
    width: @main-width;
    margin: auto;
  }

  .content-item-block {
    .title {
      font-size: @font-size-larger;
    }
  }
}

.banner {
  height: 100vh;
  min-height: 400px;
  min-width: @main-width;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(51, 112, 255, 0.2);
  position: relative;
  .banner-title {
    font-family: "Noto Serif SC", serif;
  }

  .video-wrapper {
    font-size: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;

    .video {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &-title {
    color: #fff;
    font-size: 60px;
    text-align: center;

    .subTitle {
      font-family: "黑体", sans-serif;
      &::after,
      &::before {
        content: "";
        position: absolute;
        background-image: linear-gradient(
          270deg,
          hsla(0, 0%, 100%, 0),
          #fff 47%,
          hsla(0, 0%, 100%, 0)
        );
        height: 2px;
        width: 89px;
        top: 50%;
        transform: translateY(-50%);
      }

      &:before {
        right: 10px;
      }

      &:after {
        left: 10px;
      }

      position: relative;
      margin-top: 10px;
      font-size: @font-size-base;
      letter-spacing: 20px;
    }
  }

  .search {
    width: 500px;
    margin-top: 100px;
    margin-bottom: 40px;
  }

  .bottom-tips {
    position: absolute;
    bottom: 30px;
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    text-align: center;

    .arrow-down {
      display: block;
      margin-bottom: 4px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #fff;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
      font-size: 21px;

      i {
        animation: verticalMotion 1.3s infinite linear;
        display: inline-block;
        font-style: normal;
      }
    }

    // 分割竖线
    .vertical-dashed {
      border-left: 1px dashed #fff;
      height: 30px;

      display: inline-block;
    }
  }
}

// 产品
.product {
  margin-top: 40px;
  text-align: center;
  padding: 40px 40px;
  background-size: 100%;
  background: url(//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/global.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 370px;

  .desc {
    margin: 40px 0;
  }

  &-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &-item {
    width: 90px;
    // height: 90px;
    cursor: pointer;

    &:nth-child(1),
    &:nth-child(9) {
      margin-top: 116px;
    }

    &:nth-child(2),
    &:nth-child(8) {
      margin-top: 80px;
    }

    &:nth-child(3),
    &:nth-child(7) {
      margin-top: 55px;
    }

    &:nth-child(4),
    &:nth-child(6) {
      margin-top: 30px;
    }

    &:hover {
      color: @main-color;

      img {
        border-radius: 19px;

        transform: scale(1.2);
        transform-origin: bottom;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }

    img {
      width: 90px;
      height: 90px;
      border-radius: 19px;

      margin-bottom: 10px;
      transition: transform 0.3s;
    }
  }

  .more {
    margin: auto;
    margin-top: 170px;

    width: 149px;
  }
}

// 职位

.job-category {
  text-align: center;
  margin-top: 90px;

  &-list {
    margin-top: 70px;
  }

  &-item {
    float: left;
    margin-bottom: 16px;

    .image {
      width: 250px;
      height: 250px;
      line-height: 250px;
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 50%;
      margin: 0 auto;

      transition: all 0.3s;
      background-position: center;
      overflow: hidden;

      &:hover {
        box-shadow: 0 0 8px 1px #ccc;
        background-size: 110%;

        & + .name {
          color: @main-color;
        }
      }

      .overlay {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;

        font-size: 40px;
      }
    }

    .name {
      margin-top: 23px;
      font-size: @font-size-large;
    }

    margin: 0 2.5%;
    margin-bottom: 30px;
    width: 20%;
  }
}

// 字节范

.byteStandard {
  padding: 40px 40px;
  overflow: hidden;

  .title {
    margin-bottom: 30px;
  }

  .desc {
    margin-bottom: 40px;
  }

  .content {
    .image {
      .layer {
        // left: -100%;
        width: 100%;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        animation: scrollToRight 0.8s ease-in-out;
      }

      position: relative;

      float: left;
      width: 700px;
      height: 450px;
      margin-right: 100px;
      overflow: hidden;

      img {
        border-radius: 6px;
        object-fit: cover;
      }
    }
  }

  .indicator {
    color: #aaa;

    &-item {
      margin: 32px 0;

      h3 {
        &.active {
          color: black;
          font-size: 32px;
          font-weight: 400;
        }

        cursor: pointer;
      }
    }
  }
}

// 字节生活
.byteLife {
  // width:1200px;
  // overflow: hidden;
  &-title {
    margin-bottom: 70px;
  }

  padding-left: 10%;

  .block-item {
    overflow: hidden;
    margin-bottom: 100px;

    &:nth-child(odd) {
      .block-item-column {
        &-text {
          margin-right: 9%;
        }

        float: left;
      }
    }

    &:nth-child(even) {
      .block-item-column {
        &-image {
          margin-right: 9%;
        }

        float: right;
      }
    }

    &-column {
      &-title {
        margin-bottom: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid #ccc;
      }

      &-text {
        width: 30%;
      }

      &-image {
        height: 400px;
        width: 59%;
        border-radius: 8px;
        overflow: hidden;

        img {
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

// 员工故事
.staffStory {
  padding: 40px 90px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  &-list {
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  &-item {
    // height: 450px;
    overflow: hidden;
    padding: 50px;
    width: 30%;
    cursor: pointer;

    &:hover {
      box-shadow: 0 10px 30px 0 @box-shadow-hover-color;

      .circular-button {
        color: @main-color;
      }
    }

    .avatar {
      width: 70%;
      margin: auto;
    }

    .text {
      .title {
        color: @primary-text-color;
        font-weight: @font-weight-regular;
        font-size: @font-size-large;
        margin: 10px 0;
        white-space: nowrap;
      
      }

      .desc {
        color: @primary-text-color;
        margin: 12px 0;
        font-size: @font-size-base;
      }

      .remark {
        font-size: @font-size-base;

        color: @regular-text-color;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .circular-button {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: 1px solid;
      line-height: 30px;

      margin: auto;
      margin-top: 20px;
      color: #ccc;
    }
  }
}
</style>