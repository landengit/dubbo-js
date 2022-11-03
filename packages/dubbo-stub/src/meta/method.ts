import { MethodDescriptorProto } from 'ts-proto-descriptors'

export default class Method {
  constructor(private methodDesc: MethodDescriptorProto) {}

  get name() {
    return this.methodDesc.name
  }

  /**
   * 生成方法代码
   */
  genCode(): string {
    return `${this.name}(): void;`
  }
}
