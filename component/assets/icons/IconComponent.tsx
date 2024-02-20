import React, { useEffect, useState } from 'react';
import { View, Dimensions, ImageBackground, StyleSheet, Image } from 'react-native';
import Svg, { G, Path, Defs, LinearGradient, Stop, Rect, Circle, Text, Ellipse } from 'react-native-svg';
import tema from '../../../enviroments/tema.json';
const IconComponent = ({ nameIcon, alto, ancho, colors, data }: any) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const paintIcon = () => {
        switch (nameIcon) {
            case "iconPolizaFot": return iconPolizaFot();
            case "iconSiniestroFot": return iconSiniestroFot();
            case "iconHomeFot": return iconHomeFot();
            case "iconOficinaFot": return iconOficinaFot();
            case "iconContactoFot": return iconContactoFot();
            case "iconLeftCircle": return iconLeftCircle();
            case "iconCheckTrue": return iconCheckTrue();
            case "iconCheckFalse": return iconCheckFalse();
            case "iconLupa": return iconLupa();
            case "iconCalendar": return iconCalendar();
            case "iconGPS": return iconGPS();
            case "iconGlobe": return iconGlobe();
            case "fondo": return fondo();
            case "call": return call();
            case "fondoCard": return fondoCard();
            case "fondoCardUsuario": return fondoCardUsuario();
            case "fondoCardCotizacion": return fondoCardCotizacion();
            case "Camara": return Camara();
            case "eye": return eye();
            case "eyeClose": return eyeClose();
            case "fondo_login": return fondo_login();
            case "border_input": return border_input();
            case "fondo_form": return fondo_form();
            case "fondo_load": return fondo_load();
            case "arrowLeft": return arrowLeft();
            case "arrowRight": return arrowRight();
            case "warningIcon": return warningIcon();
            case "logoutIcon": return logoutIcon();
        }

    }

    const iconPolizaFot = () => {
        return <Svg key={"iconPolizaFot"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 32 32">
            <Path
                d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28-6.24 1.28-5.088 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM10.048 19.136q-0.448 1.664 0.288 2.528 0.864 0.736 2.56 0.32t3.392-1.376 2.528-1.76 1.792-2.56 1.344-3.392-0.288-2.528q-0.864-0.736-2.56-0.32t-3.392 1.376-2.528 1.76-1.792 2.56-1.344 3.392zM14.592 14.592q0.864-0.864 3.008-2.112t2.656-0.704-0.736 2.656-2.112 2.976z"
            />
        </Svg>
    }
    const iconSiniestroFot = () => {
        return <Svg key={"iconSiniestroFot"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 32 32">
            <Path
                d="M0 26.016v-20q0-2.496 1.76-4.256t4.256-1.76h20q2.464 0 4.224 1.76t1.76 4.256v20q0 2.496-1.76 4.224t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.224zM4 26.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-20q-0.832 0-1.44 0.608t-0.576 1.408v20zM6.016 24v-1.984h1.984v-2.016q0-0.832 0.576-1.408t1.44-0.576h12q0.8 0 1.408 0.576t0.576 1.408v2.016h2.016v1.984h-20zM6.016 14.016v-2.016h5.984v-1.984q0-0.832 0.576-1.408t1.44-0.608h4q0.8 0 1.408 0.608t0.576 1.408v1.984h6.016v2.016h-20zM10.016 22.016h12v-2.016h-12v2.016zM14.016 12h4v-1.984h-4v1.984z"
            />
        </Svg>
    }
    const iconHomeFot = () => {
        return <Svg key={"iconHomeFot"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 23 23">
            <Path
                fill='none'
                d="M2 20.0001H4M4 20.0001H10M4 20.0001V11.4522C4 10.9179 4 10.6506 4.06497 10.4019C4.12255 10.1816 4.21779 9.97307 4.3457 9.78464C4.49004 9.57201 4.69064 9.39569 5.09277 9.04383L9.89436 4.84244C10.6398 4.19014 11.0126 3.86397 11.4324 3.73982C11.8026 3.63035 12.1972 3.63035 12.5674 3.73982C12.9875 3.86406 13.3608 4.19054 14.1074 4.84383L18.9074 9.04383C19.3095 9.39568 19.5102 9.57202 19.6546 9.78464C19.7825 9.97307 19.877 10.1816 19.9346 10.4019C19.9995 10.6506 20 10.9179 20 11.4522V20.0001M10 20.0001H14M10 20.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V20.0001M14 20.0001H20M20 20.0001H22"
                stroke={colors.color_1}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    }

    const iconOficinaFot = () => {
        return <Svg key={"iconOficinaFot"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 25 25">
            <Path
                d="M17,4v14.967l-4.212-1.805L12,16.824l-0.788,0.338L7,18.967V4H17 M17,2H7C5.9,2,5,2.9,5,4v18l7-3l7,3V4C19,2.9,18.1,2,17,2 L17,2z"
            />
        </Svg>
    }
    const iconContactoFot = () => {
        return <Svg key={"iconContactoFot"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 23 23">
            <Path
                d="M18,2H6C4.895,2,4,2.895,4,4v16c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2V4C20,2.895,19.105,2,18,2z M12,6 c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S10.3,6,12,6z M17,18H7c0,0,0-0.585,0-1c0-1.571,2.512-3,5-3s5,1.429,5,3 C17,17.415,17,18,17,18z"
            />
        </Svg>
    }
    const iconLeftCircle = () => {
        return <Svg key={"iconLeftCircle"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 23 23">
            <G id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)" />
            <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#ff8647" strokeWidth="0.048" />
            <G id="SVGRepo_iconCarrier">
                <G id="Arrow / Caret_Circle_Left">
                    <Path id="Vector" d="M13 15L10 12L13 9M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                </G>
            </G>
        </Svg>
    }
    const iconCheckTrue = () => {
        return <Svg key={"iconCheckTrue"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 23 23">
            <Path
                fill='none' d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    }
    const iconCheckFalse = () => {
        return <Svg key={"iconCheckFalse"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 23 23">
            <Path
                fill='none' d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    }


    const iconCloudDownload = () => {
        return <Svg key={"iconContactoFot"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 34 34">
            <G id="SVGRepo_bgCarrier" strokeWidth="0" />
            <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.0" />
            <G id="SVGRepo_iconCarrier">
                <Path
                    d="M0 16q0 2.912 1.824 5.088t4.576 2.752q0.032 0 0.032-0.032v-0.064t0.032-0.032q0.544-1.344 1.344-2.176t2.208-1.184v-2.336q0-2.496 1.728-4.256t4.256-1.76 4.256 1.76 1.76 4.256v2.336q1.376 0.384 2.176 1.216t1.344 2.144l0.096 0.288h0.384q2.464 0 4.224-1.76t1.76-4.224v-2.016q0-2.464-1.76-4.224t-4.224-1.76q-0.096 0-0.32 0.032 0.32-1.152 0.32-2.048 0-3.296-2.368-5.632t-5.632-2.368q-2.88 0-5.056 1.824t-2.784 4.544q-1.152-0.352-2.176-0.352-3.296 0-5.664 2.336t-2.336 5.664v1.984zM10.016 25.824q-0.096 0.928 0.576 1.6l4 4q0.576 0.576 1.408 0.576t1.408-0.576l4-4q0.672-0.672 0.608-1.6-0.064-0.32-0.16-0.576-0.224-0.576-0.736-0.896t-1.12-0.352h-1.984v-5.984q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v5.984h-2.016q-0.608 0-1.12 0.352t-0.736 0.896q-0.096 0.288-0.128 0.576z" />
            </G>
        </Svg>
    }

    const iconLupa = () => {
        return <Svg key={"iconLupas"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 23 23">
            <Path
                d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
        </Svg>
    }


    const iconCalendar = () => {
        return <Svg key={"iconCalendar"} fill={colors.color_1} width={ancho} height={alto} viewBox="0 0 32 32">
            <Path
                d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-1.952-1.12-3.488t-2.88-2.144v2.624q0 1.248-0.864 2.144t-2.144 0.864-2.112-0.864-0.864-2.144v-3.008h-12v3.008q0 1.248-0.896 2.144t-2.112 0.864-2.144-0.864-0.864-2.144v-2.624q-1.76 0.64-2.88 2.144t-1.12 3.488v20zM4 26.016v-16h24v16q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 3.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.288-0.704v-3.008h-1.984v3.008zM8 24h4v-4h-4v4zM8 18.016h4v-4h-4v4zM14.016 24h4v-4h-4v4zM14.016 18.016h4v-4h-4v4zM20 24h4v-4h-4v4zM20 18.016h4v-4h-4v4zM24 3.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.32-0.704v-3.008h-2.016v3.008z" />
        </Svg>
    }


    const iconGPS = () => {
        return <Svg width={ancho} height={alto} fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <Path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z" stroke={colors.color_1} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
            </G>
        </Svg>
    }


    const iconGlobe = () => {
        return <Svg width={ancho} height={alto} fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <Path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 12C21 10.3431 16.9706 9 12 9C7.02944 9 3 10.3431 3 12M12 21C7.02944 21 3 16.9706 3 12M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M3 12C3 7.02944 7.02944 3 12 3" stroke={colors.color_1} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
            </G>
        </Svg>
    }

    const fondo = () => {
        return <Svg width={screenWidth} height={"100%"}>
            <Defs>
                <LinearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset={"20%"} stopColor={colors.color_1}>
                    </Stop>
                    <Stop offset="80%" stopColor={colors.color_2}>
                    </Stop>
                </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
        </Svg>
    }

    const call = () => {
        return <Svg viewBox="0 0 24 24" fill={colors.color_1} width={ancho} height={alto} stroke-width="1.45">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier" >
                <G id="style=stroke" >
                    <G id="call" >
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.59 2.75C5.08187 2.75 4.56293 2.95593 4.03614 3.47449L4.03046 3.48008L4.02467 3.48555C3.56991 3.91456 3.25506 4.38355 3.05792 4.88459L3.05637 4.88855C2.85415 5.39409 2.75 5.94888 2.75 6.54C2.75 7.46267 2.96266 8.45326 3.41075 9.51784C3.86507 10.5871 4.49483 11.6779 5.28758 12.7803C6.0935 13.887 6.99752 14.9469 8.00038 15.9597C9.01353 16.9629 10.0741 17.8675 11.1922 18.6842C12.291 19.4842 13.3917 20.1146 14.484 20.58C15.5587 21.0379 16.5486 21.25 17.45 21.25C18.0548 21.25 18.6064 21.1382 19.1115 20.9277L19.1156 20.926C19.4724 20.7798 19.8037 20.5736 20.1178 20.2981C20.2363 20.1941 20.353 20.0797 20.468 19.9541L20.783 19.5559C20.8817 19.4096 20.9671 19.2579 21.0418 19.0997C21.1653 18.8383 21.22 18.5775 21.22 18.33C21.22 18.1689 21.1879 18.0176 21.1189 17.8418C21.072 17.74 20.9913 17.6362 20.8331 17.5266L20.8258 17.5216L17.5222 15.1761C17.3028 15.0273 17.1216 14.9278 16.966 14.8642C16.8238 14.806 16.7201 14.79 16.64 14.79C16.5438 14.79 16.4472 14.8132 16.32 14.8906L16.2988 14.9035L16.2769 14.9149C16.1389 14.987 15.96 15.1207 15.7403 15.3403L15.7368 15.3438L14.9782 16.0924C14.7355 16.3341 14.4185 16.48 14.04 16.48C13.8919 16.48 13.7163 16.4633 13.5267 16.3922L13.5105 16.3862L13.4946 16.3794C13.4492 16.3599 13.4073 16.3406 13.38 16.328C13.3476 16.3132 13.3366 16.3084 13.3315 16.3064L13.2944 16.2915L13.2591 16.2728C12.8536 16.0582 12.3777 15.7213 11.8355 15.2625L11.8346 15.2617C11.2851 14.7952 10.7507 14.2912 10.2046 13.7553L10.1996 13.7503L10.1946 13.7453C9.66123 13.2016 9.1705 12.6596 8.71287 12.1308L8.70742 12.1245C8.25416 11.5888 7.90702 11.1141 7.69158 10.7191L7.6596 10.6605L7.63858 10.5975C7.63857 10.5975 7.63602 10.5904 7.62302 10.5597C7.62193 10.5571 7.62075 10.5544 7.61951 10.5514C7.60704 10.522 7.58736 10.4756 7.56775 10.4233L7.55275 10.3833L7.54239 10.3419C7.51008 10.2127 7.49 10.081 7.49 9.93C7.49 9.59078 7.6056 9.26699 7.86359 9.00579L8.62454 8.2148L8.62967 8.20967C8.83569 8.00365 8.97896 7.81685 9.06708 7.66096L9.07305 7.6504L9.07935 7.64004C9.15514 7.51553 9.18 7.40903 9.18 7.32C9.18 7.25575 9.16141 7.14722 9.10064 7.00544L9.09574 6.99401C9.03236 6.83908 8.93418 6.66049 8.78135 6.44823L8.7783 6.44399L6.45332 3.16694C6.35577 3.02604 6.23429 2.92955 6.08571 2.86097L6.07541 2.85622C5.9331 2.78791 5.76498 2.75 5.59 2.75ZM2.98958 2.39989C3.74153 1.66198 4.62059 1.25 5.59 1.25C5.97318 1.25 6.36311 1.33138 6.71941 1.5014C7.08755 1.67229 7.42309 1.93393 7.68396 2.30922L10.0003 5.574C10.2053 5.85906 10.3657 6.13796 10.4818 6.42035C10.5997 6.6971 10.68 7.00644 10.68 7.32C10.68 7.70687 10.5673 8.07663 10.367 8.40939C10.1968 8.70784 9.96427 8.99567 9.69563 9.26502L9.00688 9.98096C9.01385 9.99743 9.02321 10.0197 9.03333 10.0455C9.183 10.3079 9.44802 10.6772 9.84989 11.1524C10.29 11.6609 10.7568 12.1761 11.2604 12.6897C11.7923 13.2116 12.2961 13.6858 12.8048 14.1178C13.2858 14.5247 13.6606 14.7841 13.933 14.9322C13.955 14.9417 13.9753 14.9509 13.9918 14.9584L14.6815 14.2778C14.955 14.0046 15.2482 13.7638 15.5612 13.5966C15.8882 13.4019 16.2447 13.29 16.64 13.29C16.9399 13.29 17.2362 13.354 17.534 13.4758C17.8169 13.5916 18.0939 13.7509 18.3717 13.9398L18.378 13.9441L21.6909 16.2961C22.0455 16.5425 22.3234 16.8545 22.4965 17.2479L22.5016 17.2596L22.5064 17.2715C22.6338 17.59 22.72 17.9351 22.72 18.33C22.72 18.8025 22.6147 19.2817 22.3982 19.7403C22.2879 19.9738 22.1587 20.2021 22.0066 20.424C21.8842 20.6025 21.7478 20.7758 21.5957 20.9436C21.4394 21.1159 21.2765 21.277 21.107 21.4257C20.6756 21.8042 20.2043 22.1007 19.6865 22.3131C18.9922 22.6021 18.2445 22.75 17.45 22.75C16.3114 22.75 15.1213 22.4821 13.896 21.96C12.6885 21.4455 11.4895 20.7561 10.3086 19.8963L10.3076 19.8956C9.12671 19.0331 8.00824 18.0786 6.94224 17.0229L6.93709 17.0178C5.88147 15.9519 4.92677 14.8332 4.07368 13.6614L4.07114 13.658C3.22474 12.4813 2.5351 11.293 2.0297 10.1032L2.02877 10.101C1.51719 8.88605 1.25 7.69701 1.25 6.54C1.25 5.77184 1.3856 5.02732 1.66286 4.33342C1.94487 3.61753 2.38783 2.96904 2.98958 2.39989Z" fill={colors.color_10} ></Path>
                    </G>
                </G>
            </G>
        </Svg>
    }

    const fondoCard = () => {
        return <Svg width={ancho} height={alto} >
            <Defs>
                <LinearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset="0%" stopColor={colors.color_1} stopOpacity={colors.opacity}>
                    </Stop>
                    <Stop offset="100%" stopColor={colors.color_2} stopOpacity={colors.opacity}>
                    </Stop>
                </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" rx={10} ry={10} height="100%" fill="url(#gradient)" />
        </Svg>
    }

    const fondoCardUsuario = () => {
        return <Svg style={{ width: "100%", height: "100%" }}>
            <Rect x="" y="0" width="100%" rx={10} ry={10} height="100%" fill={colors.color_2} />
            <Ellipse stroke={"skyblue"} strokeWidth={2} rx="20%" ry="60%" cx="35%" cy="50%" fill={colors.color_1}></Ellipse>
            <Rect x="" y="0" width="30%" rx={10} ry={10} height="100%" fill={colors.color_1} />

            <Circle stroke={"skyblue"} strokeWidth={2} r="5%" cx="52%" cy="17%" fill={"white"}></Circle>
            <Circle stroke={"skyblue"} strokeWidth={2} r="5%" cx="55%" cy="50%" fill={"white"}></Circle>
            <Circle stroke={"skyblue"} strokeWidth={2} r="5%" cx="52%" cy="83%" fill={"white"}></Circle>
        </Svg>
    }

    const fondoCardCotizacion = () => {
        return <Svg style={{ width: "100%", height: "100%" }}>
            <Rect x="" y="0" width="100%" rx={10} ry={10} height="100%" fill={colors.color_2} />
            <Ellipse stroke={"skyblue"} strokeWidth={2} rx="40%" ry="90%" cx="35%" cy="50%" fill={colors.color_1}></Ellipse>
            <Rect x="" y="0" width="30%" rx={10} ry={10} height="100%" fill={colors.color_1} />


        </Svg>
    }

    const Camara = () => {
        return <Svg
            width="100%" height="100%" viewBox="0 0 1280.000000 984.000000"
            preserveAspectRatio="xMidYMid meet">
            <G transform="translate(0.000000,984.000000) scale(0.100000,-0.100000)"
                fill={colors.color} stroke="none">
                <Path d="M4785 9820 c-163 -36 -266 -93 -386 -213 -132 -133 -203 -256 -586
        -1022 -195 -390 -357 -712 -360 -715 -3 -3 -496 -7 -1096 -10 -1061 -6 -1095
        -7 -1182 -27 -412 -95 -742 -329 -955 -678 -96 -156 -157 -329 -195 -551 l-25
        -143 0 -2524 c0 -1563 4 -2544 10 -2578 5 -30 16 -97 25 -149 99 -585 587
        -1074 1175 -1174 52 -9 119 -21 149 -26 74 -14 10008 -14 10082 0 30 5 97 17
        149 26 577 98 1057 567 1169 1142 43 224 42 153 39 2797 -3 2377 -4 2536 -21
        2633 -47 270 -133 473 -288 678 -227 301 -567 502 -944 559 -84 12 -267 15
        -1140 15 -572 0 -1045 4 -1051 8 -6 4 -171 327 -367 717 -381 762 -454 890
        -584 1021 -121 122 -224 178 -395 214 -89 19 -137 20 -1617 19 -1424 -1 -1531
        -2 -1606 -19z m-3149 -2950 c174 -60 302 -209 334 -390 39 -216 -78 -438 -282
        -535 -329 -157 -708 84 -708 449 0 148 51 267 154 364 139 129 329 171 502
        112z m4959 20 c1070 -77 1992 -694 2460 -1645 161 -327 249 -627 291 -995 22
        -197 15 -555 -16 -754 -144 -940 -718 -1743 -1565 -2187 -423 -222 -866 -329
        -1365 -329 -281 0 -498 26 -743 90 -809 210 -1490 751 -1883 1495 -146 277
        -255 609 -304 931 -28 177 -38 539 -20 710 51 510 207 951 481 1364 591 889
        1612 1396 2664 1320z"/>
                <Path d="M6175 5386 c-628 -105 -1107 -575 -1221 -1197 -24 -130 -24 -381 1
        -509 58 -306 189 -555 409 -776 219 -218 442 -339 750 -406 146 -32 426 -32
        572 0 307 66 532 188 750 406 219 220 352 471 409 776 25 128 25 379 1 509
        -109 596 -556 1055 -1156 1186 -103 22 -408 29 -515 11z"/>
            </G>
        </Svg>
    }
    const eye = () => {
        return <Svg width={ancho} height={alto} viewBox={'0 0 24 24'} fill="none" >
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill='gray'></Path>
            </G>
        </Svg>
    }
    const eyeClose = () => {
        return <Svg width={ancho} height={alto} viewBox={'0 0 24 24'} fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z" fill='gray'></Path>
            </G>
        </Svg>
    }
    const arrowRight = () => {
        return <Svg width={ancho} height={alto} viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <Path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={colors.color_1} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
            </G>
        </Svg>
    }
    const arrowLeft = () => {
        return <Svg width={ancho} height={alto} viewBox="0 0 24 24" fill="none" >
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <Path d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={colors.color_1} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
            </G>
        </Svg>
    }
    const warningIcon = () => {
        return <Svg  width={ancho} height={alto}  viewBox="0 0 512 512" fill="#000000" stroke="#000000">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier">
                <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <G id="add" fill={colors.color_1} transform="translate(32.000000, 42.666667)">
                        <Path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z M225.144334,42.6739678 L42.6666667,362.009885 L407.622001,362.009885 L225.144334,42.6739678 Z M224,272 C239.238095,272 250.666667,283.264 250.666667,298.624 C250.666667,313.984 239.238095,325.248 224,325.248 C208.415584,325.248 197.333333,313.984 197.333333,298.282667 C197.333333,283.264 208.761905,272 224,272 Z M245.333333,106.666667 L245.333333,234.666667 L202.666667,234.666667 L202.666667,106.666667 L245.333333,106.666667 Z" id="Combined-Shape">
                        </Path>
                    </G>
                </G>
            </G>
        </Svg>
    }
    const logoutIcon = () => {
        return <Svg  width={ancho} height={alto}  viewBox="0 0 24 24" fill="none" >
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier"> 
            <Path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5" stroke={colors.color_1} stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            </Path> 
            </G>
            </Svg>
    }


    const fondo_login = () => {
        return <Image
            style={styles.background}
            source={require('./../../../images/main_fondo_02.png')}
        />
    }
    const fondo_load = () => {
        return <Image
            style={styles.background}
            source={require('./../../../images/fondo_load.png')}
        />
    }
    const fondo_form = () => {
        return <Image
            style={styles.background}
            source={require('./../../../images/fondo_form.png')}
        />
    }

    const border_input = () => {
        return <Svg width="100%" height="100%">
            <Defs>
                <LinearGradient id={data.id} x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="5%" stopColor={tema.primary} stopOpacity={1}>
                    </Stop>
                    <Stop offset="90%" stopColor={data.color} stopOpacity={1}>
                    </Stop>
                </LinearGradient>
            </Defs>
            <Rect x="5%" y="5%" width="90%" height="90%" rx={15} ry={15} fill="none" stroke={"url(#" + data.id + ")"} strokeWidth={5} />
        </Svg>
    }
    return <View>
        {paintIcon()}
    </View>
};
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: 'stretch'
    }
});
export default IconComponent;
