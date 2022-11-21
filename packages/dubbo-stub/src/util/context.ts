import { TypeMap } from './types'
import { Options } from './options'

/** Provides a parameter object for passing around the various context/config data. */
export interface Context {
  options: Options
  typeMap: TypeMap
  // todo dong 2022/11/21
  utils: any
}
