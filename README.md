# Introducción

Bienvenido a la app de Strasol, esta app se encarga de emitir seguros en el sistema Ibrokers.

## Requisitos

- Node v18.17.0
- El sdk de android en tu pc
- Jdk 11
- Un acceso al sistema ibrokers

## Instalación

Clona el proyecto

```bash
git clone https://github.com/Strasol-S-r-l/strasolapp

cd strasolapp

```

Lo primero que tenemos que hacer crear el archivo api.json
Una vez clonada la app es necesario que crees el json `enviroments/api.json` este json deberá tener esta configuración.

```bash

vim enviroments/api.json

```

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

En android es necesario crear el archivo `debug.keystore`

```bash
cd ./android/app/
keytool -genkeypair -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
```

ahora vuelve a la raiz del proyecto para instalar las dependencias de node, esto creará el folder node_modules en tu proyexto

```bash
npm install
npx react-native run-android
```

Ya deberia estar funcionando.
