FROM node:12
WORKDIR /app
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/ahdsoftware.json
CMD ls -ltr && npm install && npm start
