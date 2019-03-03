# node-red-contrib-youless
## Node for the Youless LS120 device

Enter your device ip and optional password in the node settings. Attach a trigger to the input to receive Youless data.
The following values are reported. Each value type has its own output port (hover to see name), which sends a payload to the specified topic.

Available values:

* cnt: counter in kWh
* pwr: Pwer consumption in Watt
* lvl: moving average level (intensity of reflected light on analog meters)
* dev: deviation of reflection
* det: 
* con: connection status
* sts: Time until next status update with online monitoring
* cs0: kWh counter of S0 input
* ps0: Computed power
* raw: raw 10-bit light reflection level (without averaging)

