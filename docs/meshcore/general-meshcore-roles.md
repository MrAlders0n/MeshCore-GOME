
← Home

# Hardware
This section covers hardware that is commonly used across the **MeshCore** network in Ottawa.  
Hardware falls broadly into three categories: **Companion Nodes**, **Repeaters**, and **Room Servers**.  

## Companion Nodes
A **companion node** is typically a small, personal device (often handheld or portable) that allows a user to connect into the mesh.  
* They usually run on battery or USB power.  
* Often paired with a smartphone over Bluetooth for messaging.  
* There are also standalone nodes, such as the **T-Deck**, which include a screen and a keyboard and can operate independently without a smartphone. However, we don’t recommend starting with one of these, as the firmware for them is not yet polished and can be confusing to use.
* Companion nodes do **not** route packets between themselves.  
* A companion node can talk directly to another companion node.  
* **Only repeaters** are responsible for routing packets across the MeshCore network.  

→ See [MeshCore/CompanionNodes](./companion-nodes-antenna.md) for details.

## Repeaters
A **repeater** is a fixed installation, usually mounted at height (e.g. rooftop, tower, or mast), that helps extend range and link mesh segments together.  
* They run continuously on mains or solar power. In Ottawa most repeaters run off solar power.  
* In MeshCore: repeaters form the stable, consistent **backbone infrastructure** of the network and are the only devices that perform packet routing.  

→ See [MeshCore/Repeaters](./rak-based-repeaters-node.md) for details.

## Room Servers
A **room server** is a device flashed with specialized room server firmware that functions like a persistent chat room or old-school BBS.  
* Stores the last **32 messages** sent to it.  
* When a companion node connects, it retrieves those stored messages, similar to checking an email inbox.  
* While they technically can be set to repeat, this is strongly discouraged. In Ottawa, repeat has been disabled on room servers, and developers have discussed removing the option entirely. Room servers are **not full repeaters** — they lack many repeater features.  
* Recommended use: deploy as a static message board or group chat node, but never as a repeater.  

----
*This hardware section is maintained by the Greater Ottawa Mesh Enthusiasts to provide information and track deployments.*
