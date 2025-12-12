# Building a Solar Node – Rak Unify Box

!!! warning "Work In Progress"
    THIS IS A WORK IN PROGRESS AND IS NOT FINAL, please contact **MrAlders0n** for questions related to the build.

This guide walks through assembling a solar-powered MeshCore repeater using the **RAK Unify Box** enclosure.  
Follow each step carefully for a reliable and weatherproof build.

## Assembly Steps

**WARNING: Always ensure a LoRa antenna and the Bluetooth antenna are attached to the RAK board before powering it on. Powering without antennas can permanently damage the board.**

1. Unbox all components and place them aside.  
      ```Tip: Try not to misplace the small screws and fittings — they’re easy to lose.```  

2. Mount the RAK backplate into the box with the four provided screws.  

3. Drill two holes: one for the N-type antenna mount and one for the drain plug.  
   * Use a step drill bit for clean holes.  
   * **Finding the top of the box:**  
     * Flip the box onto its back.  
     * Locate the mount hole marked "1" — this is the top.  
   * Drill slowly, one step at a time. Test-fit the N-type connector after each step until it fits snugly.  
   * Repeat the same process on the bottom of the box for the drain plug.  

4. Attach both the N-type antenna mount and the drain plug.  

5. Connect the N-type antenna to the LoRa IPEX connector on the RAK19003 board.  

6. Mount the Bluetooth antenna to the side of the box using the included double-sided tape.  

7. Connect the Bluetooth IPEX to the RAK19003 board.  

8. Connect an antenna to the N-type connector, then flash and configure the RAK unit following Configuring a Repeater.  

9. Mount the RAK unit onto the backplate, see picture below for what it should look like at this step.  

      ![](images/BuildRepeater1_MountedAll.jpeg){ width="300" }

10. Connect the JST PHR-2 cable to the RAK19003 battery plug, **ensuring correct polarity** (many JST cables are wired incorrectly).  

      ![](images/RAK19003-Layout.png){ width="300" }

11. Connect the other end of this cable to the **CHG** side of the VoltaicEnclosures Li-ion PCM.  

      ![](images/VoltaicEnclosures_Layout.png){ width="300" }

12. Slide a piece of heat-shrink tubing over the cable large enough to cover the PCM before connecting the battery.  

13. Connect the LiPo JST PHR-2 cable to the **BATT** side of the PCM, again **ensuring polarity is correct**.  

      ![](images/RAK19003-LayoutSolar.jpg){ width="300" }

14. Heat-shrink the VoltaicEnclosures Li-ion PCM so the entire board is covered.  

15. (Optional) Secure the PCM to the backplate using double-sided tape. It can also float freely inside the box if preferred.  

16. (Optional) Secure the battery to the backplate with double-sided tape or mounting hardware. It should look like the below image.

      ![](images/BuildRepeater1_Finished.jpeg){ width="300" }

17. Fit the rubber seal into the groove around the edge of the front plate of the box.  

18. Connect the solar panel wire from the front plate to the RAK19003.

      ```Be careful not to let the seal fall out of place while connecting the solar panel wire.```  

19. Join the front and back plates together and fasten them with the six screws. 

      ```Tighten securely to maintain the weatherproof seal.```

20. Wrap the entire N-type connector and the exposed metal part of the Alfa antenna with self-adhering silicone tape, or use two layers of heat-shrink tubing for protection.  

21. Apply a bead of clear outdoor silicone caulk around the base of the N-type connector to prevent water from leaking into the box.

      ![](images/BuildRepeater1_SelfFuseTape.jpeg){ width="300" }
      ![](images/BuildRepeater1_Heatshrink.jpg){ width="300" }

22. (Optional) Add a bead of silicone caulk along the top edge of the box seal (between the two plates) and around the base of the antenna as extra waterproofing protection.
