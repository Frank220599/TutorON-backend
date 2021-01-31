import cluster from 'cluster';
import os from 'os';

if (cluster.isMaster) {
    const cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on('exit', () => {
        cluster.fork()
    });
} else {
    require('./server')
}
