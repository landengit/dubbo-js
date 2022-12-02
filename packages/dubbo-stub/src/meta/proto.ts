import { DescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import ProtoField from './proto-field'
import ProtoEnum from './proto-enum'

export default class Proto {
  fields: ProtoField[] = []

  constructor(private protoDesc: DescriptorProto) {
    // debugger
  }

  get name() {
    return this.protoDesc.name
  }

  getEnums(): ProtoEnum[] {
    let allEnums = [
      ...this.protoDesc.enumType.map((item) => new ProtoEnum(item))
    ]

    return allEnums
  }

  getFields() {
    if (this.fields?.length > 0) {
      return this.fields
    } else {
      this.fields = this.protoDesc.field.map(
        (fieldDesc) => new ProtoField(fieldDesc)
      )
      return this.fields
    }
  }

  getNestedProtos(): Proto[] {
    // debugger
    return this.protoDesc.nestedType.map((item) => new Proto(item))
  }
}
