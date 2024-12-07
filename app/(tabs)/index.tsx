// Import Modules
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BoosterPack } from './types';
import { BOOSTERS, BoosterOpeningAnimation, PokemonCard } from './components/BOOSTERS';
import { styles } from './style/style';

// Application principale
const PokemonApp: React.FC = () => {
  const [selectedBooster, setSelectedBooster] = useState<BoosterPack | null>(null);

  // Données des boosters
  const boosterPacks: BoosterPack[] = [
    {
      boosterImage: BOOSTERS.IRON_CROWN,
      name: 'Iron Crown',
      text: 'PUISSANCE',
      cards: [
        { image: require('./assets/cards/base1-1.png'), rarity: 'common', name: 'Pikachu' },
      ],
    },
    {
      boosterImage: BOOSTERS.IRON_CROWN,
      name: 'Iron Crown',
      text: 'PUISSANCE',
      cards: [
        { image: require('./assets/cards/base1-1.png'), rarity: 'common', name: 'Pikachu' },
      ],
    },
    {
      boosterImage: BOOSTERS.IRON_CROWN,
      name: 'Iron Crown',
      text: 'PUISSANCE',
      cards: [
        { image: require('./assets/cards/base1-1.png'), rarity: 'common', name: 'Pikachu' },
      ],
    }
  ];

  const handleBoosterPress = useCallback((booster: BoosterPack) => {
    setSelectedBooster(booster);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <View style={styles.cardsGroup}>
          <View style={styles.miniCard}>
            <PokemonCard boosterImage={BOOSTERS.IRON_CROWN} />
          </View>
          <TouchableOpacity style={styles.starButton}>
            <FontAwesome5 name="star" size={20} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <FontAwesome5 name="paw" size={24} color="#FFB443" />
          </View>
          <Text style={styles.profileText}>N. 11</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="sun" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="mail" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="gift" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Packs Section */}
      <View style={styles.packsContainer}>
        <View style={styles.packsRow}>
          {boosterPacks.map((pack, index) => (
            <TouchableOpacity
              key={index}
              style={styles.packCard}
              onPress={() => handleBoosterPress(pack)}
            >
              <View style={styles.packImageContainer}>
                <PokemonCard
                  boosterImage={pack.boosterImage}
                  isAnimated
                />
              </View>
              <View style={styles.packLabel}>
                <Text style={styles.packText}>{pack.text}</Text>
                <Text style={styles.packPokemon}>{pack.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.timerContainer}>
          <Feather name="clock" size={16} color="#666" />
          <Text style={styles.timerText}>00 h 10 min</Text>
          <View style={styles.coinContainer}>
            <MaterialCommunityIcons name="pokemon-go" size={16} color="#FFD700" />
            <Text style={styles.coinText}>0</Text>
          </View>
        </View>
      </View>

      {/* Feature Buttons */}
      <View style={styles.featureButtons}>
        <TouchableOpacity style={styles.featureButton}>
          <MaterialCommunityIcons name="cards" size={24} color="#FFD700" />
          <Text style={styles.featureText}>Pioche miracle</Text>
          <Text style={styles.featureTimer}>03 h 41 min</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureButton}>
          <Feather name="shopping-bag" size={24} color="#666" />
          <Text style={styles.featureText}>Boutique</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.tabButton}>
          <Feather name="home" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <MaterialCommunityIcons name="cards" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Feather name="users" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Feather name="message-square" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Feather name="menu" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Mission Button */}
      <TouchableOpacity style={styles.missionButton}>
        <Feather name="list" size={24} color="#666" />
      </TouchableOpacity>

      {/* Modal pour l'ouverture des boosters */}
      <Modal
        visible={selectedBooster !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBooster(null)}
      >
        {selectedBooster && (
          <BoosterOpeningAnimation
            booster={selectedBooster}
            onClose={() => setSelectedBooster(null)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default PokemonApp;