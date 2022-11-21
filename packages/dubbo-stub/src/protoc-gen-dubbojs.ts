#!/usr/bin/env node

import { promisify } from 'util'
import { readToBuffer } from './util'
import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature
} from 'ts-proto-descriptors'
import File from './meta/FIle'
import { dumpCodeGenRequest } from './util/proto'

async function main() {
  const stdin = await readToBuffer(process.stdin)
  const request = CodeGeneratorRequest.decode(stdin)
  dumpCodeGenRequest('DemoService.json', request)
  const filesToGenerate = request.protoFile.map((file) => new File(file))

  const files = await Promise.all(
    filesToGenerate.map((fileDesc) => {
      return fileDesc.genCode()
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
