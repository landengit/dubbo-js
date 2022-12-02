/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { loadCodeGenRequest } from '../util/proto'
import { join } from 'path'
import File from '../meta/FIle'
import ClientStubService from '../scene/client-stub-service'
// import { expect } from 'vitest'

describe(`basic`, () => {
  it('client demo gen', () => {
    const request = loadCodeGenRequest(
      join(__dirname, '../../src/__tests__/protobuf/DemoService.json')
    )
    const filesToGenerate = request.protoFile.map((file) => new File(file))
    for (const file of filesToGenerate) {
      let serviceItem = new ClientStubService(file)
      expect(serviceItem.getFilePath()).toMatchInlineSnapshot('"demoservice"')
      expect(serviceItem.genCode()).toMatchInlineSnapshot(`
        "export interface HelloRequest {
            name:string
        }

        export interface HelloReply {
            message:string
        }

        // generate service interface
        export interface IDemoService {
        SayHello(helloRequest: HelloRequest): Promise<HelloReply>
        }"
      `)
    }
  })

  it('all demo genTest', () => {
    let allFile = [
      'DemoService.json', //ok
      'health.json', //ok
      'DashAPICreds.json', //ok
      'reflection.json' //ok anyone 未处理
    ]

    for (const fileName of allFile) {
      const request = loadCodeGenRequest(
        join(__dirname, '../../src/__tests__/protobuf/' + fileName)
      )
      const filesToGenerate = request.protoFile.map((file) => new File(file))
      for (const file of filesToGenerate) {
        let serviceItem = new ClientStubService(file)
        expect(serviceItem.genCode()).toMatchSnapshot(fileName)
      }
    }
  })
})
