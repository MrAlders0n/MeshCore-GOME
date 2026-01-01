## Generating a Repeater ID

In Ottawa, we generate Repeater IDs manually to avoid accidentally reusing an ID that’s already in service. Follow the steps below to pick an available ID and program the matching private key onto your repeater.

!!! note "Why this is an issue"
    Repeater ID clashes are common because there are only 256 possible IDs (the first byte / two hex characters of the repeater’s private key), so as the network grows, generating keys during firmware flashing increasingly produces overlapping IDs by chance.

1. Go to the **[Ottawa Repeater ID List](../deployment/repeaters.md)**.  
2. Choose an unused ID from the list.  
3. Click the unused ID to open its key generator page.  
4. Click **Generate Key**.  
5. Copy the **Private Key** value.  
6. On the repeater console, run (replace `<PRIVATE-KEY>` with the value you copied):  
   `set prv.key <PRIVATE-KEY>`  
7. Reboot the repeater.

After reboot, the repeater will use that private key, and its public key will correspond to the ID you selected.