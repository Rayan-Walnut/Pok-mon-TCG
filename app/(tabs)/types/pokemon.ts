export interface BoosterPack {
    boosterImage: any; // Replace 'any' with actual image type from your asset system
    cards: Array<{
      id: string;
      image: any; // Replace 'any' with actual image type from your asset system
    }>;
  }
  
  export interface PokemonCardProps {
    boosterImage: any; // Replace 'any' with actual image type from your asset system
    onPress?: () => void;
    isAnimated?: boolean;
  }
  