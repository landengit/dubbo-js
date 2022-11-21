import { DescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import ProtoField from './proto-field'

export default class Proto {
  fields: ProtoField[] = []

  constructor(private protoDesc: DescriptorProto) {
    debugger
  }

  get name() {
    return this.protoDesc.name
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
}
