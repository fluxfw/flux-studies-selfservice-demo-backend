# flux-studis-selfservice-demo-backend

```shell
docker run --rm -p [%host_ip%:]80:80 fluxfw/flux-studis-selfservice-demo-backend:vYYYY-MM-DD-I
```

## Config

| Config | Default value | Environment variable | Cli parameter | Config JSON file |
| ------ | ------------- | -------------------- | ------------- | ---------------- |
| Config JSON file<br>(Root entry need to be an object) | *-* | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_CONFIG_FILE` | `--config-file ...` | *-* |
| Server disable http if https is used | `true` | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_DISABLE_HTTP_IF_HTTPS`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_DISABLE_HTTP_IF_HTTPS_FILE` | `--server-disable-http-if-https ...`<br>`--server-disable-http-if-https-file ...` | `"server-disable-http-if-https": ...`<br>`"server-disable-http-if-https-file": "..."` |
| Server HTTPS certificate<br>(HTTPS is only used if this config is set) | *-* | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_HTTPS_CERTIFICATE`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_HTTPS_CERTIFICATE_FILE` | `--server-https-certificate ...`<br>`--server-https-certificate-file ...` | `"server-https-certificate": "..."`<br>`"server-https-certificate-file": "..."` |
| Server HTTPS dh param | *-* | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_HTTPS_DHPARAM`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_HTTPS_DHPARAM_FILE` | `--server-https-dhparam ...`<br>`--server-https-dhparam-file ...` | `"server-https-dhparam": "..."`<br>`"server-https-dhparam-file": "..."` |
| Server HTTPS private key<br>(HTTPS is only used if this config is set) | *-* | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_HTTPS_KEY`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_HTTPS_KEY_FILE` | `--server-https-key ...`<br>`--server-https-key-file ...` | `"server-https-key": "..."`<br>`"server-https-key-file": "..."` |
| Server listen HTTP port<br>(Set to `0` for explicit disable HTTP) | `80` | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_LISTEN_HTTP_PORT`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_LISTEN_HTTP_PORT_FILE` | `--server-listen-http-port ...`<br>`--server-listen-http-port-file ...` | `"server-listen-http-port": ...`<br>`"server-listen-http-port-file": "..."` |
| Server listen HTTPS port<br>(Set to `0` for explicit disable HTTPS) | `443` | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_LISTEN_HTTPS_PORT`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_LISTEN_HTTPS_PORT_FILE` | `--server-listen-https-port ...`<br>`--server-listen-https-port-file ...` | `"server-listen-https-port": ...`<br>`"server-listen-https-port-file": "..."` |
| Server listen interface | *-* | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_LISTEN_INTERFACE`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_LISTEN_INTERFACE_FILE` | `--server-listen-interface ...`<br>`--server-listen-interface-file ...` | `"server-listen-interface": "..."`<br>`"server-listen-interface-file": "..."` |
| Enable server redirects HTTP to HTTPS | `false` | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_REDIRECT_HTTP_TO_HTTPS`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_REDIRECT_HTTP_TO_HTTPS_FILE` | `--server-redirect-http-to-https ...`<br>`--server-redirect-http-to-https-file ...` | `"server-redirect-http-to-https": ...`<br>`"server-redirect-http-to-https-file": "..."` |
| Server redirect HTTP to HTTPS port | `443` | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_REDIRECT_HTTP_TO_HTTPS_PORT`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_REDIRECT_HTTP_TO_HTTPS_PORT_FILE` | `--server-redirect-http-to-https-port ...`<br>`--server-redirect-http-to-https-port-file ...` | `"server-redirect-http-to-https-port": ...`<br>`"server-redirect-http-to-https-port-file": "..."` |
| HTTP status code server redirects HTTP to HTTPS | `302` | `FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE`<br>`FLUX_STUDIS_SELFSERVICE_DEMO_BACKEND_SERVER_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_FILE` | `--server-redirect-http-to-https-status-code ...`<br>`--server-redirect-http-to-https-status-code-file ...` | `"server-redirect-http-to-https-status-code": ...`<br>`"server-redirect-http-to-https-status-code-file": "..."` |

Required config are **bold**
