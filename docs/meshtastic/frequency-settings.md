# Frequency Settings for Meshtastic

!!! warning "Meshtastic Documentation Status"
    The Meshtastic documentation is still a work in progress and isn’t being actively maintained.  
    If you’re interested in helping write or update it, please contact **MrAlders0n**.

Meshtastic uses LoRa radios, which operate on different frequencies depending on regional regulations. 
Using the correct preset is important to ensure you stay legal and compatible with the local mesh.

## Ottawa / Canada Preset

For Ottawa and the rest of North America, use the following setting:

```US/LongFast – 906.875 MHz```

This is the community-agreed frequency band for our local mesh.  
It ensures maximum compatibility between nodes in the region.

* How to Change Your Frequency

* Open the Meshtastic app or Web UI

* Go to **Radio Configuration → LoRa**

* Select the correct **Region / Preset** (United States)

* Save and reboot your device

For detailed instructions, see the [official docs]([https://meshtastic.org/docs/configuration/radio/).