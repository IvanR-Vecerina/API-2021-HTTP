#!/bin/bash

docker run -d -p 8080:80 --name apache_static_rp http_infra/static_rp
