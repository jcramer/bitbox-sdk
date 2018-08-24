import axios from 'axios';
class Util {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async validateAddress(address) {
    // Return information about the given bitcoin address.
    //
    // Arguments:
    // 1. "address"     (string, required) The bitcoin address to validate
    //
    // Result:
    // {
    //   "isvalid" : true|false,       (boolean) If the address is valid or not. If not, this is the only property returned.
    //   "address" : "address", (string) The bitcoin address validated
    //   "scriptPubKey" : "hex",       (string) The hex encoded scriptPubKey generated by the address
    //   "ismine" : true|false,        (boolean) If the address is yours or not
    //   "iswatchonly" : true|false,   (boolean) If the address is watchonly
    //   "isscript" : true|false,      (boolean) If the key is a script
    //   "pubkey" : "publickeyhex",    (string) The hex value of the raw public key
    //   "iscompressed" : true|false,  (boolean) If the address is compressed
    //   "account" : "account"         (string) DEPRECATED. The account associated with the address, "" is the default account
    //   "timestamp" : timestamp,        (number, optional) The creation time of the key if available in seconds since epoch (Jan 1 1970 GMT)
    //   "hdkeypath" : "keypath"       (string, optional) The HD keypath if the key is HD and available
    //   "hdmasterkeyid" : "<hash160>" (string, optional) The Hash160 of the HD master pubkey
    // }
    try {
      let response = await axios.get(`${this.restURL}util/validateAddress/${address}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default Util;
