import type { GetDocumentsApi } from '@/api/type.ts'
import { apiConfig } from '@/config'
import axios from 'axios'
import { ref } from 'vue'
const document = ref<GetDocumentsApi['response']['payload'] | null>(null)
export const DocumentStore = async () => {
  async function refreshMyDocument() {
    try {
      const res = await axios.get<GetDocumentsApi>(
        `http://${apiConfig.apiAddr}/?action=list&key=${apiConfig.key}`
      )
      document.value = res.data.payload
    } catch (err) {
      console.log(err)
    }
  }
  await refreshMyDocument()
  return document
}
