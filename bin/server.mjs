#!/usr/bin/env node
let shutdown_handler = null;
try {
    shutdown_handler = await (await import("../../flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs")).ShutdownHandlerApi.new().getShutdownHandler();

    const studis_selfservice_demo_backend_api = (await import("../src/Adapter/Api/StudisSelfserviceDemoBackendApi.mjs")).StudisSelfserviceDemoBackendApi.new(
        shutdown_handler
    );
    await studis_selfservice_demo_backend_api.runServer();
} catch (error) {
    console.error(error);

    if (shutdown_handler !== null) {
        await shutdown_handler.shutdown(
            1
        );
    } else {
        process.exit(1);
    }
}
