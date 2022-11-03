import { ServiceDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import Method from './method'

export default class Service {
  constructor(private serviceDesc: ServiceDescriptorProto) {}

  private methods: Method[] = []

  getMethods() {
    if (this.methods) {
      return this.methods
    } else {
      this.methods = this.serviceDesc.method.map(
        (methodDesc) => new Method(methodDesc)
      )
    }
  }

  /**
   * 生成方法代码
   */
  genCode(): string {
    return this.methods.map((item) => item.genCode()).join('\n')
  }
}
