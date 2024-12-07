export interface PokemonCardProps {
  boosterImage: ImageSourcePropType;
  onPress?: () => void;
  isAnimated?: boolean;
}

export interface CardType {
  image: ImageSourcePropType;
  rarity: 'common' | 'uncommon' | 'rare' | 'ultraRare';
  name: string;
}

export interface BoosterPack {
  boosterImage: ImageSourcePropType;
  name: string;
  text: string;
  cards: CardType[];
}

// Ajoutez cet import en haut de votre fichier
import { ImageSourcePropType } from 'react-native';