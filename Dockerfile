RUN npm run client-install
RUN npm run server
RUN npm run bundle
CMD ["npm","start"]