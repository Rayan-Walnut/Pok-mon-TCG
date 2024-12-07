import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withDelay, 
  withSpring, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { styles } from '../style/style';
import { CardType } from '../types';
import { ShineEffect } from './ShineEffect';

interface CardsRevealAnimationProps {
  cards: CardType[];
  onClose: () => void;
}

export const CardsRevealAnimation: React.FC<CardsRevealAnimationProps> = ({ 
  cards, 
  onClose 
}) => {
  const cardAnimations = cards.map(() => ({
    scale: useSharedValue(0),
    rotateY: useSharedValue(180),
    opacity: useSharedValue(0),
  }));

  React.useEffect(() => {
    cards.forEach((_, index) => {
      const delay = index * 500;
      cardAnimations[index].scale.value = withDelay(delay,
        withSpring(1, {
          damping: 12,
          stiffness: 90,
        })
      );
      cardAnimations[index].rotateY.value = withDelay(delay,
        withTiming(0, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        })
      );
      cardAnimations[index].opacity.value = withDelay(delay,
        withTiming(1, { duration: 300 })
      );
    });
  }, []);

  return (
    <View style={styles.cardsRevealContainer}>
      <View style={styles.cardsGrid}>
        {cards.map((card, index) => (
          <Animated.View
            key={index}
            style={[
              styles.cardContainer,
              useAnimatedStyle(() => ({
                transform: [
                  { scale: cardAnimations[index].scale.value },
                  { rotateY: `${cardAnimations[index].rotateY.value}deg` },
                ],
                opacity: cardAnimations[index].opacity.value,
              })),
            ]}
          >
            <Image source={card.image} style={styles.cardImage} resizeMode="contain" />
            {card.rarity === 'ultraRare' && <ShineEffect />}
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{card.name}</Text>
              <Text style={styles.cardRarity}>{card.rarity}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
};