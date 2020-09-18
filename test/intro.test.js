const { graphql } = require('graphql')
// const TFcontract = require('truffle-contract')
const TFcontract = require('@truffle/contract')
const MetaCoinArtifact = require('../build/contracts/MetaCoin')
const MetaCoinContract = TFcontract(MetaCoinArtifact)
const Web3 = require('web3')

MetaCoinContract.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))
const contractOwner = '0x8B5D608836459Ddb0725C64036569c7630a82FBF' // 0 address with mneonic of "lol dude" in ganache

const { genGraphQlProperties } = require('../lib/index')
const { schema, rootValue } = genGraphQlProperties({ artifact: MetaCoinArtifact, contract: MetaCoinContract })

it('should successfully query a public uint value', async () => {
  const query = `
    query {
      publicUint {
        uint256_0 {
          string
          int
        }
      }
    }
  `
  const result = await graphql(schema, query, rootValue)
  expect(result.data).toEqual({
    'publicUint': {
      'uint256_0': {
        'string': '6',
        'int': 6
      }
    }
  })
})

it('should successfully query a source string value', async () => {
  const query = `
    query {
      source {
        string_0
      }
    }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(result)
  expect(result.data).toEqual({
    'source': {
      'string_0': 'source'
    }
  })
})

it('should successfully query getBalance', async () => {
  const query = `
  query {
    getBalance(addr: "0x7b2c6c6e9026bcef8df4df3ff888b72b018f0e8a") {
      uint256_0 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  expect(result.data).toEqual({
    'getBalance': {
      'uint256_0': {
        'string': '0',
        'int': 0
      }
    }
  })
})

it('should successfully query getBalanceInEth', async () => {
  const query = `
  query {
    getBalanceInEth(addr: "0x7b2c6c6e9026bcef8df4df3ff888b72b018f0e8a") {
      uint256_0 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'getBalanceInEth': {
      'uint256_0': {
        'string': '0',
        'int': 0
      }
    }
  })
})

it('should successfully query returns3 with multiple outputs', async () => {
  const query = `
  query {
    returns3 {
      string_0
      bytes32_1 {
        raw
        decoded
      }
      uint256_2 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returns3': {
      'string_0': 'hey',
      'bytes32_1': {
        'raw': '0x0000000000000000000000000000000000000000000000000000000000000011',
        'decoded': '\u0011'
      },
      'uint256_2': {
        'string': '600',
        'int': 600
      }
    }
  })
})

it('should successfully query returns2 with multiple inputs/outputs', async () => {
  const query = `
  query {
    returns2(addr: "0x7b2c6c6e9026bcef8df4df3ff888b72b018f0e8d" num: 1) {
      bool_1
      uint256_0 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result.data, null, 2))
  expect(result.data).toEqual({
    'returns2': {
      'bool_1': true,
      'uint256_0': {
        'string': '0',
        'int': 0
      }
    }
  })
})

it('should successfully query returnsSingleUint8', async () => {
  const query = `
  query {
    returnsSingleUint8 {
      uint8_0 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result.data, null, 2))
  expect(result.data).toEqual({
    'returnsSingleUint8': {
      'uint8_0': {
        'string': '11',
        'int': 11
      }
    }
  })
})

it('should successfully query returnsNamedInt', async () => {
  const query = `
  query {
    returnsNamedInt {
      twelve {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result.data, null, 2))
  expect(result.data).toEqual({
    'returnsNamedInt': {
      'twelve': {
        'string': '12',
        'int': 12
      }
    }
  })
})

it('should successfully query returnsMixedNamedInt', async () => {
  const query = `
  query {
    returnsMixedNamedInt {
      num {
        string
        int
      }
      uint32_1 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result.data, null, 2))
  expect(result.data).toEqual({
    'returnsMixedNamedInt': {
      'num': {
        'string': '13',
        'int': 13
      },
      'uint32_1': {
        'string': '14',
        'int': 14
      }
    }
  })
})

it('should successfully query returnsaddress', async () => {
  const query = `
  query {
    returnsaddress {
      address_0
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result.data, null, 2))
  expect(result.data).toEqual({
    'returnsaddress': {
      'address_0': contractOwner
    }
  })
})

it('should successfully query returnsEnum', async () => {
  const query = `
  query {
    returnsEnum {
      int256_0 {
        string
        int
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returnsEnum': {
      'int256_0': {
        'string': '3',
        'int': 3
      }
    }
  })
})

it('should successfully query returnsArrayInt', async () => {
  const query = `
  query {
    returnsArrayInt {
      uint256Arr_0 {
        string
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returnsArrayInt': {
      'uint256Arr_0': [
        {
          'string': '2'
        }, {
          'string': '5'
        }
      ]
    }
  })
})

it('should successfully query returnsArrayAddresses', async () => {
  const query = `
  query {
    returnsArrayAddresses {
      addressArr_0
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returnsArrayAddresses': {
      'addressArr_0': [
        '0x0000000000000000000000000000000000000004',
        '0x0000000000000000000000000000000000000007',
        '0x0000000000000000000000000000000000000009'
      ]
    }
  })
})

it('should successfully query returnsArrayBytes', async () => {
  const query = `
  query {
    returnsArrayBytes {
      bytes32Arr_0 {
        decoded
        raw
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returnsArrayBytes': {
      'bytes32Arr_0': [
        {
          'decoded': 'uno',
          'raw': '0x756e6f0000000000000000000000000000000000000000000000000000000000'
        },
        {
          'decoded': 'dos',
          'raw': '0x646f730000000000000000000000000000000000000000000000000000000000'
        },
        {
          'decoded': 'tres',
          'raw': '0x7472657300000000000000000000000000000000000000000000000000000000'
        }
      ]
    }
  })
})

it('should successfully query returnsSingleByte32', async () => {
  const query = `
  query {
    returnsSingleByte32 {
      bytes32_0 {
        decoded
        raw
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returnsSingleByte32': {
      'bytes32_0': {
        'decoded': 'hello',
        'raw': '0x68656c6c6f000000000000000000000000000000000000000000000000000000'
      }
    }
  })
})

it('should successfully query returnsOnlyArrays', async () => {
  const query = `
  query {
    returnsOnlyArrays {
      int256Arr_0 {
        string
      }
      addressArr_1
      bytes32Arr_2 {
        decoded
        raw
      }
    }
  }
  `
  const result = await graphql(schema, query, rootValue)
  // console.log(JSON.stringify(result, null, 2))
  expect(result.data).toEqual({
    'returnsOnlyArrays': {
      'int256Arr_0': [
        {
          'string': '2'
        }, {
          'string': '5'
        }, {
          'string': '8'
        }
      ],
      'addressArr_1': [
        '0x0000000000000000000000000000000000000004',
        '0x0000000000000000000000000000000000000007',
        '0x0000000000000000000000000000000000000009'
      ],
      'bytes32Arr_2': [
        {
          'decoded': 'uno',
          'raw': '0x756e6f0000000000000000000000000000000000000000000000000000000000'
        },
        {
          'decoded': 'dos',
          'raw': '0x646f730000000000000000000000000000000000000000000000000000000000'
        },
        {
          'decoded': 'tres',
          'raw': '0x7472657300000000000000000000000000000000000000000000000000000000'
        }
      ]
    }
  })
})
