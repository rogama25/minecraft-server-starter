# minecraft-server-starter
A tiny web project that allows you to wake up a computer. Intended to use for a Minecraft server that shuts automatically down when there are no players connected, so your players can start it when they're gonna play.

## Requirements
* NodeJS with NPM
* A computer on the same network that supports Wake-On-Lan (or WoWLAN if the computer is connected through Wi-Fi)

## Installation
* Clone this repository
* Run `npm install`
* Open index.js with any text editor.
    * port: Set this to any available port. On most Unix OS you can't set this value lower than 1024
    * user: An user to access the web panel
    * password: A password to access the web panel
    * ip: The server internal IP. You can keep the default if you don't want to show the online status in the web
    * mac: The MAC address of your computer's network card. Remember to use the Ethernet one if you are connected through cable or the wi-fi one if not
* Run `npm run start`
