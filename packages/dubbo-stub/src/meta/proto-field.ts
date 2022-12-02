import { FieldDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import { basicTypeName } from '../util/types'

export default class ProtoField {
  constructor(private fieldDesc: FieldDescriptorProto) {
    // debugger
  }

  // field name
  get name() {
    return this.fieldDesc.name
  }

  // field type
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

  get isEnum(): boolean {
    return this.fieldDesc.type === 14
  }

  get isCustomType(): boolean {
    return this.fieldDesc.type === 11
  }

  getEnumName() {
    let parts = this.fieldDesc.typeName.split('.')
    return parts[parts.length - 1]
  }

  getCustomTypeName() {
    let parts = this.fieldDesc.typeName.split('.')
    return parts[parts.length - 1]
  }

  getSrcType(): string {
    // todo dong 2022/11/21  remove any;
    if (this.name === 'urls') {
      debugger
    }
    try {
      if (this.isEnum) {
        //enum
        return `${this.getEnumName()}`
      } else if (this.isCustomType) {
        // customType
        return `${this.getCustomTypeName()}`
      } else {
        //basic type；
        return basicTypeName({} as any, this.fieldDesc, {})
      }
    } catch (e) {
      console.log(`fetch ${this.name} `)
      throw e
    }
  }
}
