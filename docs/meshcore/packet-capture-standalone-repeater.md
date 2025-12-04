# MeshCore Packet Capture (Standalone Repeater Listener)

This guide explains how to install and run a **custom build of MeshCore repeater firmware** on a **Heltek V3** to act as a standalone packet capture device that forwards logs directly to **[analyzer.letsme.sh](https://analyzer.letsme.sh)**.  
This setup does **not** require a Raspberry Pi, VM, or companion node.

## Overview

This firmware was compiled from  
**[agessaman/MeshCore – mqtt-bridge-implementation-dev](https://github.com/agessaman/MeshCore/tree/mqtt-bridge-implementation-dev)**  
to simplify setup for the Ottawa Mesh community.

Key characteristics:

- **Default Frequency:** USA/CAN recommended settings preconfigured  
- **Role:** Repeater with repeating disabled (a “silent repeater”)  
- **Purpose:** Capture all packets in range and forward them to the Ottawa Packet Analyzer  

Each unit must use a **unique repeater ID** (derived from its private key).  
Please share your ID in the **Ottawa Mesh Discord** so we can track assignments.


## Scope

This guide covers packet capture from a **standalone repeater node** only.  
To run a *normal* repeater instead, simply skip the step where repeat is disabled.


## Requirements

- Heltek V3 board  
- USB-C cable  
- Wi-Fi network access  
- Basic familiarity with the **[MeshCore Flasher](https://flasher.meshcore.co.uk)** tool  


## Firmware Installation

1. **Download the HeltekV3 MQTT Repeater Firmware:**  
   [Download Link](https://drive.proton.me/urls/BAM30S5MJ0#u6tQH2mlsoZR)

2. Open the **MeshCore Flasher**:  
   https://flasher.meshcore.co.uk/

3. Select **HeltekV3**.

4. Select **Repeater** firmware.

5. Click **Erase Device**.

6. Click **Flash**.  
   If it fails, restart at step 2 and try again.

7. Go back to the **MeshCore Flasher** home page and scroll to the bottom.

8. Click **Custom Firmware**.

9. Select the firmware file downloaded in step 1.

10. **Do NOT click Erase Device.**  
    Erasing at this stage will prevent the firmware from booting.

11. Click **Flash**.

12. Wait for flashing to complete.

## Configure Device Identity

1. Visit **[Ottawa Repeater ID List](./repeaters-and-coverage.md)** and choose an unused 2-digit ID.

2. Open **[mc-keygen](https://gessaman.com/mc-keygen/)** and enter that ID into the **Repeater ID** field.  
   Click **Generate Key**.

3. Scroll down and copy the generated **Private Key**.

4. Open **MeshCore Flasher**, click **Console**, and connect to your repeater.

5. Set the private key:

    ```bash
    set prv.key <PRIVATE-KEY>
    ```

6. Set the repeater name (Ottawa naming convention):

    ```bash
    set name YOW_OldBarrhaven
    ```

7. Set the IATA code for MQTT ingestion:

    ```bash
    set mqtt.iata YOW
    ```

8. Disable repeat (turns the device into a silent observer):

    ```bash
    set repeat off
    ```

9. *(Optional)* Assign ownership info so the Analyzer UI can attribute your observer:

    - You must have an account on **analyzer.letsme.sh**  
    - Login uses MeshCore Forum authentication

    ```bash
    set mqtt.owner <Companion-Public-Key>
    set mqtt.email <MeshCore-Forum-Email>
    ```


## Configure Wi-Fi & Timezone

1. Set Wi-Fi credentials:

    ```bash
    set wifi.ssid <WIFI-NETWORK-NAME>
    set wifi.pwd <WIFI-PASSWORD>
    ```

2. Set timezone:

    ```bash
    set timezone America/Toronto
    ```

3. Reboot:

    ```bash
    reboot
    ```

## Validation

After rebooting and connecting to Wi-Fi, the device will automatically send logs to the Analyzer MQTT broker.

1. Go to:  
   **https://analyzer.letsme.sh/status/observers**

2. Locate your node name (e.g., `YOW_OldBarrhaven`).

3. If it appears and is highlighted in **green**, your observer is online and reporting correctly.

## Notes

- This firmware publishes logs directly to the Analyzer backend — no Raspberry Pi, no VM.  
- The node behaves like a repeater with repeating disabled.  
- Make sure your repeater ID is registered in the Ottawa Mesh Discord to avoid conflicts.