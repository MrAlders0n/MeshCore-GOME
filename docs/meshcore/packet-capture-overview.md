# MeshCore Packet Analyzer – Overview

The **MeshCore Packet Analyzer** provides real-time visibility into MeshCore network activity — allowing anyone to inspect, decode (only public unencrypted messages), and understand how packets move across the Ottawa mesh.

## Live Analyzer (Ottawa Region)

View the live packet feed here:

**[MeshCore Packet Analyzer – Ottawa (YOW)](https://analyzer.letsmesh.net/packets?region=YOW)**

## What You'll See on the Page

### Packet Table
An **auto-refreshing packet table** where each row represents a single on-air packet captured by an observer in the YOW region.

### Common Columns
- **Time (UTC)** – when the packet was heard  
- **Type** – Advert, Message, AnonRequest, AnonReply, etc.  
- **Channel / Hash** – public channel or hash value (e.g., `ch0`)  
- **Observer** – which station heard the packet  
- **RSSI / SNR** – signal strength and quality reported by the observer  
- **Path / PathLen** – hop count and hop bytes (each byte = first byte of a repeater’s public key)  
- **From / Node** – sender public key and name (if present)  
- **Flags / Coords** – app flags and coordinates if included in the payload  

### Row Actions / Detail View
- **Decoded view** – expands:
    - Header bitfield  
    - Path bytes  
    - Payload fields (timestamp, flags, coords, signature, etc.)  
- **Raw hex** – shows the original packet bytes for verification or offline parsing

### Filtering & Utilities
- Region preset to **YOW**  
- Filter text, sort columns, or adjust page size  
- Toggle **auto-refresh** to pause the stream for deeper inspection  

## How the Analyzer Works

Participating gateways (called **observers**) run `meshcore-packet-capture`, which listens for LoRa traffic and forwards decoded packet data to the analyzer backend.  
Packets are grouped by region (e.g., **YOW** for Ottawa) and displayed in near real time.

You can use the analyzer to:

- Filter or search packet history  
- Inspect decoded fields and raw hex  
- Compare routes across multiple hops  
- Monitor stability, coverage, and mesh propagation patterns  

