
# Frequency Settings for Meshtastic

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

## Other Regional Presets

Meshtastic includes several built-in presets depending on your location:

| Region Code | Description                     | Frequency Range (MHz)   | Duty Cycle (%) | Power Limit (dBm) |
|-------------|---------------------------------|--------------------------|----------------|--------------------|
| UNSET       | Unset                           | N/A                      | N/A            | N/A                |
| US          | United States                   | 902.0 – 928.0            | 100            | 30                 |
| EU_433      | European Union 433 MHz          | 433.0 – 434.0            | 10             | 12                 |
| EU_868      | European Union 868 MHz          | 869.4 – 869.65           | 10             | 27                 |
| CN          | China                           | 470.0 – 510.0            | 100            | 19                 |
| JP          | Japan                           | 920.8 – 927.8            | 100            | 16                 |
| ANZ         | Australia & New Zealand         | 915.0 – 928.0            | 100            | 30                 |
| ANZ_433     | Australia & New Zealand 433 MHz | 433.05 – 434.79          | 100            | 14                 |
| KR          | Korea                           | 920.0 – 923.0            | 100            | —                  |
| TW          | Taiwan                          | 920.0 – 925.0            | 100            | 27                 |
| RU          | Russia                          | 868.7 – 869.2            | 100            | 20                 |
| IN          | India                           | 865.0 – 867.0            | 100            | 30                 |
| NZ_865      | New Zealand 865 MHz             | 864.0 – 868.0            | 100            | 36                 |
| TH          | Thailand                        | 920.0 – 925.0            | 100            | 16                 |
| UA_433      | Ukraine 433 MHz                 | 433.0 – 434.7            | 10             | 10                 |
| UA_868      | Ukraine 868 MHz                 | 868.0 – 868.6            | 1              | 14                 |
| MY_433      | Malaysia 433 MHz                | 433.0 – 435.0            | 100            | 20                 |
| MY_919      | Malaysia 919 MHz                | 919.0 – 924.0            | 100            | 27                 |
| SG_923      | Singapore 923 MHz               | 917.0 – 925.0            | 100            | 20                 |
| NP_865      | Nepal 865 MHz                   | 865.0 – 868.0            | 100            | —                  |
| LORA_24     | 2.4 GHz band worldwide          | 2400.0 – 2483.5          | 100            | 10                 |

*Note:* Your node must use the same preset as the rest of your mesh.  
If you’re travelling, you may need to reconfigure your frequency to join a different region’s network.

## Why Frequency Matters

* Ensures *legal operation* under local spectrum regulations.  
* Maximises *range and reliability* by staying in band.  
* Prevents interference with other radio services.  

## Next Steps

* Configure your node → [Meshtastic/Getting Started](./getting-started.md)  
* Join the Ottawa channel → Meshtastic/Join the Ottawa Channel  
* Troubleshoot issues → Meshtastic/Common Issues and Fixes
