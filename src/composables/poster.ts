import axios from 'axios'
import { baseParse as parse, type OrgRootNode } from '~/utils/parser'

// x.org 文件解析后的AST缓存
const cachedPosterAST: Record<string, OrgRootNode> = {}

export async function usePoster(filename: string): Promise<OrgRootNode | null> {
  const cached = cachedPosterAST[filename]

  if (cached) return cached

  const { status, data } = await axios.get<string>(`/posts/${filename}.org`)

  if (status !== 200 || !data) return null

  const ast = parse(data)

  cachedPosterAST[filename] = ast

  return ast
}
