import type {
  CreateInfo,
  DelInfo,
  DocumentInfo,
  GetInfoDetail,
  RenameInfo,
  UpLoadInfo,
} from "./models";
export interface Api {
  request: any;
  response: any;
}

export interface ApiResponse<Data> {
  payload: Data;
  err: string | null;
  msg: string | null;
}

export interface GetDocumentsApi extends Api {
  request: null;
  response: ApiResponse<Array<DocumentInfo>>;
}
export interface DeleteDocumentApi extends Api {
  request: null;
  response: ApiResponse<DelInfo>;
}

export interface RenmaeDocumentApi extends Api {
  request: null;
  response: ApiResponse<RenameInfo>;
}

export interface GetDocumentDetailApi extends Api {
  request: null;
  response: ApiResponse<GetInfoDetail>;
}

export interface CreateFilesApi extends Api {
  request: null;
  response: ApiResponse<CreateInfo>;
}

export interface UPLoadFilesApi extends Api {
  request: null;
  response: ApiResponse<UpLoadInfo>;
}
