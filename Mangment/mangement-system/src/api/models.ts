export interface DocumentInfo {
  name: string;
  path: string;
  isFolder: boolean;
}

export interface DelInfo {
  payload: null;
}

export interface RenameInfo {
  payload: null;
}

export interface GetInfoDetail {
  payload: {
    modTime: string;
  };
}

export interface CreateInfo {
  payload: null;
}

export interface UpLoadInfo {
  payload: null;
}
