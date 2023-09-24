<script setup lang="ts">
import {
  dodelInfo,
  dodowloadInfo,
  dogetInfoDetail,
  dorenameInfo,
  refreshMyDocument,
} from "@/api/index";
import type { GetDocumentsApi } from "@/api/type";
import { Delete, Edit, Message, Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const filepath = ref("");
const document = ref<GetDocumentsApi["response"]["payload"] | null>(null);
const documentDetail = ref();
const cutpath = ref();
const backpath = ref();

//加载文件列表
onMounted(async () => {
  eclMyDocument(filepath.value);
});

//删除文件提示
const delInfoOutBox = ref(false);
const delInfoInnerBox = ref(false);

//获取文件详情信息
const delInfoDetailOutBox = ref(false);
const delInfoDetailInnerBox = ref(false);

//重命名文件
const renameOutBox = ref(false);
const renameInnerBox = ref(false);
const newname = ref("");

function eclMyDocument(filepath: string) {
  cutpath.value = filepath.split("/");
  refreshMyDocument(filepath)
    .then((result) => {
      document.value = result;
      console.log(cutpath); // 输出结果
    })
    .catch((error) => {
      console.log(error); // 处理错误
    });
}

function eclInfoDetail(path) {
  dogetInfoDetail(path)
    .then((result) => {
      documentDetail.value = result;
      console.log(documentDetail); // 输出结果
    })
    .catch((error) => {
      console.log(error); // 处理错误
    });
}
</script>

<template>
  <el-collapse accordion class="list" style="position: relative">
    <section
      style="
        position: relative;
        margin-left: clamp(-600px, -60%, -180px);
        margin-top: 10px;
      "
    >
      <el-icon
        v-if="filepath != ''"
        @click="
          (backpath = filepath.split(cutpath[cutpath.length - 1])),
            console.log(backpath),
            (filepath = backpath[0]);
          eclMyDocument(filepath);
        "
        style="position: absolute; margin-top: 3px"
        ><ArrowLeftBold
      /></el-icon>
      <span style="margin-left: 20px">文件路径：{{ filepath }}</span>
    </section>
    <hr />
    <el-collapse-item v-for="item in document" :key="item" :name="item.name">
      <template #title>
        <span style="font-weight: bold"
          >&nbsp; &nbsp;
          <el-icon v-if="item.isFolder == false"><Files /></el-icon>
          <el-icon v-if="item.isFolder != false"><Folder /></el-icon>
          {{ item.name }}</span
        >
      </template>

      <main class="method">
        <div style="text-align: center">
          文件信息：
          <el-button
            @click="eclInfoDetail(item.path), (delInfoDetailOutBox = true)"
            :icon="Search"
            circle
          />
          <el-dialog
            v-model="delInfoDetailOutBox"
            title="最近一次文件修改时间"
            style="width: clamp(300px, 40vw, 800px)"
          >
            <template #default>
              <span>{{ documentDetail }}</span>
              <el-dialog
                v-model="delInfoDetailInnerBox"
                width="30%"
                title="Inner Dialog"
                append-to-body
              />
            </template>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="delInfoDetailOutBox = false">关闭</el-button>
              </div>
            </template>
          </el-dialog>
        </div>
        <div>
          下载文件：<el-button
            @click="dodowloadInfo(item.path)"
            type="info"
            :icon="Message"
            circle
          />
        </div>
        <div>
          文件命名：<el-button
            @click="renameOutBox = true"
            type="primary"
            :icon="Edit"
            circle
          />
          <el-dialog
            v-model="renameOutBox"
            title="修改文件名"
            style="width: clamp(300px, 40vw, 800px)"
          >
            <template #default>
              <el-input v-model="newname" placeholder="Please input new name" />
            </template>

            <template #footer>
              <div class="dialog-footer">
                <el-button @click="renameOutBox = false">取消修改</el-button>
                <el-button
                  type="primary"
                  @click="
                    (renameOutBox = false),
                      (renameInnerBox = true),
                      dorenameInfo(item.path, newname),
                      (newname = '')
                  "
                >
                  确认修改
                </el-button>
              </div>
            </template>
          </el-dialog>
        </div>
        <div>
          删除文件：
          <el-button
            @click="delInfoOutBox = true"
            type="danger"
            :icon="Delete"
            circle
          />
          <el-dialog
            v-model="delInfoOutBox"
            title="你是否确认删除该文件"
            style="width: clamp(300px, 40vw, 800px)"
          >
            <template #default>
              <span
                >删除操作无法撤销，为了防止重要文件错误删除请慎重考虑是否继续执行该操作
                ———— Dawson</span
              >
            </template>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="delInfoOutBox = false">取消删除</el-button>
                <el-button
                  type="primary"
                  @click="
                    (delInfoOutBox = false),
                      (delInfoInnerBox = true),
                      dodelInfo(item.path)
                  "
                >
                  确认删除
                </el-button>
              </div>
            </template>
          </el-dialog>
        </div>
      </main>
      <el-icon
        v-if="item.isFolder == true"
        @click="
          (filepath = '/' + item.path),
            eclMyDocument(filepath),
            console.log(cutpath)
        "
        ><ArrowDownBold
      /></el-icon>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">
@import "@/styles/variable.scss";

.list {
  width: 90%;
  font-weight: 600;
  overflow-y: scroll;
  .method {
    margin: 0auto;
    text-align: center;
    display: grid;
    grid-template-columns: $page-grid-cloumns;
    grid-template-rows: $page-grid-rows;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>
