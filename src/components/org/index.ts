import OrgBlockComp from './OrgBlockComp.vue'
import OrgHeaderComp from './OrgHeaderComp.vue'
import OrgTextComp from './OrgTextComp.vue'
import OrgTableComp from './OrgTableComp.vue'

import { OrgNodeTypes } from '~/utils/parser'

export const components = () => ({
  [OrgNodeTypes.TEXT]: OrgTextComp,
  [OrgNodeTypes.HEADER]: OrgHeaderComp,
  [OrgNodeTypes.BLOCK]: OrgBlockComp,
  [OrgNodeTypes.TABLE]: OrgTableComp,
})
