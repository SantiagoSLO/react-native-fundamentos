import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase, Message } from '../../supabase';

export const MessagesScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Verificar conexión al iniciar
  useEffect(() => {
    checkConnection();
  }, []);

  // Función para verificar conexión
  const checkConnection = async () => {
    try {
      const { error } = await supabase.from('messages').select('id').limit(1);
      if (error) {
        console.log('Supabase connection error:', error.message);
        setConnectionStatus('disconnected');
      } else {
        console.log('Supabase connected successfully!');
        setConnectionStatus('connected');
      }
    } catch (err) {
      console.log('Supabase connection failed:', err);
      setConnectionStatus('disconnected');
    }
  };

  // Cargar mensajes al iniciar
  useEffect(() => {
    fetchMessages();
  }, []);

  // Función para obtener todos los mensajes
  const fetchMessages = async () => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    try {
      setLoading(true);
      setError(null);
      
      // Crear AbortController para cancelar la petición
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const { data, error: supabaseError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      clearTimeout(timeoutId);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message || 'Error de Supabase');
      }
      
      setMessages(data || []);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        setError('Tiempo de conexión agotado');
      } else {
        setError(err.message || 'No se pudo conectar a la base de datos');
      }
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un nuevo mensaje
  const addMessage = async () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Por favor escribe un mensaje');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('messages')
        .insert([{ content: newMessage }]);

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(error.message);
      }
      
      setNewMessage('');
      fetchMessages(); // Recargar la lista
      Alert.alert('Éxito', 'Mensaje agregado');
    } catch (err: any) {
      console.error('Error adding message:', err);
      Alert.alert('Error', err.message || 'No se pudo agregar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar edición
  const startEdit = (message: Message) => {
    setEditingId(message.id);
    setEditText(message.content);
  };

  // Función para guardar la edición
  const saveEdit = async () => {
    if (!editText.trim()) {
      Alert.alert('Error', 'El mensaje no puede estar vacío');
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .update({ content: editText, updated_at: new Date().toISOString() })
        .eq('id', editingId);

      if (error) throw error;
      
      setEditingId(null);
      setEditText('');
      fetchMessages();
      Alert.alert('Éxito', 'Mensaje actualizado');
    } catch (error) {
      console.error('Error updating message:', error);
      Alert.alert('Error', 'No se pudo actualizar el mensaje');
    }
  };

  // Función para eliminar un mensaje
  const deleteMessage = async (id: number) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar este mensaje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

              if (error) throw error;
              
              fetchMessages();
              Alert.alert('Éxito', 'Mensaje eliminado');
            } catch (error) {
              console.error('Error deleting message:', error);
              Alert.alert('Error', 'No se pudo eliminar el mensaje');
            }
          },
        },
      ]
    );
  };

  // Renderizar cada mensaje
  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      {editingId === item.id ? (
        // Modo edición
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            autoFocus
          />
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => { setEditingId(null); setEditText(''); }}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Modo visualización
        <View>
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.dateText}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => startEdit(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => deleteMessage(item.id)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mensajes</Text>
      
      {/* Indicador de conexión */}
      <View style={[
        styles.connectionIndicator,
        connectionStatus === 'connected' && styles.connectedIndicator,
        connectionStatus === 'disconnected' && styles.disconnectedIndicator
      ]}>
        <Text style={styles.connectionText}>
          {connectionStatus === 'checking' && '⏳ Verificando conexión...'}
          {connectionStatus === 'connected' && '✅ Conectado a Supabase'}
          {connectionStatus === 'disconnected' && '❌ Sin conexión a Supabase'}
        </Text>
      </View>
      
      {/* Input para nuevo mensaje */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addMessage}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de mensajes */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMessages}>
            <Text style={styles.buttonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : messages.length === 0 ? (
        <Text style={styles.emptyText}>No hay mensajes aún. ¡Agrega el primero!</Text>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  editContainer: {
    flex: 1,
  },
  editInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    fontSize: 16,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#999',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  connectionIndicator: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff3cd',
  },
  connectedIndicator: {
    backgroundColor: '#d4edda',
  },
  disconnectedIndicator: {
    backgroundColor: '#f8d7da',
  },
  connectionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
export default MessagesScreen;
