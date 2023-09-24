<script setup lang="ts">
import BackgroundCard from "@/components/BackgroundCard.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <h2 class="slogan">Epoch ~ Dawson.</h2>
    <h1 class="title">
      Document <br />
      Management <br />
      System <br />
    </h1>
    <RouterLink :to="{ name: 'dashboard' }" class="link"
      >点击此处前往仪表盘</RouterLink
    >
  </main>
  <BackgroundCard />
</template>

<style scoped lang="scss">
@import "@/styles/variable.scss";
main {
  margin: 0 auto;
  max-width: $app-max-width;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12svh;

  @media (max-height: $mobile-height-breakpoint) {
    margin-top: 10svh;
  }
  .slogan {
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    padding-inline: 1.5rem;
  }

  .title {
    margin-block: 1rem;
    font-size: clamp(2rem, 5vw, 4rem);
    background-image: linear-gradient(
      to right,
      #77a1d3 0%,
      #79cbca 51%,
      #77a1d3 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
  .link {
    margin-top: 50px;
    width: 200px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
      to right,
      #77a1d3 0%,
      #79cbca 51%,
      #77a1d3 100%
    );
    background-clip: text;
    border-radius: 15px;
    font-weight: bolder;
    font-size: larger;
    text-decoration: none;
    color: #ffffff;
    &:hover {
      color: #f5f5f5;
    }
  }
}
</style>
