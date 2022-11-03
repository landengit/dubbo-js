#!/usr/bin/env bash

# Generates TS objects of the protoc plugin descriptors, which ts-proto
# uses to understand the incoming protoc codegen request objects.

#  --plugin=./node_modules/ts-proto/protoc-gen-ts_proto \

protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=. \
  --ts_proto_opt=exportCommonSymbols=false,unknownFields=true,usePrototypeForDefaults=true \
  ./google/protobuf/descriptor.proto \
  ./google/protobuf/compiler/plugin.proto

#./node_modules/.bin/tsc -p tsconfig.json


