# MeshCore-Packet/Overview

The **MeshCore Packet Analyzer** provides real-time visibility into MeshCore network activity — allowing anyone to inspect, decode(only public unencrypted messages), and understand how packets move across the Ottawa mesh.

## Live Analyzer (Ottawa Region)

View the live packet feed here:  

[MeshCore Packet Analyzer – Ottawa (YOW)](https://analyzer.letsme.sh/packets?region=YOW)

### What you'll see on the page

* **Auto-refreshing packet table** – each row is a single on-air packet captured by an observer in the YOW region.
* **Common columns:**
** **Time (UTC)** – when the packet was heard  
  * **Type** – e.g., Advert, Message, AnonRequest/AnonReply, etc.  
  * **Channel / Hash** – public channel or hash value (e.g., ch0)  
  * **Observer** – which station heard the packet  
  * **RSSI / SNR** – signal strength and quality reported by the observer  
  * **Path / PathLen** – hop count and hop bytes (first byte of each repeater’s public key)  
  * **From / Node** – sender public key and name (if present)  
  * **Flags / Coords** – app flags and latitude/longitude (if present in the payload)
  * **Row actions / details:**
  * **Decoded view** – expands header, path, and payload fields (header bitfield, timestamp, flags, etc.)  
  * **Raw hex** – shows the original packet bytes for verification or offline parsing
* **Filtering & utilities:**
  * Region is preset to **YOW** by the link  
  * Filter text, sort columns, or change page size  
  * Toggle auto-refresh to pause the stream while inspecting packets

## How the Analyzer Works

Participating gateways (called **observers**) run the *meshcore-packet-capture*, which listens for LoRa traffic and forwards decoded packets to the analyzer.  
Packets are aggregated by region (e.g., **YOW** for Ottawa) and displayed in near real time.

You can:

* Filter or search packets
* Inspect decoded fields and raw hex  
* Compare paths across multiple hops  
* Monitor reliability and propagation trends
