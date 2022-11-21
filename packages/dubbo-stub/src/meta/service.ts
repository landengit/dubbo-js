import { ServiceDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import Method from './method'

export default class Service {
  constructor(private serviceDesc: ServiceDescriptorProto) {}

  private methods: Method[] = []

  get name() {
    return this.serviceDesc.name
  }

  getMethods() {
    if (this.methods.length > 0) {
      return this.methods
    } else {
      this.methods = this.serviceDesc.method.map(
        (methodDesc) => new Method(methodDesc)
      )
      return this.methods
    }
  }
}
