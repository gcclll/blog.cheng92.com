import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export const enum NodeTypes {
  ROOT, // 根节点
  TEXT, // pure text
  PROPERTY, // #+...
  HEADER, // ** ...
  HEADER_PROPERTIES,
  BLOCK, // #+begin...#+end
  TEXT_BLOCK, // non-src blocks, eg. example, textbox
  EMPHASIS, // =,_,/,+,$,[!&%@]{2}
  LIST, // - [-], 1. ...
  TIMESTAMP, // <2022-11-12 Wed 12:00>

  // 各称链接
  EXTERNAL_LINK, // [[url][name]]
  INNER_LINK, // <<meta_id>>

  STATE, // TODO, DONE, etc.
}
