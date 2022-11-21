import { FieldDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import { basicTypeName } from '../util/types'

export default class ProtoField {
  constructor(private fieldDesc: FieldDescriptorProto) {
    debugger
  }

  get name() {
    return this.fieldDesc.name
  }

  get type() {
    return this.fieldDesc.type
  }

  get label() {
    return this.fieldDesc.label
  }

  get defaultValue(): string {
    return this.fieldDesc.defaultValue
  }

  get isRequired(): boolean {
    return !this.fieldDesc.proto3Optional
  }

  getSrcType(): string {
    // todo dong 2022/11/21  remove any;
    return basicTypeName({} as any, this.fieldDesc, {})
  }
}
