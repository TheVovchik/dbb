import { Tag } from "./Tag";

export interface Folder {
  '.tag': Tag,
  name: 'string',
  path_lower: string,
  path_display: string,
  id: string,
}