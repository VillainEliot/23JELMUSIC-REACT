import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Cours from './components/Cours';
import Eleves from './components/Eleves';
import ContratsPrets from './components/ContratsPrets';
import Instruments from './components/Instruments';
import Professionnels from './components/Professionnels';
import Inscriptions from './components/Inscriptions';

const pages = [
  { title: 'Cours', component: Cours },
  { title: 'Eleves', component: Eleves },
  { title: 'Contrats Prêts', component: ContratsPrets },
  { title: 'Instruments', component: Instruments },
  { title: 'Professionnels', component: Professionnels },
  { title: 'Inscriptions', component: Inscriptions },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'Cours':
        return <Cours />;
      case 'Eleves':
        return <Eleves />;
      case 'ContratsPrets':
        return <ContratsPrets />;
      case 'Instruments':
        return <Instruments />;
      case 'Professionnels':
        return <Professionnels />;
      case 'Inscriptions':
        return <Inscriptions />;
      default:
        return null;
    }
  };

  const handleMenuItemPress = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(!menuOpen)}>
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>
      
      <View style={[styles.absoluteContainer, { display: menuOpen ? 'flex' : 'none' }]}>
        <View style={styles.menu}>
          <FlatList
            data={pages}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.title)}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
          />
        </View>
      </View>

      <View style={styles.pageContainer}>
        {currentPage === null && <Text style={styles.logo}>JELMUSIC</Text>}
        {renderPage()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 84,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  menu: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});