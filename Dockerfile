FROM node:latest

RUN npm install
CMD ["npm", "run", "start"]
