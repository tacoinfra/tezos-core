/**
 * Constants used for prefixes.
 */
const prefix = {
  /** Public Key Prefixes. */
  PUBLIC_KEY_SECP265K1: new Uint8Array([3, 254, 226, 86]), // sppk

  /** Public Key Hash Prefixes. */
  PUBLIC_KEY_HASH_SECP256K1: new Uint8Array([6, 161, 161]), // tz2

  /** Secret Key Prefixes  */
  SECRET_KEY_ED22519: new Uint8Array([43, 246, 78, 7]), // edsk

  /** Prefix for a secp256k1 signature. */
  SIGNATURE_SECP256K1: new Uint8Array([13, 115, 101, 19, 63]), // spsig

  /** Misc */
  CHAIN_ID: new Uint8Array([87, 82, 0]), // Net
  SMART_CONTRACT_ADDRESS: new Uint8Array([2, 90, 121]), // KT1
}

export default prefix
