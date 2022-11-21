# 目标

# 使用场景

# 环境准备

## 安装 Protocol Buffer Compiler

MacOS, using Homebrew:

```bash
$ brew install protobuf
$ protoc --version  # Ensure compiler version is 3+
```

# 操作步骤

```bash
protoc --plugin=./protoc-scene-dubbojs_proto --ts_proto_out=. ./simple.proto
protoc --plugin=/usr/local/bin/protoc-scene-dubbojs --ts_proto_out=. ./simple.proto
```

# Todo

- [x] prototype json ast 提取逻辑 -- 晓东
- [x] prototype 用例测试 -- 晓东
- [x] 封装 ast 操作，包含领域对象 File、Method、Service、Message、其他 -- 晓东
- [ ] cli 命令行工具封装;(input：pb 文件，output：源码文件)
- [x] 新增加 MockPb 文件； -- 晓东
- [ ] 定义 stub 的服务接口标准
  - [x] interface 接口 -- 晓东
  - [] invoke 代码逻辑
- [ ] client 代码生成对接
  - [ ] stubClient 代码格式对接,确定示例；
  - [ ] stubClient 底层逻辑处理对接；
  - [ ] 代码格式化；
  - [ ] invoke 转换逻辑对接；
- [ ] server 代码生成对接
