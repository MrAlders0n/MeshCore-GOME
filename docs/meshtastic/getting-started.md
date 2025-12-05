q
[Meshtastic Web Flasher](https://flasher.meshtastic.org/)

Only **Google Chrome** supports the serial connection required for flashing.

For step-by-step instructions, see:  
[Flashing Firmware Guide](https://meshtastic.org/docs/getting-started/flashing-firmware/)

## Configuring Your Node

After flashing, configure your device for local use.

Follow the official guides here:

* [Initial Configuration](https://meshtastic.org/docs/getting-started/initial-config/)
* [General Configuration Reference](https://meshtastic.org/docs/configuration/)

When configuring your node, ensure you set the Ottawa frequency preset:

### Preset

**US/LongFast – 906.875 MHz**

## Building a Repeater (Optional)

Meshtastic does not require special repeater nodes.
Any stationary node left powered on will forward packets between users.

To build a reliable repeater-like node:

* Place a node high up with clear line-of-sight.
* Power it continuously (mains or solar recommended).
* Disable Bluetooth to save power and reduce interference (optional).

*Tip:* Do *not* change the device role from "Client" unless you’ve consulted the community.

See: [Choosing the Right Device Role](https://meshtastic.org/blog/choosing-the-right-device-role/)
