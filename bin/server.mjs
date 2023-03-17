#!/usr/bin/env node
let flux_shutdown_handler = null;
try {
    flux_shutdown_handler = (await import("../../flux-shutdown-handler/src/FluxShutdownHandler.mjs")).FluxShutdownHandler.new();

    await (await import("../src/FluxStudisSelfserviceDemoBackend.mjs")).FluxStudisSelfserviceDemoBackend.new(
        flux_shutdown_handler
    )
        .runServer();
} catch (error) {
    console.error(error);

    if (flux_shutdown_handler !== null) {
        await flux_shutdown_handler.shutdown(
            1
        );
    } else {
        process.exit(1);
    }
}
