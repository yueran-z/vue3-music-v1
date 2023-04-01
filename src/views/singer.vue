<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { SINGER_KEY } from "@/assets/js/constant";
import IndexList from "@/components/base/index-list/index-list";
import { getSingerList } from "@/service/singer";
import storage from "good-storage";

export default {
  name: "singer",
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList();
    console.log(result);
    this.singers = result.singers;
  },
  methods: {
    selectSinger(singer) {
      //解决刷新就要重新发送API:session storage
      this.selectedSinger = singer;
      this.cacheSinger(singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    },
  },
};
</script>

<style scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
