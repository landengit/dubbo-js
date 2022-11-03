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
protoc --plugin=./protoc-gen-dubbojs_proto --ts_proto_out=. ./simple.proto
protoc --plugin=/usr/local/bin/protoc-gen-dubbojs --ts_proto_out=. ./simple.proto
```

# Todo

- [ ] Ast 代码生成对接
  - [ ] stubClient 代码格式对接,确定示例；
  - [ ] stubClient 底层逻辑处理对接；
- [ ] prototype bin 提取逻辑
- [ ] prototype 用例测试
