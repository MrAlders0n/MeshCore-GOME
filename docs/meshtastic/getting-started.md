# Getting Started with Meshtastic

!!! warning "Meshtastic Documentation Status"
    The Meshtastic documentation is still a work in progress and isn’t being actively maintained.  
    If you’re interested in helping write or update it, please contact **MrAlders0n**.

Meshtastic is a peer-to-peer LoRa mesh where every node can forward packets.
This guide will help you flash Meshtastic firmware onto your device and configure it for use in the local Ottawa mesh.

## Before You Start

To set up your first node, you’ll need:

* A supported LoRa device
* A USB cable for flashing
* Google Chrome browser (required for the Web Flasher)
* (Optional) The Meshtastic mobile app for iOS or Android

## Flashing a Node

The easiest way to flash a Meshtastic node is by using the official web flasher tool in Google Chrome:

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
