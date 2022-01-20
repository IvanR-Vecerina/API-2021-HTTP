# Report (Steps 1+4)
## Step 1
### Docker configuration

Static app is available through _Docker_ container from image `http_infra/static_http`, built in the `Docker` folder, where the dockerfile and source files of the static page are.  
The _Docker_ image is based on `php:8.1-apache` which provide both PHP interpreter and Apache 2 web server.  
Inside container, Apache 2 server is available on port 80.  
Container is exposed from port 9090 of docker virtual machine.  

### Static app content

I choose to use [`Personal`](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) _Bootstrap_ template as main page.  

All content is stored in `src` folder which is copied at _Docker_ image build time.  
Folder `src` contains [`Personal`](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) template.  

#### Modifications of [`Personal`](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) `index.html` file

 + H1 and H2 content on `Home` tab
 + `About me` tab text and image
 + `Home` backgroud image
 + Counts in the `About me` tab
 
## Step 4

This step consists of modifying the static page's content (from server of step 1), on the fly, directly in web browser.  
To achieve this, I used JavaScript in static page.  
Newly created script get data from dynamic server of step 2, before using the received data to modify page.  
Modifications are periodic, meaning each defined time interval, script will acquire data and modify page again.  

### Modifications of [`Personal`](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) template

 + Include new script called `passwordgen.js` through `script` markup, at end of `index.html` file
 + Create script called `passwordgen.js` in `assets/js` folder of template
 + Script behavior:
    - use `setInterval`, with 2500 milisecond and function called `loadPasswords`.
    - `loadPasswords` fetches data, and choose first item of JSON data recieved from step 2's server.
    - `loadPasswords` then change the `Email Me` section of the `Contact`tab.
