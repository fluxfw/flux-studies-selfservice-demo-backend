#!/usr/bin/env node
try {
    const studies_selfservice_demo_backend_api = (await import("../src/Adapter/Api/StudiesSelfserviceDemoBackendApi.mjs")).StudiesSelfserviceDemoBackendApi.new();

    await studies_selfservice_demo_backend_api.init();

    studies_selfservice_demo_backend_api.runServer();
} catch (error) {
    console.error(error);

    process.exit(1);
}
