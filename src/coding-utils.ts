/** Some dependencies are JS only and are untyped. */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

// Following libraries do not include .d.ts files.
/* eslint-disable @typescript-eslint/no-var-requires */
const base58Check = require('bs58check')
/* eslint-enable @typescript-eslint/no-var-requires */

/** Common encoding functions. */
const CodingUtils = {
  /**
   * Parse the given bytes to an arbitrarily large decimal.
   *
   * @param bytes The input bytes to parse.
   * @returns The input bytes as a decimal.
   */
  bytesToDecimal(bytes: Uint8Array): BigInt {
    const hex = this.bytesToHex(bytes)
    return BigInt(`0x${hex}`)
  },

  /**
   * Decode the given base58check input.
   *
   * @param input A base58check encoded string.
   * @returns The underlying bytes.
   */
  base58CheckDecode(input: string): Uint8Array {
    const buffer: Buffer = base58Check.decode(input)
    return Uint8Array.from(buffer)
  },

  /**
   * Base58Check encode the given bytes with the given prefix.
   *
   * @param prefix A prefix to prepend to the bytes.
   * @param bytes The bytes to encode.
   * @return A base58check encoded string.
   */
  base58CheckEncode(prefix: Uint8Array, bytes: Uint8Array): string {
    const prefixedBytes = this.mergeBytes(prefix, bytes)
    return base58Check.encode(prefixedBytes)
  },

  /**
   * Merge the given bytes.
   */
  mergeBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
    const merged = new Uint8Array(a.length + b.length)
    merged.set(a)
    merged.set(b, a.length)

    return merged
  },

  /**
   * Check if the given string is valid hex.
   *
   * @param input The input to check.
   * @returns true if the input is valid hex, otherwise false.
   */
  isHex(input: string): boolean {
    const hexRegEx = /([0-9]|[a-f])/gim
    return (input.match(hexRegEx) || []).length === input.length
  },

  /**
   * Convert the given hex string to bytes.
   */
  hexToBytes(hex: string): Uint8Array {
    if (!this.isHex(hex)) {
      throw new Error(`Invalid hex${hex}`)
    }

    return Uint8Array.from(Buffer.from(hex, 'hex'))
  },

  /**
   * Convert the given bytes to hex.
   */
  bytesToHex(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString('hex')
  },
}

export default CodingUtils
