import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens
import { HelloWorldScreen } from './src/presentation/screens/HelloWorldScreen';
import { MessagesScreen } from './src/presentation/screens/MessagesScreen';
import { CalculadoraScreen } from './src/presentation/screens/calculadora';
import { CounterScreen } from './src/presentation/screens/CounterScreen';
import { CounterM3Screen } from './src/presentation/screens/CounterM3Screen';
import { BoxObjectModelScreen } from './src/presentation/screens/BoxObjectModelScreen';
import { DimensionScreen } from './src/presentation/screens/DimensionScreen';
import { PositionScreenRelat } from './src/presentation/screens/PositionScreenRelat';
import { PositionScreenAbs } from './src/presentation/screens/PositionScreenAbs';
import { FleexScreen } from './src/presentation/screens/FleexScreen';
import { FlexWrap } from './src/presentation/screens/FlexWrapScreen';
import { FlexDirectionRtl } from './src/presentation/screens/FlexDirectionRtl';
import { FlexScreenAliniarse } from './src/presentation/screens/AlingCenter';
import { AlinearContenido } from './src/presentation/screens/AlinearContenido';
import { RowGap } from './src/presentation/screens/RowGap';

const Stack = createNativeStackNavigator();

//aqui estan los screens (NO TOCAR)
const HomeScreen = ({ navigation }: any) => {
  const screens = [
    { name: 'HelloWorld', component: HelloWorldScreen, title: 'Hola Mundo' },
    { name: 'Messages', component: MessagesScreen, title: 'Mensajes' },
    { name: 'Calculadora', component: CalculadoraScreen, title: 'Calculadora' },
    { name: 'Counter', component: CounterScreen, title: 'Contador' },
    { name: 'CounterM3', component: CounterM3Screen, title: 'Contador M3' },
    { name: 'BoxModel', component: BoxObjectModelScreen, title: 'Box Model' },
    { name: 'Dimension', component: DimensionScreen, title: 'Dimensiones' },
    { name: 'PositionRelat', component: PositionScreenRelat, title: 'Position Relative' },
    { name: 'PositionAbs', component: PositionScreenAbs, title: 'Position Absolute' },
    { name: 'Flex', component: FleexScreen, title: 'Flex' },
    { name: 'FlexWrap', component: FlexWrap, title: 'Flex Wrap' },
    { name: 'FlexDirectionRtl', component: FlexDirectionRtl, title: 'Flex Direction RTL' },
    { name: 'AlignCenter', component: FlexScreenAliniarse, title: 'Align Center' },
    { name: 'AlinearContenido', component: AlinearContenido, title: 'Alinear Contenido' },
    { name: 'RowGap', component: RowGap, title: 'Row Gap' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Fundamentos RN</Text>
        <Text style={styles.subtitle}>Selecciona un tema:</Text>
        
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.name}
            style={styles.button}
            onPress={() => navigation.navigate(screen.name)}
          >
            <Text style={styles.buttonText}>{screen.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Menú Principal' }}
        />
        <Stack.Screen 
          name="HelloWorld" 
          component={HelloWorldScreen}
          options={{ title: 'Hola Mundo' }}
        />
        <Stack.Screen 
          name="Messages" 
          component={MessagesScreen}
          options={{ title: 'Mensajes' }}
        />
        <Stack.Screen 
          name="Calculadora" 
          component={CalculadoraScreen}
          options={{ title: 'Calculadora' }}
        />
        <Stack.Screen 
          name="Counter" 
          component={CounterScreen}
          options={{ title: 'Contador' }}
        />
        <Stack.Screen 
          name="CounterM3" 
          component={CounterM3Screen}
          options={{ title: 'Contador M3' }}
        />
        <Stack.Screen 
          name="BoxModel" 
          component={BoxObjectModelScreen}
          options={{ title: 'Box Model' }}
        />
        <Stack.Screen 
          name="Dimension" 
          component={DimensionScreen}
          options={{ title: 'Dimensiones' }}
        />
        <Stack.Screen 
          name="PositionRelat" 
          component={PositionScreenRelat}
          options={{ title: 'Position Relative' }}
        />
        <Stack.Screen 
          name="PositionAbs" 
          component={PositionScreenAbs}
          options={{ title: 'Position Absolute' }}
        />
        <Stack.Screen 
          name="Flex" 
          component={FleexScreen}
          options={{ title: 'Flex' }}
        />
        <Stack.Screen 
          name="FlexWrap" 
          component={FlexWrap}
          options={{ title: 'Flex Wrap' }}
        />
        <Stack.Screen 
          name="FlexDirectionRtl" 
          component={FlexDirectionRtl}
          options={{ title: 'Flex Direction RTL' }}
        />
        <Stack.Screen 
          name="AlignCenter" 
          component={FlexScreenAliniarse}
          options={{ title: 'Align Center' }}
        />
        <Stack.Screen 
          name="AlinearContenido" 
          component={AlinearContenido}
          options={{ title: 'Alinear Contenido' }}
        />
        <Stack.Screen 
          name="RowGap" 
          component={RowGap}
          options={{ title: 'Row Gap' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
