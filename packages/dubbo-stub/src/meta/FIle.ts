import { FileDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import Service from './service'

export default class File {
  constructor(private fileDesc: FileDescriptorProto) {}

  private services: Service[] = []

  /**
   * get all Services
   */
  getServices() {
    if (this.services?.length > 0) {
      return this.services
    } else {
      this.services = this.fileDesc.service.map(
        (serviceDesc) => new Service(serviceDesc)
      )
    }
  }

  get path(): string {
    return this.fileDesc.name
  }

  /**
   * 生成代码
   */
  genCode(): { name: string; content: string } {
    // todo dong 2022/11/3  配置抽取；
    const suffix = `.ts`
    // console.log(this.fileDesc.name, this.fileDesc.package)
    const moduleName = this.fileDesc.name.replace('.proto', suffix)
    // todo dong 2022/11/3  追加生成逻辑
    return { name: moduleName, content: `hello` }
  }
}
