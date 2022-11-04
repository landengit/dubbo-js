import { CodeGeneratorRequest } from 'ts-proto-descriptors/dist/google/protobuf/compiler/plugin'
import { readJsonFile, writeJsonFile } from 'nx/src/utils/fileutils'

export function dumpCodeGenRequest(
  path: string,
  request: CodeGeneratorRequest
) {
  writeJsonFile(path, CodeGeneratorRequest.toJSON(request) as any, {
    spaces: 2
  })
}

/**
 * load buffer from file
 * @param jsonPath
 */
export function loadCodeGenRequest(jsonPath: string): CodeGeneratorRequest {
  let jsonRequest = readJsonFile(jsonPath)
  return CodeGeneratorRequest.fromJSON(jsonRequest)
}
