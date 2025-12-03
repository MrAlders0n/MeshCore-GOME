
← Home

This guide will help you flash a node, configure it as a repeater.

## Flashing & Configuring a Repeater Node
### RAK Bootloader update (Skip if not using a RAK based board)
**Important:** Before configuration, you must update the bootloader on RAK boards.  
Without this fix, failed OTA updates can leave the repeater in an unusable state that requires physical recovery.

1. Download the OTA bootloader fix from [this link](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases/download/0.9.2-otafix1/update-wiscore_rak4631_board_bootloader-0.9.2-otafix1_nosd.uf2).  

2. Connect your repeater to your computer.  

3. Double click the button on the RAK board beside the USB port, the green light should turn on indicating DFU mode is enabled.  

4. It should appear in your file explorer as a **USB Drive**.  

5. Drag the **.uf2** file into the mounted drive.  

6. The file copy will appear to fail, and the device will restart and remount as a USB drive — this is expected and indicates a successful update.  

7. To confirm, open the **INFO.TXT** file on the drive and check that it shows version **0.9.2 bootloader firmware**.  

### Flashing MeshCore Repeater Firmware
1. Plug your device into your computer via USB.  

2. Open the [MeshCore Web Flasher](https://flasher.meshcore.co.uk/).  

3. Select your device hardware.  

4. Select the firmware choice **Repeater**.  

5. Click **Enter DFU Mode**.  

6. Click **Erase Flash**.  

7. Click **Flash** to install the MeshCore firmware.  

**Note:** Sometimes after erasing, the flash step may fail. If this happens, refresh the page, click **Enter DFU Mode** again, and then click **Flash** to retry.  

### Configuring a MeshCore Repeater
1. Using Google Chrome, open the repeater configuration tool: [MeshCore Repeater Config](https://config.meshcore.dev/).  

2. After connecting to the device, navigate to Ottawa Repeater IDs and make sure the first two characters of your public key are not already in use.  
   * MeshCore repeater IDs are based on the **first two characters of the public key**.  
   * As the mesh has grown, duplicate IDs have caused routing conflicts — it’s important to avoid using an existing ID.  
   * Developers are working on a long-term fix, but for now, each new repeater must use a unique ID.

----

### If required due to a duplicate ID, this is how to generate a new repeater ID
There are **two ways** to assign a new repeater ID:

**Option 1 – Reflash the repeater (automatic key generation)**

1. Reflash the repeater. Follow Flashing a Node from the beginning, and make sure to **Flash Erase** during the process.

2. This will generate a new random private key and therefore a new public key and repeater ID. However, it could generate a duplicate again, so please verify afterwards that your new repeater ID is unique by checking it against the [Ottawa Repeater ID List](./repeaters-and-coverage.md).

**Option 2 – Manually generate a private key (choose your own ID)**

If you want to choose your repeater’s ID prefix manually:

1. Visit the [Ottawa Repeater ID List](./repeaters-and-coverage.md) and select an unused 2-digit ID.

2. Go to [mc-keygen](https://gessaman.com/mc-keygen/) and enter that 2-digit ID into the “Repeater ID” field, then click **Generate Key**.
 
3. Scroll down and copy the value under **Private Key**.

4. Open [MeshCore Flasher](https://flasher.meshcore.co.uk/), click **Console**, and select the serial device for your repeater.

5. Run the following command, replacing <PRIVATE-KEY> with the key you copied:

   set prv.key <PRIVATE-KEY>

6. Reboot the repeater.  
It will now use the new private key, and the public key will reflect your chosen repeater ID.

----

3. Give the node a descriptive **name** (e.g. **Callsign_R1** or a location-based name).  

4. Set an **admin password** for the repeater — this is required for remote management over MeshCore.  

5. Apply the Ottawa frequency defaults: **910.525 MHz / BW: 62.5 kHz / SF7 / CR5**.  

6. Click **Save** and reboot the node.  

7. Reconnect to the device using the configuration tool and click **Send Advert**.  
   * If your repeater is running correctly, you should see the advert appear on nearby companion nodes.  

After the repeater has been configured and discovered by your companion node, log into it via MeshCore Remote Administration and set the following advert intervals:  

8. Set **Zero-hop adverts (direct)** to every 1 hour.  

9. Set **Flood adverts (forwarded across repeaters)** to every 12 hours.  

10. Click **Save**.  

**Tip:** After every reboot, you must resync the repeater’s clock.  
The repeater will still route messages without a clock, but its adverts will be ignored until the time is set.
