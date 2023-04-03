import { Tag } from "./Tag";

export interface File {
  '.tag': Tag,
  name: string,
  path_lower: string,
  path_display: string,
  id: string,
  client_modified: Date,
  server_modified: Date,
  rev: string,
  size: number,
  is_downloadable: boolean,
  content_hash: string,
}