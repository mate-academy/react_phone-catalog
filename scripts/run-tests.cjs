const { spawn } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');
const cypress = require('cypress');

delete process.env.ELECTRON_RUN_AS_NODE;

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
  });
}

async function run() {
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const server = spawn(
    process.execPath,
    [
      path.resolve('node_modules/vite/bin/vite.js'),
      '--host',
      '127.0.0.1',
      '--port',
      String(port),
      '--strictPort',
    ],
    { stdio: 'inherit', env: process.env },
  );
  let serverError;

  server.on('error', error => {
    serverError = error;
  });

  const stop = () => server.kill();
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);

  try {
    let ready = false;

    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (serverError || server.exitCode !== null) {
        throw serverError || new Error('Vite stopped before tests started');
      }

      try {
        const response = await fetch(baseUrl);
        ready = response.ok;
      } catch {
        /* Server is still starting. */
      }

      if (ready) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 250));
    }

    if (!ready) {
      throw new Error('Vite did not start in time');
    }

    const result = await cypress.run({
      config: { baseUrl, video: false },
      browser: 'electron',
    });

    process.exitCode = result.failures || result.totalFailed ? 1 : 0;
  } finally {
    stop();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
