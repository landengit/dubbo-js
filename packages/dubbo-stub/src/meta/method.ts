import { MethodDescriptorProto } from 'ts-proto-descriptors'

export default class Method {
  constructor(private methodDesc: MethodDescriptorProto) {}

  get name() {
    return this.methodDesc.name
  }

  get inputType(): string {
    let parts = this.methodDesc.inputType.split('.')
    return parts[parts.length - 1]
  }

  get outputType(): string {
    let parts = this.methodDesc.outputType.split('.')
    return parts[parts.length - 1]
  }
}
