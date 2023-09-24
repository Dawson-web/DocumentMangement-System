<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import type { TabsPaneContext } from "element-plus";
import { ref, watch } from "vue";

const activeName = ref("first");
watch(activeName, (value: string) => {
  console.log(value);
});
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(activeName.value + "14");
};
</script>

<template>
  <header>
    <NavBar />
  </header>
  <section>
    <div class="router">
      <RouterLink :to="{ name: 'dashboard-list' }" class="link"
        >文件列表</RouterLink
      >
      <RouterLink :to="{ name: 'dashboard-upload' }" class="link"
        >上传文件</RouterLink
      >
      <RouterLink :to="{ name: 'dashboard-create' }" class="link"
        >创建文件夹</RouterLink
      >
    </div>
  </section>

  <main>
    <div class="expandbox"><RouterView /></div>
  </main>
</template>

<style scoped lang="scss">
@import "@/styles/variable.scss";
section {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2vh;
  .router {
    align-items: center;
    background-color: #f1f2f3;
    border-radius: 5px;
    box-shadow: $box-shadow;
    display: flex;
    height: 50px;
    flex-direction: row;
    justify-content: center;
    width: 75vw;
    .link {
      color: rgb(57, 57, 57);
      font-size: clamp(0.5rem, 1vw, 1.5rem);
      font-weight: bolder;
      padding: 0 20px;
      text-decoration: none;
      &:hover {
        color: rgb(144, 144, 144);
      }
    }
  }
}

main {
  margin: 0 auto;
  max-width: $app-max-width;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2svh;
  overflow: hidden;
  .expandbox {
    display: flex;
    justify-content: center;
    background-color: rgb(249, 249, 249);
    border-radius: 20px;
    box-shadow: $box-shadow;
    height: 75vh;
    position: fixed;
    width: 75vw;
  }
}
</style>
