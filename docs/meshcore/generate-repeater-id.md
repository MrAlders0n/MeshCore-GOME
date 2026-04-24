## Generating a Repeater ID

In Ottawa, we generate Repeater IDs manually to avoid accidentally reusing an ID that’s already in service. Follow the steps below to pick an available ID and program the matching private key onto your repeater.

!!! note "Why this is an issue"
    We are beginning to transition from 1-byte to 3-byte path sizes, and eventually will not need to worry about overlapping repeater id's. In the meantime, follow the steps in this section.

1. Go to the **[Ottawa Repeater ID List](../deployment/repeaters.md)** and choose an unused ID.
2. Open the **[MeshCore Key Generator](https://gessaman.com/mc-keygen/)**.
3. Type the unused ID(2-6 charectors) into the input field and click **Generate Key**.
4. Copy the **Private Key** value.
5. On the repeater console, run (replace `<PRIVATE-KEY>` with the value you copied):
   `set prv.key <PRIVATE-KEY>`
6. Reboot the repeater.

After reboot, the repeater will use that private key, and its public key will correspond to the ID you selected.