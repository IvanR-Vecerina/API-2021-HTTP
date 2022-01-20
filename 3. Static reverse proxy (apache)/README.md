# Report (Step 3)
## Docker configuration

This time, previous container are still available, but inaccessible through port mapping.  
Objective is centralize accesses to both static and dynamic server through reverse proxy.  
Reverse proxy will serve as unique entry point through whole application.  

In order to achieve this goal, I used new _Docker_ image named `http_infra/static_rp`, based on `php:8.1-apache`.  
Image is built in `Docker` folder.  
The resulting container will be exposed through port mapping on port 9090 (in replacement of all previous port mapping).  
Its role will be receive requests and transmit them to right servers, static or dynamic from step 1 and 2.  
Then, response is collected and sent by reverse proxy to requester.  

## Apache configuration files in image `php:8.1-apache`

Configuration files are located in `/etc/apache2/` folder.  
This folder contains (not complete list):  

 + `apache2.conf`, main configuration file
 + `sites-available` folder, containg virtual hosts configuration files
 + `sites-enabled` folder, containing current active sites (or virtual hosts)
 + `mods-available` folder, containing configuration files for Apache 2 modules
 + `mods-enabled` folder

## Apache configuration as reverse proxy

Apache 2 provide modules named `proxy` and `proxy_http`, which allow to use Apache web server as reverse proxy.  
Reverse proxy works on basis of routes and destination server.  
In configuration, these routes must appear from most specific to less specific, eventually with default route.  

In my case, only two servers are concerned, both static and dynamic from step 1 and 2.  
Static server will be accessed through the default route: `/`.  
Dynamic server will be accessed through the more specfific route: `/api/pwdgen/`.  

Moreover, in order to be reactive to right accesses, domain name `httpinfra.api.ch` is used as server name,  
implying URL host has to be this domain name.  

This domain name is fictive and does not exists outside local private network, meaning my computer is not able to resolve IP address from this domain name.  
In order to allow resolution, file `/etc/hosts` on UNIX-like operating systems, or `C:\WINDOWS\system32\drivers\etc\hosts` on Microsoft Windows series must be edited, to add IP address and domain name.  
In my case, it is `localhost httpinfra.api.ch` (localhost address is found in the file).  

About configuration files in folder `sites-available`, `000-default.conf` is reduced to empty virtual host, while `001-reverse-proxy.conf` contains all routes and destinations for reverse proxy.
The existence of `000-default.conf` will allow us to prevent a wrong url to be routed to the existing pages.

## About IP address destination of routes

These IP address come from _Docker_ containers.
Each container has an IP address.  
By default, container address is inside subnet `172.17.0.0/16` called `bridge`.  
Address allocation works on first-come/first-served principle, meaning address of a container from specific image can be different, according to others existing containers.  

This must be a problem.
Because my proxy configuration is static, IP addresses have to remain same between each executions, to allow reverse proxy to keep working correctly.  

In order to avoid this problem, I make sure to start with no container then running them in the same order each time (Not 100% guarentee).  
+ step 1's static http server (usually gets IP `172.17.0.2`)
+ step 2's dynamic express server (usually gets IP `172.17.0.3`)
+ this step's reverse proxy
