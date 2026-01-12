# MeshCore Packet Capture (Standalone Repeater Listener)

This guide explains how to install and run a **custom build of MeshCore repeater firmware** on a **HeltekV3** to act as a standalone packet capture device that forwards logs directly to [analyzer.letsme.sh](https://analyzer.letsme.sh).  
This setup does **not** require a Raspberry Pi, VM, or companion node.

## Overview

This firmware was compiled from [agessaman/MeshCore (mqtt-bridge-implementation)](https://github.com/agessaman/MeshCore/tree/mqtt-bridge-implementation) to simplify setup for the community.

* **Default Frequency:** USA/CAN recommended settings pre-configured  
* **Role:** Repeater with repeat disabled (acts as a “silent repeater” for packet capture)

Each unit functions like a repeater that does not forward packets.  
To avoid ID collisions, each device must have a unique private key.  
Please share your assigned ID in the **Ottawa Mesh Discord** so we can track it.

## Scope

This setup covers packet capture from a standalone repeater node only.  
If you wish to run a full repeater, simply skip the step where repeat is disabled.

## Requirements

* Heltek V3 board  
* USB-C cable  
* Wi-Fi network access  
* Basic familiarity with the [MeshCore Flasher](https://flasher.meshcore.co.uk) tool  

## Firmware Download

**HeltekV3 MQTT Repeater Firmware 1.11.0** [Download Link](./firmware/Heltek_v3_Repeater_MQTT_Bridge_1.11.0.bin) **Tested on: 2025-12-13**&

## Firmware Installation

1. Download the HeltekV3 MQTT Repeater Firmware you wish to use

2. Go to [MeshCore Flasher](https://flasher.meshcore.co.uk/) and click **HeltekV3**  

3. Select **Repeater**  

4. Click **Erase Device**  

5. Click **Flash**  

6. Flashing will take a minute; if it fails, restart at step 2 and try again.  

7. Return to [MeshCore Flasher](https://flasher.meshcore.co.uk/) and scroll to the bottom.  

8. Click **Custom Firmware**  

9. Select the HeltekV3 MQTT Repeater firmware you downloaded in step 1.  

10. **Do NOT click Erase Device** — if you erase here, the firmware will not boot.  

11. Click **Flash** again.  

12. Wait for flashing to complete.  

## Configure Device Identity

1. Visit [Ottawa Repeater ID List](../deployment/repeaters.md) and choose an unused 2-digit ID, a popup will appear.  

2. Click **Generate Key**.  

3. Click copy next to the **Private Key** value.  

4. Open [MeshCore Flasher](https://flasher.meshcore.co.uk/), click **Console**, and select the serial device for your repeater.  

5. Run the following command, replacing ```PRIVATE-KEY``` with your generated key:
    ```set prv.key <PRIVATE-KEY>```

    If you get a error, run this command first, then re-run step 5:
    ```get prv.key```

6. Configure the repeater name using the Ottawa naming convention (```YOW_Location```):  

    ```
    set name YOW_OldBarrhaven
     ```

7. Configure the IATA Code for MQTT ingestion

    ```
    set mqtt.iata YOW 
    ```

8. Disable repeat:  

    ```
    set repeat off
     ```

9. (Optional) Configure ownership info for the Packet Analyzer:  
    You must have an account on [analyzer.letsmesh.net](https://analyzer.letsmesh.net/) (login uses MeshCore Forum authentication).

     ```
     set mqtt.owner <Companion-Public-Key>
     ```

     ```
     set mqtt.email <MeshCore-Fourm-Email-Address>
    ```

## Configure Remaining Things

1. Set Wi-Fi credentials:

    ```
    set wifi.ssid <WIFI-NETWORK-NAME>
    ```

    ```
    set wifi.pwd <WIFI-PASSWORD>
    ```

2. Set timezone:  

    ```
    set timezone America/Toronto
    ```

3. Configure the radio settings

    ```
   set radio 510.525,62.5,7,5
    ```

4. Set the admin password

    ```
   password <Admin Password>
    ```

5. Set the guest password

    ```
   set password.guest <Guest Password>
    ```

6. Set the device latitude

    ```
   set lat <Latitude>
    ```

7. Set the device longitude

    ```
   set lon <Longitude>
    ```

8. Reboot the device:

    ```
    reboot
    ```

## Validation

After the device reboots and connects to Wi-Fi, it should automatically start sending logs to the Analyzer MQTT broker.  

1. Go to [analyzer.letsmesh.net/status/observers](https://analyzer.letsmesh.net/status/observers)  

2. Locate your node name (for example ```YOW_OldBarrhaven```) in the list.  

3. Confirm that it appears in the table and is highlighted in **green** — this means it is online and reporting correctly.  

## Notes

* This firmware publishes logs directly to the Analyzer MQTT broker — no Raspberry Pi or VM is needed.  
* The node operates as a repeater with repeating disabled, meaning it listens and reports traffic but does not forward it.  
* Make sure to report your assigned repeater ID in the Ottawa Mesh Discord to avoid overlap.
