#!/usr/bin/env node

import { promisify } from 'util'
import { readToBuffer } from './util'
import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  FileDescriptorProto
} from 'ts-proto-descriptors'

async function main() {
  const stdin = await readToBuffer(process.stdin)
  const request = CodeGeneratorRequest.decode(stdin)

  const filesToGenerate = request.protoFile
  const files = await Promise.all(
    filesToGenerate.map(async (fileDesc) => {
      const suffix = `.ts`
      const moduleName = fileDesc.name.replace('.proto', suffix)
      // todo dong 2022/11/3  追加生成逻辑
      return { name: moduleName, content: `hello` }
    })
  )

  const response = CodeGeneratorResponse.fromPartial({
    file: files,
    supportedFeatures: CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL
  })
  const buffer = CodeGeneratorResponse.encode(response).finish()
  const write = promisify(
    process.stdout.write as (buffer: Buffer) => boolean
  ).bind(process.stdout)
  await write(Buffer.from(buffer))
}
// import {readToBuffer} from "./util";
// import { prefixDisableLinter, protoFilesToGenerate, readToBuffer } from "./utils";
// import { generateFile, makeUtils } from "./main";
// import { createTypeMap } from "./types";
// import { Context } from "./context";
// import { getTsPoetOpts, optionsFromParameter } from "./options";
// import { generateTypeRegistry } from "./generate-type-registry";
// console.log('hello ');
// // this would be the plugin called by the protoc compiler
// async function main() {
//   const stdin = await readToBuffer(process.stdin);
//   // const json = JSON.parse(stdin.toString());
//   // const request = CodeGeneratorRequest.fromObject(json);
//   console.log(stdin.toString());
//   // const request = CodeGeneratorRequest.decode(stdin);
//   //
//   // const options = optionsFromParameter(request.parameter);
//   // const typeMap = createTypeMap(request, options);
//   // const utils = makeUtils(options);
//   // const ctx: Context = { typeMap, options, utils };
//   //
//   // const filesToGenerate = options.emitImportedFiles ? request.protoFile : protoFilesToGenerate(request);
//   // const files = await Promise.all(
//   //   filesToGenerate
//   //     .filter((file) => !options.M[file.name])
//   //     .map(async (file) => {
//   //       const [path, code] = generateFile(ctx, file);
//   //       const content = code.toString({ ...getTsPoetOpts(options), path });
//   //       return { name: path, content };
//   //     })
//   // );
//   //
//   // if (options.outputTypeRegistry) {
//   //   const utils = makeUtils(options);
//   //   const ctx: Context = { options, typeMap, utils };
//   //
//   //   const path = "typeRegistry.ts";
//   //   const code = generateTypeRegistry(ctx);
//   //
//   //   const content = code.toString({ ...getTsPoetOpts(options), path });
//   //   files.push({ name: path, content });
//   // }
//   //
//   // const response = CodeGeneratorResponse.fromPartial({
//   //   file: files,
//   //   supportedFeatures: CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL,
//   // });
//   // const buffer = CodeGeneratorResponse.encode(response).finish();
//   // const write = promisify(process.stdout.write as (buffer: Buffer) => boolean).bind(process.stdout);
//   // await write(Buffer.from(buffer));
// }

main()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    process.stderr.write('FAILED!')
    process.stderr.write(e.message)
    process.stderr.write(e.stack)
    process.exit(1)
  })
