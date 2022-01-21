# Report (Step 5 + bonuses)
## Docker compose configuration

Docker compose is a tool that allows you to create cluster/stacks of container images. 
It is as simple as listing your services in a file, specifiy a source image or build for your service, and specify a few propreties/labels.

This last step consists in creating a reverse proxy with dynamic configuration to replace the one from step 3 in linking our services.
Before writing anything, we first take a look at the various bonus steps so as to have everything we need for them as well.
By doing so or docker compose has to be prepared to allow the following feature:
+ Dynamic proxy configuration (treafik can do that)
+ Load balancing: multiple server nodes (traefik can do that)
+ Load balancing: round robin vs sticky sessions (traefik does round robin by default but sticky sessions can be configured)
+ Dynamic cluster management (treafik can do it)
+ Management UI (Portainer does it easy)


## Step 5 (Dynamic proxy configuration)

To setup the dynamic proxy configuration we first need to add our 3 services to the `docker-compose.yml` file:
+ web (source: build of the step 4 web static page)
+ express (source: build of the step 2 express dynamic page)
+ reverse-proxy (source: traefik image)

Given the feature requirements, traefik was obviously the choice for our reverse proxy ([ref used for setup](https://juliensalinas.com/en/traefik-reverse-proxy-docker-compose-docker-swarm-nlpcloud/)).
Now to link them, we first need to expose the ports of the web and express services:
+ 80 (web)
+ 3000 (express)

Then, we create the links by first mapping the ports in the reverse-proxy service:
+ 80:80
+ 8080:8080 (this is to access traefik interface)

We also need to add the traefik rules labels to each service to specify which prefixes are used to access it (see `docker-compose.yml` file for exact syntax).
We now have a functional reverse-proxy.

## Bonus: Load balancing (multiple server nodes)
traefik already handles that for us. Thank you treafik!

## Bonus: Load balancing (round robin vs sticky sessions)
traefik is set up in roundrobin mode by default, so that's express service handled. 
However for the web service, we need to add a laber specifying that we want cookies enabled for it and another one to name said cookie (I used the generic name "web_static_cookie_name").
We now have sticky session for web service and round robin for the express service.

## Bonus: Dynamic cluster management + Management UI
For these last to bonuses we shall use Portainer. 
That requires us to add the Portainer service to our docker compose and map a port to access the interface (see `docker-compose.yml` file for details).
We can now manage our cluster through the Portainer interface. When adding/deleting serice instances we can see in the traefik logs that the load-balancing updates itself and make the respectively added/deleted ressources available/unavailable.
