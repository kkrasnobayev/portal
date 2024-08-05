export > /usr/share/nginx/env.vars
node /usr/share/nginx/env-config.js --outputDir /usr/share/nginx/html/assets --enableLogging >> /usr/share/nginx/output.vars
nginx -g 'daemon off;'
