# Report (Step 2)
## Docker configuration

New container and Image to make a server that returns dynamic content.  
I created [`Express.js`](https://expressjs.com/) server running on port 3000, inside a _Docker_ container of image `http_infra/dynamic_http`, built in folder `Docker`.  
Server use `Node.js` to manage dependencies.
_Docker_ image is based on `node:16.13.2`.  
Container is exposed from port 9090 of docker virtual machine.  

## Server functionalities

Server provides list (size between 4 and 10) of `JSON` objects containing randomly generated passwords.  
A password is generated character by character, numbers and symbols included.  

To summary, server possess one default route:  

 + `/`

Uses packages are:  

 + Express
 + Chance (used to generate random data)

## Disclaimer 

When freshly downloading the repo, make sure to run `npm install` command in the folder (should be `src`) containing `package.json` file if you don't have the `node_module` folder.
