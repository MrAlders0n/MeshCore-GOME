# MeshCore Frequency Settings

MeshCore developers have published recommended frequency settings that balance performance and reduce congestion in the ISM band, which is often crowded with devices like smart meters and other IoT systems.  

Ottawa follows the new recommended defaults for the Canada region.

All nodes operating in Ottawa should use these settings to ensure compatibility with the repeater network and other companion nodes.

## Ottawa MeshCore Settings

- **Frequency:** 910.525 MHz  
- **Bandwidth:** 62.5 kHz  
- **Spreading Factor (SF):** 7  
- **Coding Rate (CR):** 5

## Other recommended [CLI Commands](https://docs.meshcore.io/cli_commands/)

| CLI Command| Description | 
|---------|-------------|
| flood.max=16 | Limit the number of hops for a flood message |
| flood.advert.interval=47 | Flood advert interval (Hours) |
| advert.interval=240 | Zero-hop advert interval (Minutes) |
| loop.detect=moderate | Loop detection |

### Repeater Advert Path Hash Size

[Nodak Mesh](https://nodakmesh.org/blog/meshcore-path-hash-explained) has a great article explaining Path hashes.

Repeaters in Ottawa should have their advert path hash size 3-byte mode. See also [Flashing a Repeater](https://meshcore.ca/meshcore/flash-repeater/) for more information.

### Companion Path Hash Size

All companions should have their Default Path Hash Size set to 2-byte (max 32 hops). This can be set in the MeshCore app if your companion has v1.14.0+ firmware under Settings -> Experimental Settings.
