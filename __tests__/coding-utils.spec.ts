import CodingUtils from '../src/coding-utils'

/**
 * Mock data for tests encoding the same value.
 */
const TEST_DATA = {
    bytes: new Uint8Array([255, 254, 253, 252]),
    hex: 'ff' + 'fe' + 'fd' + 'fc',
    base58Check: 'jpUz5f99p1R',
}

test('bytesToDecimal - Large number', () => {
    // GIVEN bytes representing 2^56, which overflows the javascript runtime.
    const inputBytes = new Uint8Array(8)
    inputBytes[0] = 1

    // WHEN it is converted to a decimal
    const output = CodingUtils.bytesToDecimal(inputBytes)

    // THEN it is the expected output.
    const expected = 2n ** 56n
    expect(output).toEqual(expected)
})

test('bytesToDecimal - Small number', () => {
    // GIVEN bytes representing a number which will not overflow in the Javascript runtime.
    const inputBytes = new Uint8Array([1, 2, 3])

    // WHEN it is converted to a decimal
    const output = CodingUtils.bytesToDecimal(inputBytes)

    // THEN it is the expected output.
    const expected = BigInt(66051)
    expect(output).toEqual(expected)
})

test('base58CheckDecode', () => {
    // GIVEN a base58check string WHEN it is decoded THEN it decodes as expected.
    expect(CodingUtils.base58CheckDecode(TEST_DATA.base58Check)).toEqual(
        TEST_DATA.bytes,
    )
})

test('base58CheckEncode', function () {
    // GIVEN some input bytes and a prefix.
    const prefix = TEST_DATA.bytes.slice(0, 1)
    const bytes = TEST_DATA.bytes.slice(1)

    // WHEN they are base58check encoded
    const encoded = CodingUtils.base58CheckEncode(prefix, bytes)

    // THEN they encoded as expected.
    expect(encoded).toEqual(TEST_DATA.base58Check)
})

test('mergeBytes', function () {
    // GIVEN two hex strings.f
    const hex1 = '0001020304'
    const hex2 = '0506070809'

    // WHEN they are merged
    const bytes1 = CodingUtils.hexToBytes(hex1)
    const bytes2 = CodingUtils.hexToBytes(hex2)
    const merged = CodingUtils.mergeBytes(bytes1, bytes2)

    // THEN the result is the concatenation of the two inputs
    const expected = CodingUtils.hexToBytes(`${hex1}${hex2}`)
    expect(merged).toEqual(expected)
})

test('hexToBytes', function () {
    // GIVEN some hex WHEN it is encoded to bytes THEN it encodes as expected.
    expect(CodingUtils.hexToBytes(TEST_DATA.hex)).toEqual(TEST_DATA.bytes)
})

test('bytesToHex', function () {
    // GIVEN some bytes WHEN they are encoded to hex THEN they encode as expected.
    expect(CodingUtils.bytesToHex(TEST_DATA.bytes)).toEqual(TEST_DATA.hex)
})

test('isHex - Valid Hex', function () {
    // GIVEN valid hex WHEN it is validated THEN it is reported as such.
    expect(CodingUtils.isHex('1234567890abcdefABCDEF')).toBeTruthy()
})

test('isHex - Invalid Hex', function () {
    // GIVEN invalid hex WHEN it is validated THEN it is reported as such.
    expect(CodingUtils.isHex('abcdefghijkl')).toBeFalsy()
})
