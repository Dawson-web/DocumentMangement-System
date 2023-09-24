import { apiConfig } from "@/config";
import axios from "axios";
import { ref } from "vue";
import type {
  DeleteDocumentApi,
  GetDocumentDetailApi,
  GetDocumentsApi,
  RenmaeDocumentApi,
} from "./type";
const document = ref<GetDocumentsApi["response"]["payload"] | null>(null);
const documentDetail = ref<GetDocumentDetailApi["response"]["payload"] | null>(
  null
);

const client = axios.create({
  baseURL: apiConfig.apiAddr,
  timeout: 5000,
});

export async function refreshMyDocument(path: string) {
  try {
    const res = await axios.get<GetDocumentsApi>(
      `http://${apiConfig.apiAddr}/${path}?action=list&key=${apiConfig.key}`
    );

    document.value = res.data.payload;
    return res.data.payload;
  } catch (err) {
    console.log(err);
  }
}

//删除文件
export async function dodelInfo(path: string) {
  async function doRequestWithDelInfo() {
    try {
      const res = await axios.get<DeleteDocumentApi>(
        `http://${apiConfig.apiAddr}/${path}/?action=del&key=${apiConfig.key}`
      );
      await refreshMyDocument();
      location.reload(); //采用刷新页面实现重载
    } catch (err) {
      console.log(err);
    }
  }
  await doRequestWithDelInfo();
}

//文件重命名
export async function dorenameInfo(path: string, newname: string) {
  async function doRequestWithRenameInfo() {
    try {
      const res = await axios.get<RenmaeDocumentApi>(
        `http://${apiConfig.apiAddr}/${path}?action=rename&new=${newname}&key=${apiConfig.key}`
      );
      await refreshMyDocument();
      location.reload(); //采用刷新页面实现重载
    } catch (err) {
      console.log(err);
    }
  }
  await doRequestWithRenameInfo();
}

//下载文件
export async function dodowloadInfo(path: string) {
  async function doRequestWithRenameInfo() {
    try {
      const res = await axios.get<RenmaeDocumentApi>(
        `http://${apiConfig.apiAddr}/${path}?action=get&key=${apiConfig.key}`
      );
      await refreshMyDocument();
      location.reload(); //采用刷新页面实现重载
      console.log("下载成功");
    } catch (err) {
      console.log(err);
    }
  }
  await doRequestWithRenameInfo();
}

// 获取文件信息
export async function dogetInfoDetail(path: string) {
  try {
    const res = await axios.get<GetDocumentDetailApi>(
      `http://${apiConfig.apiAddr}/${path}?action=info&key=${apiConfig.key}`
    );
    documentDetail.value = res.data.payload.modTime;
    return res.data.payload.modTime;
  } catch (err) {
    console.log(err);
  }
}
