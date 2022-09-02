/**
 * 根据主题定义不同的 tailwind css 方案
 * @fileOverview
 * @name index.ts<class-names>
 * @author Zhicheng Lee <gccll.love@gmail.com>
 * @license MIT
 */

import defaultTwCss from '~/classnames/default'

export function useClassNames(key: string)  {
  // TODO get theme for different css plan

  const css = defaultTwCss

  const get = (key: string) => (css as any)[key]

  if (key && get(key))
    return get(key)

  return [css, get]
}
