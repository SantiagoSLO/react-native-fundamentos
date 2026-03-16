import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { supabase } from '../../supabase'

export const MessagesScreen = () => {

  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (data) setMessages(data)
  }

  const send = async () => {
    if (!text.trim()) return

    if (editId) {
      await supabase.from('messages').update({ content: text, updated_at: new Date().toISOString() }).eq('id', editId)
      setEditId(null)
    } else {
      await supabase.from('messages').insert([{ content: text }])
    }

    setText('')
    loadMessages()
  }

  const remove = async (id: number) => {
    await supabase.from('messages').delete().eq('id', id)
    loadMessages()
  }

  const edit = (item: any) => {
    setText(item.content)
    setEditId(item.id)
  }

  const cancelEdit = () => {
    setText('')
    setEditId(null)
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>💬 Mensajes</Text>

      {/* Input y botón de enviar */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe un mensaje..."
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          style={[styles.sendButton, editId ? styles.updateButton : null]} 
          onPress={send}
        >
          <Text style={styles.sendButtonText}>
            {editId ? '✏️ Actualizar' : '📤 Enviar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón cancelar cuando está editando */}
      {editId && (
        <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
          <Text style={styles.cancelButtonText}>❌ Cancelar edición</Text>
        </TouchableOpacity>
      )}

      {/* Lista de mensajes */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.dateText}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => edit(item)}
              >
                <Text style={styles.buttonText}>✏️ Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => remove(item.id)}
              >
                <Text style={styles.buttonText}>🗑️ Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay mensajes aún. ¡Envía el primero! 📝</Text>
        }
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#FF9800',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
})
