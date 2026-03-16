import React, { useState } from 'react';
import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DirectionType = 'ltr' | 'rtl';

export const FlexDirectionRtl = () => {
  const [direction, setDirection] = useState<DirectionType>(I18nManager.isRTL ? 'rtl' : 'ltr');

  const handleDirectionChange = (value: DirectionType) => {
    // Cambia la configuracion global RTL/LTR del sistema de RN.
    I18nManager.allowRTL(value === 'rtl');
    I18nManager.forceRTL(value === 'rtl');

    // Tambien actualiza este ejemplo en tiempo real sin reiniciar.
    setDirection(value);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Direction: {direction.toUpperCase()}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleDirectionChange('ltr')}
          style={[styles.button, direction === 'ltr' && styles.selected]}
        >
          <Text style={[styles.buttonLabel, direction === 'ltr' && styles.selectedLabel]}>
            ltr
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDirectionChange('rtl')}
          style={[styles.button, direction === 'rtl' && styles.selected]}
        >
          <Text style={[styles.buttonLabel, direction === 'rtl' && styles.selectedLabel]}>
            rtl
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.container, { direction }]}>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>

      <Text style={styles.note}>Nota: forceRTL aplica globalmente y puede requerir recargar la app.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, // Ocupa toda la pantalla.
    padding: 15, // Espacio alrededor del ejercicio.
    backgroundColor: '#395083', // Fondo oscuro para contraste.
  },
  title: {
    fontSize: 24, // Tamano del titulo.
    textAlign: 'center', // Centra el titulo.
    color: 'white', // Color de texto.
    marginBottom: 10, // Separacion del bloque de botones.
    fontWeight: '800', // Grosor semibold.
  },
  row: {
    flexDirection: 'row', // Coloca botones en fila.
    justifyContent: 'space-between', // Distribuye botones horizontalmente.
    marginBottom: 10, // Espacio antes del contenedor principal.
  },
  button: {
    backgroundColor: '#f4e4bc', // Fondo base del boton.
    paddingHorizontal: 18, // Espacio interno horizontal.
    paddingVertical: 8, // Espacio interno vertical.
    borderRadius: 8, // Bordes redondeados.
    minWidth: '48%', // Mitad del ancho para dos botones por fila.
    alignItems: 'center', // Centra el texto del boton.
  },
  selected: {
    backgroundColor: '#ff7f50', // Resalta boton seleccionado.
  },
  buttonLabel: {
    color: '#ff7f50', // Color de texto normal del boton.
    fontSize: 14, // Tamano de texto.
    fontWeight: '600', // Texto semibold.
  },
  selectedLabel: {
    color: 'white', // Color de texto del boton activo.
  },
  container: {
    flex: 1, // Ocupa el resto de la pantalla.
    marginTop: 8, // Espacio superior dentro del ejercicio.
    backgroundColor: '#eaf4ff', // Fondo claro para ver el orden visual.
    justifyContent: 'flex-start', // Alinea cajas al inicio vertical.
    flexDirection: 'row', // Coloca cajas en horizontal.
    alignItems: 'center', // Centra cajas sobre el eje vertical.
  },
  note: {
    marginTop: 10, // Espacio con respecto al contenedor de cajas.
    color: '#d1d5db', // Texto claro sobre fondo oscuro.
    textAlign: 'center', // Centra el mensaje de ayuda.
    fontSize: 12, // Tamano pequeno de nota.
  },
  box: {
    width: 90, // Ancho fijo de cada caja.
    height: 90, // Alto fijo de cada caja.
    marginHorizontal: 6, // Separacion lateral entre cajas.
  },
  box1: {
    backgroundColor: 'powderblue', // Caja 1.
  },
  box2: {
    backgroundColor: 'skyblue', // Caja 2.
  },
  box3: {
    backgroundColor: 'steelblue', // Caja 3.
  },
});