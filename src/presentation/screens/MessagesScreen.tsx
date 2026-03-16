import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase, Message } from '../../supabase'

export const MessagesScreen = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      setMessages(data || [])
    }

    setLoading(false)
  }

  const addMessage = async () => {
    if (!newMessage.trim()) return

    const { error } = await supabase
      .from('messages')
      .insert([{ content: newMessage }])

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      setNewMessage('')
      fetchMessages()
    }
  }

  const saveEdit = async () => {
    if (!editText.trim() || editingId === null) return

    const { error } = await supabase
      .from('messages')
      .update({ content: editText })
      .eq('id', editingId)

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      setEditingId(null)
      setEditText('')
      fetchMessages()
    }
  }

  const deleteMessage = async (id: number) => {

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      fetchMessages()
    }
  }

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>

      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.save} onPress={saveEdit}>
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setEditingId(null)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.message}>{item.content}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => {
                setEditingId(item.id)
                setEditText(item.content)
              }}
            >
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delete}
              onPress={() => deleteMessage(item.id)}
            >
              <Text style={styles.btnText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Mensajes</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />

        <TouchableOpacity style={styles.add} onPress={addMessage}>
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={{ textAlign: 'center' }}>Cargando...</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginRight: 10
  },

  add: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6
  },

  messageContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },

  message: {
    fontSize: 16,
    marginBottom: 10
  },

  edit: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    marginRight: 10
  },

  delete: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5
  },

  save: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginRight: 10
  },

  cancel: {
    backgroundColor: '#999',
    padding: 8,
    borderRadius: 5
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }

})

export default MessagesScreen