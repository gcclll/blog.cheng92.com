import OrgBlockComp from './OrgBlockComp.vue'
import OrgHeaderComp from './OrgHeaderComp.vue'
import OrgTextComp from './OrgTextComp.vue'
import OrgTableComp from './OrgTableComp.vue'
import OrgSubSupComp from './OrgSubSupComp.vue'
import OrgEmphasisComp from './OrgEmphasisComp.vue'
import OrgStateWordComp from './OrgStateWordComp.vue'
import OrgColorTextComp from './OrgColorTextComp.vue'
import OrgListComp from './OrgListComp.vue'
import OrgBadgeComp from './OrgBadgeComp.vue'
import OrgTimestampComp from './OrgTimestampComp.vue'

import { OrgNodeTypes } from '~/utils/parser'

export const components = () => ({
  [OrgNodeTypes.TEXT]: OrgTextComp,
  [OrgNodeTypes.HEADER]: OrgHeaderComp,
  [OrgNodeTypes.BLOCK]: OrgBlockComp,
  [OrgNodeTypes.TABLE]: OrgTableComp,
  [OrgNodeTypes.SUB_SUP]: OrgSubSupComp,
  [OrgNodeTypes.EMPHASIS]: OrgEmphasisComp,
  [OrgNodeTypes.STATE]: OrgStateWordComp,
  [OrgNodeTypes.COLORFUL_TEXT]: OrgColorTextComp,
  [OrgNodeTypes.LIST]: OrgListComp,
  [OrgNodeTypes.BADGE]: OrgBadgeComp,
  [OrgNodeTypes.TIMESTAMP]: OrgTimestampComp,
})
