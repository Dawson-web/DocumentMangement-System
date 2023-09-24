<script setup lang="ts">
import { apiConfig } from "@/config";
import axios from "axios";
import { ref } from "vue";
const path = ref("");
const upload = ref();
const uploadOutBox = ref(false);
const uploadInnerBox = ref(false);

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  // 创建FormData对象
  const formData = new FormData();
  formData.append("file", file);
  upload.value = formData;
}

async function douploadFile(path: string, upload) {
  await uploadFile();
  axios
    .post(
      `http://${apiConfig.apiAddr}${path}?action=upload&key=${apiConfig.key}`,
      upload,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 设置请求头为multipart/form-data
        },
      }
    )
    .then((response) => {
      console.log("文件上传成功");
      console.log(response);
    })
    .catch((error) => {
      console.error("文件上传失败");
      console.error(error);
    });
}
</script>

<template>
  <main>
    <br />
    <el-form label-width="auto" label-position="top" size="large">
      <el-form-item
        label="存放路径："
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <el-input v-model="path" />
      </el-form-item>
      <el-form-item
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      ></el-form-item>
    </el-form>
    <label class="input-file-button" for="fileInput">
      选择文件 <input type="file" id="fileInput" name="avatar" />
    </label>
    <br />
    <el-button type="primary" @click="uploadFile(), (uploadOutBox = true)">
      点击上传<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
    <el-dialog
      v-model="uploadOutBox"
      title="你是否确认上传该文件"
      style="width: clamp(300px, 40vw, 800px)"
    >
      <template #default>
        <span>是否确认上传</span>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="uploadOutBox = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              (uploadOutBox = false),
                (uploadInnerBox = true),
                douploadFile(path, upload),
                (path = '')
            "
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </main>
</template>

<style scoped>
.input-file-button {
  padding: 6px 25px;
  background: #00bfff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

input {
  display: none;
}
</style>
