# Flashing and Configuring a Companion Node

This guide will help you flash a node and configure it to operate as a companion.

---

## Flashing a Companion Node

The easiest way to flash a MeshCore-supported node is by using the official web flasher tool in **Google Chrome**:

**[MeshCore Web Flasher](https://flasher.meshcore.co.uk/)**  
(Only Chromium-based browsers (e.g., Google Chrome, Microsoft Edge) support the serial connection required for flashing.)

### Steps

1. Plug your device into your computer via USB.  
2. Open the **MeshCore Web Flasher**.  
3. Select your device hardware.  
4. Select the firmware type: **Companion Radio (Bluetooth)**.  
5. Click **Enter DFU Mode**.  
6. Click **Erase Flash**.  
7. Click **Flash** to install the MeshCore firmware.

**Note:**  
If the flash step fails after erasing, refresh the page, click **Enter DFU Mode** again, then click **Flash** to retry.

---

## Configuring a Companion Node

After flashing, follow these steps to complete setup:

1. Pair the node with your phone or computer (usually over Bluetooth).  
2. Give the node a descriptive **name** (for example: your callsign, location, or handle).  
3. Set the Ottawa frequency defaults:  
   **910.525 MHz / BW: 62.5 kHz / SF7 / CR5**  
4. Test the node by sending a message in the **Public channel**.  
   - If a repeater hears you, the message will show **Heard X Repeats** instead of just **Sent**.

**Tip:**  
You may want to disable **Message Settings → Auto Reset Path**.  
This isn’t required, but many users find it useful when testing unstable links because it prevents the path from constantly resetting.

---
