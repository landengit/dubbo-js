import { FileDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import Service from './service'
import Proto from './proto'

export default class File {
  constructor(private fileDesc: FileDescriptorProto) {}

  get package() {
    return this.fileDesc.package
  }

  private services: Service[] = []

  private protos: Proto[] = []

  /**
   * get all Services
   */
  getServices(): Service[] {
    if (this.services?.length > 0) {
      return this.services
    } else {
      this.services = this.fileDesc.service.map(
        (serviceDesc) => new Service(serviceDesc)
      )
      return this.services
    }
  }

  getProtos(): Proto[] {
    if (this.protos?.length > 0) {
      return this.protos
    } else {
      this.protos = this.fileDesc.messageType.map(
        (messageType) => new Proto(messageType)
      )
      return this.protos
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
