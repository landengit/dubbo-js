import {
  EnumDescriptorProto,
  FieldDescriptorProto
} from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import { basicTypeName } from '../util/types'

export default class ProtoEnum {
  constructor(private enumDesc: EnumDescriptorProto) {
    debugger
  }

  // field name
  get name() {
    return this.enumDesc.name
  }

  get values(): {
    name: string
    number: number
    options: any // todo dong 2022/11/27  处理此处any
  }[] {
    return this.enumDesc.value
  }
}
