# Injective Name Service Contracts

Test with:

```
cargo unit-test
cargo integration-test
```

Compile:

```
RUSTFLAGS='-C link-arg=-s' cargo wasm
cp ../../target/wasm32-unknown-unknown/release/cw1_subkeys.wasm .
ls -l cw1_subkeys.wasm
sha256sum cw1_subkeys.wasm
```

Production-ready (compressed) build:

```
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.8
```

Windows variant:

```
docker run --rm -v ${pwd}:/code `
 --mount type=volume,source="$("$(Split-Path -Path $pwd -Leaf)")_cache",target=/code/target `
 --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry `
 cosmwasm/rust-optimizer:0.12.8
```

The optimized contracts are generated in the artifacts/ directory.
