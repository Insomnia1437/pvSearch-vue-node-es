# vue_learn

## Requirement:

- Elastic Search 7.6
- nodejs as server
- vue + Element UI as front-end

## Usage

1. Save the EPICS PVs into Elastic Search (How? See this repo: [PV_crawler](https://github.com/Insomnia1437/PV_crawler))

2. Modify the file `server/index.js`:

```nodejs
const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200'],
});
```

Change localhost and port to your Elastic Search Cluster IP and Port.

3. run `npm install`

4. run `npm run build`

5. run `node server/index.js`, make sure default port 3001 is not taken.

## TODO

- Use [forever](https://www.npmjs.com/package/forever) to run nodejs server

- Using EPICS `cainfo` command to test whether PVs are available.