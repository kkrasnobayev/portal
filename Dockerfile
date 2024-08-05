FROM nginx:1.16.0-alpine
RUN apk add --update nodejs nodejs-npm
# copy artifact build from the 'build environment'
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/AscentPortal /usr/share/nginx/html
COPY ./env-config.js /usr/share/nginx
COPY ./startup.sh /usr/share/nginx
# COPY ./auth_config.json .
RUN chmod +x /usr/share/nginx/startup.sh

# expose port 80
EXPOSE 80



ENTRYPOINT /usr/share/nginx/startup.sh

