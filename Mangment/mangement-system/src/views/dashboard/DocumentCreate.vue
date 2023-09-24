<script setup lang="ts">
import type { CreateFilesApi } from "@/api/type";
import { apiConfig } from "@/config";
import axios from "axios";
import { ref } from "vue";
const floder = ref({
  name: "",
  path: "",
});

async function docreateFolder(path: string, name: string) {
  try {
    const res = await axios.get<CreateFilesApi>(
      `http://${apiConfig.apiAddr}/${path}?action=newFolder&name=${name}&key=${apiConfig.key}`
    );
    console.log("创建成功");
  } catch (err) {
    console.log(err);
  }
}

async function onSubmit() {
  console.log(floder.value.path);
  await docreateFolder(floder.value.path, floder.value.name);
}
</script>

<template>
  <main>
    <div class="formbox">
      <el-form
        :model="floder"
        label-width="auto"
        label-position="top"
        size="large"
      >
        <el-form-item label="文件名称：">
          <el-input v-model="floder.name" />
        </el-form-item>
        <el-form-item label="存放路径：">
          <el-input v-model="floder.path" />
        </el-form-item>
        <el-form-item
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <el-button
            type="primary"
            @click="onSubmit(), (floder.name = ''), (floder.path = '')"
            >确认创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .formbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: clamp(250px, 30vw, 500px);
    height: 300px;
    border-radius: 20px;
    background-color: rgb(244, 244, 244);
  }
}
</style>
