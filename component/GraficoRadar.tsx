import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import { Line, Svg, Text, Polygon, Circle, G } from 'react-native-svg';

const GraficoRadar = (props: any) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const numPoints = props.points;
  const radius = props.radius;
  const label = props.labels;
  const lines = [];
  const points = [];

  const generateSymmetricCoordinates = (puntos, radio) => {
    let coordinates = [];
    let item = [];
    const numMax = Math.max(...props.datos);
    let centerX = props.ancho / 2;
    let centerY = props.alto / 2;
    let mainRadio = radio;
    for (let m = 0; m < (radio / 20); m++) {
      for (let i = 0; i < puntos; i++) {
        const angle = ((i+3) * 2 * Math.PI) / puntos;
        const radius = mainRadio;
        const x = centerX - radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);
        item.push({ x, y });
        if (m == 0) {
          let porcentaje = 0;
          if(props.datos[i]>0){
            porcentaje = (props.datos[i]/numMax)*100;
          }
          const lineLength = radius * (porcentaje / 100);
          const endX = centerX - lineLength * Math.cos(angle);
          const endY = centerY - lineLength * Math.sin(angle);
          lines.push({ startX: centerX, startY: centerY, endX, endY });
          points.push({ x: endX, y: endY })
        }
      }
      mainRadio = mainRadio - 20
      coordinates.push(item);
      item = [];
    }
    return coordinates;
  };

  const symmetricCoordinates = generateSymmetricCoordinates(numPoints, radius);

  const chartRadar = () => {
    let polygons = [];
    for (let m = 0; m < symmetricCoordinates.length; m++) {
      let obj = symmetricCoordinates[m];
      for (let i = 0; i < obj.length; i++) {
        polygons.push(<Polygon key={"capa_" + i + "_" + m}
          points={obj.map(point => `${point.x},${point.y}`).join(' ')}
          stroke={tema.primary}
        />);
      }
    }
    polygons.push(<Polygon key={"result_polygon"}
      points={points.map(point => `${point.x},${point.y}`).join(' ')}
      fill="rgba(0,0,0,0.5)"
      stroke={tema.primary}
    />);

    for (let j = 0; j < points.length; j++) {
      let obj = points[j];
      polygons.push(
        <Circle key={"circle_" + j} stroke={"skyblue"} strokeWidth={2} r={radius * 0.04} cx={obj.x} cy={obj.y} fill={"white"}></Circle>
      )
    }
    for (let j = 0; j < numPoints; j++) {
      const angle = ((j+3 )* 2 * Math.PI) / numPoints;
      let x = (props.ancho / 2) - (radius +5) * Math.cos(angle);
      let y = (props.alto / 2) - (radius +5) * Math.sin(angle);
      
      if (props.action) {
        polygons.push(
          <G key={"container_press"+j}>
          <Circle key={"rango_text_press"+j} onPress={() => props.action(j)} r={radius * 0.1} cx={x} cy={y}></Circle>
          <Text
              key={"texto_" + j}
              x={x}
              y={(y<(props.alto/2))? y:y+5}
              fontSize="10"
              fill={tema.text}
              textAnchor={(x<(props.ancho/2))? "end":"start"}
              onPress={() => props.action(j)}
            >{label[j]}
            </Text>
          </G>
        )
      } else {
        polygons.push(
          <Text
            key={"texto_" + j}
            x={x}
            y={(y<(props.alto/2))? y:y+5}
            fontSize="10"
            fill={tema.active}
            textAnchor={(x<(props.ancho/2))? "end":"start"}
            >{label[j]}
          </Text>
        )
      }

    }
    return polygons;
  }

  return (<View style={{ width: "100%", height: "100%" }}>
    <View>

    </View>
    <Svg width={props.ancho} height={props.alto} >
      {lines.map((line, index) => (
        <Line
          key={index + "_line_result"}
          x1={line.startX}
          y1={line.startY}
          x2={line.endX}
          y2={line.endY}
          stroke={"skyblue"}
          strokeWidth={2}
        />
      ))}
      {chartRadar()}
    </Svg>
  </View>
  );
};

export default GraficoRadar;