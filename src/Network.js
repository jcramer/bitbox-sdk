import axios from 'axios';
class Network {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async addNode(node, command){
    // Attempts add or remove a node from the addnode list.
    // Or try a connection to a node once.
    //
    // Arguments:
    // 1. "node"     (string, required) The node (see getpeerinfo for nodes)
    // 2. "command"  (string, required) 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once
    //

    try {
      let response = await axios.post(`${this.restURL}network/addNode/${node}/${command}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async clearBanned() {
    //The clearbanned RPC clears list of banned nodes.

    // Parameters: none

    // Result—null on success
    // JSON null when the list was cleared

    try {
      let response = await axios.post(`${this.restURL}clearBanned`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async disconnectNode(configuration) {
    // Immediately disconnects from the specified peer node.
    //
    // Strictly one out of 'configuration.address' and 'configuration.nodeid' can be provided to identify the node.
    //
    // To disconnect by nodeid, either set 'address' to the empty string, or call using the named 'nodeid' argument only.
    //
    // Arguments:
    // 1. "configuration" (object, optional)
    // Properties
    // 1. "address"     (string, optional) The IP address/port of the node
    // 2. "nodeid"      (number, optional) The node ID (see getpeerinfo for node IDs)
    try {
      let response = await axios.post(`${this.restURL}disconnectNode/${configuration}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async getAddedNodeInfo(node) {
    // Returns information about the given added node, or all added nodes
    // (note that onetry addnodes are not listed here)
    //
    // Arguments:
    // 1. "node"   (string, optional) If provided, return information about this specific node, otherwise all nodes are returned.
    //
    // Result:
    // [
    //   {
    //     "addednode" : "192.168.0.201",   (string) The node ip address or name (as provided to addnode)
    //     "connected" : true|false,          (boolean) If connected
    //     "addresses" : [                    (list of objects) Only when connected = true
    //        {
    //          "address" : "192.168.0.201:8333",  (string) The bitcoin server IP and port we're connected to
    //          "connected" : "outbound"           (string) connection, inbound or outbound
    //        }
    //      ]
    //   }
    //   ,...
    // ]
    let path = `${this.restURL}network/getAddedNodeInfo`;
    if(node) {
      path = `${path}?node=${node}`;
    }

    try {
      let response = await axios.get(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async getConnectionCount() {
    // Returns the number of connections to other nodes.
    //
    // Result:
    // n          (numeric) The connection count

    try {
      let response = await axios.get(`${this.restURL}network/getConnectionCount`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async getNetTotals() {
    // Returns information about network traffic, including bytes in, bytes out, and current time.
    //
    // Result:
    // {
    //   "totalbytesrecv": n,   (numeric) Total bytes received
    //   "totalbytessent": n,   (numeric) Total bytes sent
    //   "timemillis": t,       (numeric) Current UNIX time in milliseconds
    //   "uploadtarget":
    //   {
    //     "timeframe": n,                         (numeric) Length of the measuring timeframe in seconds
    //     "target": n,                            (numeric) Target in bytes
    //     "target_reached": true|false,           (boolean) True if target is reached
    //     "serve_historical_blocks": true|false,  (boolean) True if serving historical blocks
    //     "bytes_left_in_cycle": t,               (numeric) Bytes left in current time cycle
    //     "time_left_in_cycle": t                 (numeric) Seconds left in current time cycle
    //   }
    // }

    try {
      let response = await axios.get(`${this.restURL}network/getNetTotals`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async getNetworkInfo() {
    // Returns an object containing various state info regarding P2P networking.
    //
    // Result:
    // {
    //   "version": xxxxx,                      (numeric) the server version
    //   "subversion": "/Satoshi:x.x.x/",     (string) the server subversion string
    //   "protocolversion": xxxxx,              (numeric) the protocol version
    //   "localservices": "xxxxxxxxxxxxxxxx", (string) the services we offer to the network
    //   "localrelay": true|false,              (bool) true if transaction relay is requested from peers
    //   "timeoffset": xxxxx,                   (numeric) the time offset
    //   "connections": xxxxx,                  (numeric) the number of connections
    //   "networkactive": true|false,           (bool) whether p2p networking is enabled
    //   "networks": [                          (array) information per network
    //   {
    //     "name": "xxx",                     (string) network (ipv4, ipv6 or onion)
    //     "limited": true|false,               (boolean) is the network limited using -onlynet?
    //     "reachable": true|false,             (boolean) is the network reachable?
    //     "proxy": "host:port"               (string) the proxy that is used for this network, or empty if none
    //     "proxy_randomize_credentials": true|false,  (string) Whether randomized credentials are used
    //   }
    //   ,...
    //   ],
    //   "relayfee": x.xxxxxxxx,                (numeric) minimum relay fee for non-free transactions in BCH/kB
    //   "incrementalfee": x.xxxxxxxx,          (numeric) minimum fee increment for mempool limiting or BIP 125 replacement in BCH/kB
    //   "localaddresses": [                    (array) list of local addresses
    //   {
    //     "address": "xxxx",                 (string) network address
    //     "port": xxx,                         (numeric) network port
    //     "score": xxx                         (numeric) relative score
    //   }
    //   ,...
    //   ]
    //   "warnings": "..."                    (string) any network warnings
    // }

    try {
      let response = await axios.get(`${this.restURL}network/getNetworkInfo`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async getPeerInfo() {
    // Returns data about each connected network node as a json array of objects.
    //
    // Result:
    // [
    //   {
    //     "id": n,                   (numeric) Peer index
    //     "addr":"host:port",      (string) The ip address and port of the peer
    //     "addrlocal":"ip:port",   (string) local address
    //     "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
    //     "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
    //     "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    //     "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    //     "bytessent": n,            (numeric) The total bytes sent
    //     "bytesrecv": n,            (numeric) The total bytes received
    //     "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
    //     "timeoffset": ttt,         (numeric) The time offset in seconds
    //     "pingtime": n,             (numeric) ping time (if available)
    //     "minping": n,              (numeric) minimum observed ping time (if any at all)
    //     "pingwait": n,             (numeric) ping wait (if non-zero)
    //     "version": v,              (numeric) The peer version, such as 7001
    //     "subver": "/Satoshi:0.8.5/",  (string) The string version
    //     "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
    //     "addnode": true|false,     (boolean) Whether connection was due to addnode and is using an addnode slot
    //     "startingheight": n,       (numeric) The starting height (block) of the peer
    //     "banscore": n,             (numeric) The ban score
    //     "synced_headers": n,       (numeric) The last header we have in common with this peer
    //     "synced_blocks": n,        (numeric) The last block we have in common with this peer
    //     "inflight": [
    //        n,                        (numeric) The heights of blocks we're currently asking from this peer
    //        ...
    //     ],
    //     "whitelisted": true|false, (boolean) Whether the peer is whitelisted
    //     "bytessent_per_msg": {
    //        "addr": n,              (numeric) The total bytes sent aggregated by message type
    //        ...
    //     },
    //     "bytesrecv_per_msg": {
    //        "addr": n,              (numeric) The total bytes received aggregated by message type
    //        ...
    //     }
    //   }
    //   ,...
    // ]

    try {
      let response = await axios.get(`${this.restURL}network/getPeerInfo`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
  //
  // listBanned() {
  //   // List all banned IPs/Subnets.
  //   return axios.get(`${this.restURL}network/listBanned`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }

  async ping() {
    // Requests that a ping be sent to all other nodes, to measure ping time.
    // Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
    // Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.

    try {
      let response = await axios.get(`${this.restURL}network/ping`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
  //
  // setBan(subnet, command, bantime, absolute) {
  //   // Attempts add or remove a IP/Subnet from the banned list.
  //   //
  //   // Arguments:
  //   // 1. "subnet"       (string, required) The IP/Subnet (see getpeerinfo for nodes ip) with a optional netmask (default is /32 = single ip)
  //   // 2. "command"      (string, required) 'add' to add a IP/Subnet to the list, 'remove' to remove a IP/Subnet from the list
  //   // 3. "bantime"      (numeric, optional) time in seconds how long (or until when if [absolute] is set) the ip is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
  //   // 4. "absolute"     (boolean, optional) If set, the bantime must be a absolute timestamp in seconds since epoch (Jan 1 1970 GMT)
  //
  //   return axios.post(`${this.baseurl}network/setban/${subnet}/${command}`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
  //
  // setNetworkActive(state) {
  //   // Disable/enable all p2p network activity.
  //   //
  //   // Arguments:
  //   // 1. "state"        (boolean, required) true to enable networking, false to disable
  //
  //   return axios.post(`${this.baseurl}network/setNetworkActive/${state}`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}

export default Network;
