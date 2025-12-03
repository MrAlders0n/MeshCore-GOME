← Home / MeshCore

# MeshCore FAQ
This page covers frequently asked questions about using MeshCore in Ottawa.  
Each section provides quick guidance for common tasks.

## How Adverts Work
MeshCore uses a **repeater-driven advert system** for discovery (not a prerequisite to transmit).

* **You do not need to have recevied an advert from a repeater to send a message.** You can transmit at any time; any repeater that hears your packet will forward it.  
* Adverts allow your node to **discover repeaters** (their ID and info). This enables features such as:  
  * Tracing paths to confirm connectivity  
  * Seeing repeater names in the path summary of a message  
  * Setting static paths to a specific user  
* Repeaters periodically broadcast **adverts** (short beacon packets) across the mesh.  
* In Ottawa, adverts are configured for:  
  * **Zero-hop adverts (direct):** Every 1 hour  
  * **Flood adverts (forwarded across repeaters):** Every 3 hours  

This approach keeps discovery traffic low while still ensuring that repeaters can be identified and messages are reliably forwarded across the mesh.

## The Public Channel
By default, MeshCore companion nodes in Ottawa have access to the shared **public channel**.  

* Any correctly flashed node set to the correct frequency can join immediately and begin passing traffic.  
* When you send a message and a repeater hears it, you will see **Heard X Repeats** under your message (instead of just **Sent**).  
* You can click and hold the message, then select **Heard Repeats** to see which repeaters heard it.  
  * If you have discovered the repeater through adverts, you will see its **name**.  
  * If not, you will see only its **ID**.  

## How to Share Your Contact URL
1. Open the MeshCore app and connect it to your companion node.  

2. Tap the **Signal** icon at the top.  
🔗 View Screenshot  

3. Tap **Advert → To Clipboard**.  
🔗 View Screenshot  

4. Your contact URL is now copied to your phone’s clipboard.  
   Paste it into chat, notes, or anywhere else you want to share it.

## How to Import a Contact URL
1. Open the MeshCore app and connect it to your companion node.  

2. Tap the **three dots** in the top-right corner (menu button).  
🔗 View Screenshot  

3. Tap **Add Contact**.  
🔗 View Screenshot  

4. Tap **Import from Clipboard Link**.  
🔗 View Screenshot  

5. Within a few seconds, you should see a green notification pop up from the bottom:  
   **"Success – contact has been imported"**  
🔗 View Screenshot  

6. Exit out of the Add Contact page. A notification will pop up from the top:  
   **"New Contact Discovered <NAME>"**  
🔗 View Screenshot  

7. The contact will now appear in your contact list.

## How to Trace Route to a Node (1 Hop)
1. Open the MeshCore app and connect it to your companion node.  

2. Tap the **three dots** in the top-right corner (menu button).  
🔗 View Screenshot  

3. Tap **Tools**.  
🔗 View Screenshot  

4. Tap **Trace Path – Manual**.  
🔗 View Screenshot  

5. Tap the **plus button** to select your repeater.  
🔗 View Screenshot  

6. Select the repeater you want to trace to, then tap the checkmark at the top.  
🔗 View Screenshot  

7. You will see only a single repeater ID in the path — this indicates a 1-hop trace.  
   * You do not need to specify a return path because the trace goes directly to the repeater and back to your node.  
🔗 View Screenshot  

8. Tap **Trace Path** to run the trace.  
🔗 View Screenshot

## How to Trace Route to a Node (2+ Hops)
1. Open the MeshCore app and connect it to your companion node.  

2. Tap the **three dots** in the top-right corner (menu button).  
🔗 View Screenshot  

3. Tap **Tools**.  
🔗 View Screenshot  

4. Tap **Trace Path – Manual**.  
🔗 View Screenshot  

5. Tap the **plus button** to select your repeater.  
🔗 View Screenshot  

6. Select the repeaters you want to trace in order.  
   * In this menu, you can't select repeaters more than once.  
   * First, select your path **to** the repeater, then tap the checkmark.  
   * Go back into the add menu and select the repeaters for the **return path**.  
   * Alternatively, if you know the repeater IDs, you can type them directly into the path bar (comma-separated).  
   * Example: To trace from RepeaterA (ID **d3**) → RepeaterB (ID **f3**) → back to RepeaterA, the path bar would be:  
     **d3, f3, d3**  
🔗 View Screenshot  

7. Verify the path bar shows both the forward and return paths. Then tap **Trace**.  
🔗 View Screenshot  

8. The trace results will appear.  
🔗 View Screenshot
