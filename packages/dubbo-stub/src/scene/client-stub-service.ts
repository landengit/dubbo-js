import File from '../meta/FIle'
import Proto from '../meta/proto'
import Service from '../meta/service'
import Method from '../meta/method'
import { lowerFirst } from '../util/utils'
import { EnumDescriptorProto } from 'ts-proto-descriptors/dist/google/protobuf/descriptor'
import ProtoEnum from '../meta/proto-enum'

export default class ClientStubService {
  constructor(private fileMeta: File) {}

  /**
   * get service file path;
   */
  getFilePath() {
    return this.fileMeta.package
  }

  genCode(): string {
    let chunks: string[] = genProtoTypes(this.fileMeta)
    chunks.push(...genEnums(this.fileMeta.getEnums()))
    chunks.push(...genServices(this.fileMeta))
    debugger
    return chunks.join('\n\n')
  }
}

function genServices(fileMeta: File): string[] {
  return fileMeta.getServices().map((serviceItem) => genService(serviceItem))
}
function genService(serviceItem: Service) {
  return `// generate service interface
export interface I${serviceItem.name} {
${serviceItem.getMethods().map(genMethod).join('\n\n')}
}`
}

function genMethod(methodItem: Method) {
  // todo dong 2022/11/21  备注加起来；
  return `${methodItem.name}(${lowerFirst(methodItem.inputType)}: ${
    methodItem.inputType
  }): Promise<${methodItem.outputType}>`
}

function genProtoTypes(fileMeta: File): string[] {
  return fileMeta.getProtos().map((protoItem) => genProtoType(protoItem))
}
function genProtoType(proto: Proto) {
  let fields = proto
    .getFields()
    .map(
      (field) =>
        `${field.name}${field.isRequired ? '' : '?'}:${field.getSrcType()}`
    )
  // todo dong 2022/11/21  字段注释添加进来；
  // todo dong 2022/11/21  interface 注释添加进来；
  return `export interface ${proto.name} {
    ${fields.join('\n\n')}
}`
}

function genEnums(enums: ProtoEnum[]): string[] {
  return enums.map(genEnum)
}

function genEnum(enumItem: ProtoEnum) {
  return ` export enum ${enumItem.name} {
  UNKNOWN = 0,
  SERVING = 1,
  NOT_SERVING = 2,
  SERVICE_UNKNOWN = 3
}
`
}
