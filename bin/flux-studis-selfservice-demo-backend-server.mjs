#!/usr/bin/env node
try {
    const studis_selfservice_demo_backend_api = (await import("../src/Adapter/Api/StudisSelfserviceDemoBackendApi.mjs")).StudisSelfserviceDemoBackendApi.new();

    await studis_selfservice_demo_backend_api.init();

    studis_selfservice_demo_backend_api.runServer();
} catch (error) {
    console.error(error);

    process.exit(1);
}
