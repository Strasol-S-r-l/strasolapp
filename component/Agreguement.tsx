import React , { useEffect, useState }from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import tema from '../enviroments/tema.json'
var navigation_: any;
const Agreguement = ({ navigation }: any) => {
    navigation_ = navigation;
    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
    }, []);

    const toBack = () => {
        navigation_.goBack();
    }

    return (
        <View style={{ backgroundColor: tema.background, flex: 1 }}>
            <ScrollView style={{ flex:1}}>
                <View style={{borderWidth:1,borderBlockColor:tema.primary,padding:8}}>
                    <Text style={{ color: tema.active, fontWeight: "bold", textAlign: "center",fontSize:20}}>TÉRMINOS Y CONDICIONES DE USO DE LA APLICACIÓN DE COLOCACIÓN DE SEGUROS</Text>
                    <View style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
                        <Text style={{ color: tema.active }}>Bienvenido a nuestra aplicación de cotización y colocación de seguros. Que operan bajo las licencias de los sistemas y tecnologías InsuranceTech de CloudBroker®. Antes de utilizar nuestros servicios, te pedimos que leas detenidamente los siguientes términos y condiciones. Al acceder y utilizar nuestra aplicación, aceptas cumplir con estos términos y condiciones.</Text>
                        <Text style={{ color: tema.active, fontWeight: "bold" }}>1.	Información Veraz:</Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	Al utilizar nuestra aplicación, reconoces y aceptas que la veracidad de la información proporcionada es de tu exclusiva responsabilidad.
                        </Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	La plataforma no asume ninguna responsabilidad por la exactitud de la información proporcionada por los usuarios. En caso de datos incorrectos, la responsabilidad recae en el usuario.
                        </Text>
                        <Text style={{ color: tema.active, fontWeight: "bold" }}>2.	Normativas del Mercado Asegurador:</Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	La aplicación esta fundamentada y elaborada en estricto rigor de la veracidad y correcta clasificación de la información cumpliendo con todas las normativas vigentes del mercado asegurador y sus alianzas corporativas.
                        </Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	Los usuarios deben familiarizarse con dichas normativas y aceptar que la plataforma opera de acuerdo con las mismas.
                        </Text>
                        <Text style={{ color: tema.active, fontWeight: "bold" }}>3.	Declaración Jurada:</Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	En el caso de solicitudes de información por parte de compañías de seguros, agentes, corredores de seguros y/o ajustadores, habilitados por la Autoridad de Pensiones y Seguros APS, el usuario reconoce que la información registrada se considera como parte de una declaración jurada.
                        </Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	El usuario se compromete a proporcionar información precisa y completa en todas las interacciones con terceros autorizados por la APS.
                        </Text>
                        <Text style={{ color: tema.active, fontWeight: "bold" }}>4.	Cumplimiento con la UIF:</Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	La aplicación cumple con los términos establecidos por la Unidad de Investigación Financiera (UIF) y sus instructivos vigentes.
                        </Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	En el cumplimiento de la normativa, la aplicación se reserva el derecho de ampliar la solicitud de información directamente o mediante entidades autorizadas, con la finalidad de dar estricto cumplimiento a las disposiciones establecidas por la autoridad del sector.
                        </Text>
                        <Text style={{ color: tema.active, fontWeight: "bold" }}>5.	Responsabilidades Legales:</Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	La plataforma no asume ninguna responsabilidad por daños, pérdidas o reclamaciones que surjan como resultado de la información proporcionada por los usuarios.
                        </Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	Los usuarios son responsables de cualquier consecuencia legal derivada de la veracidad o exactitud de la información proporcionada.
                        </Text>
                        <Text style={{ color: tema.active, fontWeight: "bold" }}>6.	Modificaciones en los Términos:</Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en la aplicación.
                        </Text>
                        <Text style={{ color: tema.active, width: "90%", marginLeft: "10%" }}>
                            o	Es responsabilidad del usuario revisar periódicamente los términos y condiciones actualizados.
                        </Text>
                        <Text style={{ color: tema.active }}>Al utilizar nuestra aplicación, aceptas todos los términos y condiciones establecidos anteriormente. Si no estás de acuerdo con alguno de estos términos, te instamos a que no utilices nuestros servicios. Estos términos y condiciones son efectivos a partir de la fecha de su última actualización.</Text>
                    </View>
                </View>

            </ScrollView>
            <View >
                <TouchableOpacity onPress={() => toBack()} style={{ backgroundColor: tema.primary, justifyContent: "center", alignItems: "center", height: 40, width: "100%" }}>
                    <Text style={{ color: tema.text, fontWeight: "bold" }}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );



};
export default Agreguement;