# Inroducción

Bienvenido a la app de Strasol, esta app se encarga de emitir seguros en el sistema Ibrokers.

## Ajustes adicionales
Una vez clonada la app es necesario que crees el json `enviroments/api.json` este json deberá tener esta configuración.

```json
{
    "url":"https://xxx.com",
    "key":"XX-XX-XX-XX-XX",
    "url_gvision":"https://xxx",
    "vimeo": {
        "key":"xxx",
        "channel":"xxx"
    }
}
```
Si agregando el json anterior aún continua sin funcionar deber crear el `debug.keystore`

```bash
cd ./android/app/
keytool -genkeypair -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
```
