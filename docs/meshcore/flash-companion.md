
← Home

This guide will help you flash a node, configure it as a companion.

## Flashing & Configuring a Companion Node
### Flashing a Companion Node
The easiest way to flash a MeshCore-supported node is by using the official web flasher tool in Google Chrome:

[MeshCore Web Flasher](https://flasher.meshcore.co.uk/)

Only **Google Chrome** supports the serial connection required for flashing.

Steps:
# Plug your device into your computer via USB.
# Open the [MeshCore Web Flasher](https://flasher.meshcore.co.uk/).
# Select your device hardware
# Select the firmware choice **Companion Radio (Bluetooth)**
# Click **Enter DFU Mode**.
**Note:** Sometimes after erasing, the flash step may fail. If this happens, refresh the page, click **Enter DFU Mode** again, and then click **Flash** to retry.
# Click **Erase Flash**.  
# Click **Flash** to install the MeshCore firmware.

**Note:** Sometimes after erasing, the flash step may fail. If this happens, refresh the page, click **Enter DFU Mode** again, and then click **Flash** to retry.

### Configuring a Companion Node
After flashing, follow these steps to set up your companion node:

# Pair the node with your phone or computer (usually over Bluetooth).  
# Give the node a descriptive **name** (e.g. your callsign, location, or handle).  
# Set it to the Ottawa frequency defaults: **910.525 MHz / BW: 62.5 kHz / SF7 / CR5**.  
# Test by sending a message in the **Public channel**.  
   * If a repeater hears you, the message will show **Heard X Repeats** instead of just **Sent**.  

**Tip:** You may wish to disable **Message Settings → Auto Reset Path**. This isn’t required, but many users find it helpful when testing links that aren’t fully stable, as it prevents the path from constantly resetting.
